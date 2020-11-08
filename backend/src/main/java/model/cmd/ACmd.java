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
        jsonObject.addProperty("section", section);
        jsonObject.addProperty("request", command);
        jsonObject.addProperty("type", type);
        jsonObject.addProperty("msg", msg);

        for (String parameter : body) {
            jsonObject.addProperty("param" + param++, parameter);
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
        for(ChatRoom room : DispatchAdapter.chatRoomName2ChatRoom.values()){
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

    protected void dismissChatRoom(String chatRoomName) {
        // update joined rooms
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            DispatchAdapter.userName2chatRoomName.get(user).remove(chatRoomName);
            Session session = DispatchAdapter.userName2session.get(user);

            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, chatRoomName + " is dismissed");

        }
        DispatchAdapter.chatRoomName2ChatRoom.remove(chatRoomName);
        DispatchAdapter.chatRoomName2listUser.remove(chatRoomName);
        updateAllSession();
    }

    protected void userLeftChatRoom(Session userSession, String chatRoomName, String userName) {
        DispatchAdapter.chatRoomName2listUser.get(chatRoomName).remove(userName);
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            if (!user.equals(userName)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, userName + " left the room!");
                // TODO: notify all other session in chat
            }
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, chatRoomName + Constant.CHATROOM_EXIT);
        updateAllSession();
    }
}
