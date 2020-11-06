package model.cmd;

import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

public class LogoutCmd extends ACmd{
    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = DispatchAdapter.session2userName.get(userSession);;
        List<String> chatRooms = DispatchAdapter.userName2chatRoomName.get(userName);
        for(String chatRoom : chatRooms) {
            if (DispatchAdapter.chatRoomName2ChatRoom.get(chatRoom).getOwner().equals(userName)) {
                dismissChatRoom(chatRoom);
            }
            else {
                userLeftChatRoom(userSession, chatRoom, userName);
            }
        }
        DispatchAdapter.session2userName.remove(userSession);
        DispatchAdapter.userName2session.remove(userName);
        DispatchAdapter.userName2user.remove(userName);
        DispatchAdapter.userName2chatRoomName.remove(userName);
        sendWSMsg(userSession, Constant.LOGOUT, Constant.LOGOUT, Constant.SYS_SR, Constant.LOGOUT_SR);
        //sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_SR, Constant.LOGOUT_SR);
        updateAllSession();
    }
}
