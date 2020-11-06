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
        updateAllSession();
    }



}
