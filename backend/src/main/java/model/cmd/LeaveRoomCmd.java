package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LeaveRoomCmd extends ACmd {
    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        String chatRoomName = (String) request.get(Constant.NAME);
        // if user is the owner, remove chat room
        if (DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner().equals(userName)) {
            dismissChatRoom(chatRoomName);
        } else { // remove user from list
            userLeftChatRoom(userSession, chatRoomName, userName);
        }
        DispatchAdapter.userName2chatRoomName.get(userName).remove(chatRoomName);
    }

    private void dismissChatRoom(String chatRoomName) {
        // update joined rooms
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            Session session = DispatchAdapter.userName2session.get(user);
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, chatRoomName + " is dismissed", chatRoomName);
        }
        DispatchAdapter.chatRoomName2ChatRoom.remove(chatRoomName);
        DispatchAdapter.chatRoomName2listUser.remove(chatRoomName);
        // update all rooms
        for (Session session : DispatchAdapter.session2userName.keySet()) {
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEALLROOM, Constant.SYS_SR, null, DispatchAdapter.chatRoomName2ChatRoom.keySet().toString());
        }
    }

    private void userLeftChatRoom(Session userSession, String chatRoomName, String userName) {
        DispatchAdapter.chatRoomName2listUser.get(chatRoomName).remove(userName);
        for (String user : DispatchAdapter.chatRoomName2listUser.get(chatRoomName)) {
            Session session = DispatchAdapter.userName2session.get(user);
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, null, chatRoomName, DispatchAdapter.chatRoomName2listUser.get(chatRoomName).toString());
            // TODO: notify other session that a user left
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_EXITROOM, Constant.SYS_SR, Constant.CHATROOM_EXIT, chatRoomName);
    }

}
