package model.cmd;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import model.ChatRoom;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import javax.print.attribute.standard.PrinterMessageFromOperator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

import utility.Constant;

/**
 * Abstract command class for encapsulation.
 */
public abstract class ACmd {
    protected Gson gson = new Gson();

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    public abstract void execute(Session userSession, Map<String, Object> request);

    /**
     * Help method  to get the user by session.
     *
     * @param session user session
     * @return user
     */
    protected String getUser(Session session) {
        return DispatchAdapter.session2userName.get(session);
    }

    /**
     * Send websocket error message.
     *
     * @param session user session
     */
    protected void sendWSMsg(Session session, String section, String command, String type, String msg, String... body) {
        int param = 1;
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty(Constant.PROPERTY_SECTION, section);
        jsonObject.addProperty(Constant.PROPERTY_REQUEST, command);
        jsonObject.addProperty(Constant.PROPERTY_TYPE, type);
        jsonObject.addProperty(Constant.PROPERTY_MSG, msg);

        for (String parameter : body) {
            jsonObject.addProperty(Constant.PROPERTY_PARAM + param++, parameter);
        }
        try {
            if (session.isOpen()) {
                session.getRemote().sendString(String.valueOf(jsonObject));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Help method to update all other session.
     */
    protected void updateAllSession() {
        Set<String> allRooms = DispatchAdapter.chatRoomName2ChatRoom.keySet();
        List<Boolean> isPublic = new CopyOnWriteArrayList<>();
        for (ChatRoom room : DispatchAdapter.chatRoomName2ChatRoom.values()) {
            isPublic.add(room.getIsPublic());
        }
        for (Session session : DispatchAdapter.session2userName.keySet()) {
            String userName = getUser(session);
            List<String> joinedRooms = DispatchAdapter.userName2chatRoomName.get(userName);
            List<List<String>> userlist = new CopyOnWriteArrayList<>();
            for (String room : joinedRooms) {
                userlist.add(DispatchAdapter.chatRoomName2listUser.get(room));
            }
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEALLROOM, Constant.SYS_SR, null, joinedRooms.toString(), userlist.toString(), allRooms.toString(), userName, isPublic.toString());
        }
    }

    /**
     * Update joined rooms after dimissing some rooms.
     *
     * @param chatRoomName the name of dismissed chatroom
     * @param type         the type of dismissing
     */
    protected void dismissChatRoom(String chatRoomName, String type) {
        String owner = DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner();
        String method = "";
        if (type.equals(Constant.TYPE_EXIT)) {
            method = Constant.REASON_DISMISS_EXIT;
        } else if (type.equals(Constant.TYPE_LOGOUT)) {
            method = Constant.REASON_DISMISS_LOGOUT;
        } else if (type.equals(Constant.TYPE_DISCONNECTED)) {
            method = Constant.REASON_DISMISS_DISCONNECTED;
        } else if (type.equals(Constant.TYPE_BAN)) {
            method = Constant.REASON_DISMISS_BAN;
        }
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            DispatchAdapter.userName2chatRoomName.get(user).remove(chatRoomName);
            Session session = DispatchAdapter.userName2session.get(user);
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, owner + ": " + chatRoomName + " is dismissed " + method);
        }
        DispatchAdapter.chatRoomName2ChatRoom.remove(chatRoomName);
        DispatchAdapter.chatRoomName2listUser.remove(chatRoomName);
        updateAllSession();
    }

    /**
     * Update userlist after user leaving chat room.
     *
     * @param userSession  session of left user
     * @param chatRoomName name of chatroom
     * @param userName     name of user
     * @param type         type of leaving
     */
    protected void userLeftChatRoom(Session userSession, String chatRoomName, String userName, String type) {
        DispatchAdapter.chatRoomName2listUser.get(chatRoomName).remove(userName);
        DispatchAdapter.userName2chatRoomName.get(userName).remove(chatRoomName);
        String owner = DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner();
        String method = "";
        if (type.equals(Constant.TYPE_EXIT)) {
            method = Constant.REASON_LEFT_EXIT;
        } else if (type.equals(Constant.TYPE_LOGOUT)) {
            method = Constant.REASON_LEFT_LOGOUT;
        } else if (type.equals(Constant.TYPE_DISCONNECTED)) {
            method = Constant.REASON_LEFT_DISCONNECTED;
        }
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            if (!user.equals(userName)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, owner + ": " + userName + " left the room - " + chatRoomName + " " + method);
            }
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, chatRoomName + Constant.CHATROOM_EXIT);
        updateAllSession();
    }
}
