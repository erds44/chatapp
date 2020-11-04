package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

import java.util.List;
import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class JoinRoomCmd extends ACmd {



    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        userName = "123";
//        if(DispatchAdapter.chatRoomBanList.contains(userName)){
//            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_BAN, null);
//            return;
//        }
        String roomName = (String) request.get(Constant.NAME);
//        List<String> roomRequirement = DispatchAdapter.chatRoomName2ChatRoom.get(roomName).getInterestsRequirement();
//        if(roomRequirement != null){
//            boolean qualified = false;
//            for(String interest: DispatchAdapter.userName2user.get(userName).getInterest()){
//                if(roomRequirement.contains(interest)){
//                    qualified = true;
//                }
//            }
//            if(!qualified){
//                sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_JOINFALIURE, null);
//                return;
//            }
//        }
        if(DispatchAdapter.userName2chatRoomName.get(userName).contains(roomName)){
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_JOINED);
            return;
        }
        DispatchAdapter.userName2chatRoomName.get(userName).add(roomName);
        DispatchAdapter.chatRoomName2listUser.get(roomName).add(userName);
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_SR, Constant.CHATROOM_JOIN, roomName, DispatchAdapter.chatRoomName2listUser.get(roomName).toString());
        // TODO: notify all other session
    }
}
