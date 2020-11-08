package model.cmd;

import com.google.gson.Gson;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

import static model.DispatchAdapter.*;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class DeleteMsgCmd extends ACmd {



    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        String chatRoom = (String) request.get("chatRoom");
        if (chatRoom == null) {
            return;
        }
        if (!userName.equals(chatRoomName2ChatRoom.get(chatRoom).getOwner())) {
            return;
        }
        List<String> userList = chatRoomName2listUser.get(chatRoom);
        if (userList == null || userList.isEmpty()) {
            return;
        }
        for (String user : userList) {
            if (user.equals(userName) || DispatchAdapter.userName2blockList.get(userName).contains(user)) {
                continue;
            }
            Session otherSession = userName2session.get(user);
            sendWSMsg(otherSession, Constant.MESSAGE, Constant.DELETE_MESSAGE, Constant.SYS_SR, new Gson().toJson(request));
        }
    }

}
