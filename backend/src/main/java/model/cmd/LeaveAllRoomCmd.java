package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LeaveAllRoomCmd extends ACmd {



    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        for(String chatRoomName: DispatchAdapter.userName2chatRoomName.get(userName)){
            if(DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner().equals(userName)){
                DispatchAdapter.chatRoomName2ChatRoom.remove(chatRoomName);
                DispatchAdapter.chatRoomName2listUser.remove(chatRoomName);
                // TODO: notify other session if a chat room dismissed
            }else{
                DispatchAdapter.chatRoomName2listUser.get(chatRoomName).remove(userName);
                // TODO: notify other session that a user left
            }
        }
        DispatchAdapter.userName2chatRoomName.get(userName).clear();
        sendWSMsg(userSession, Constant.REQUEST_EXITALLROOM, Constant.SYS_SR, Constant.CHATROOM_EXITALL);
    }

}
