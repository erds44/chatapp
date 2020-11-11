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
    private static DeleteMsgCmd singleton = new DeleteMsgCmd();

    /**
     * Constructor pf DeleteMsgCmd
     */
    private DeleteMsgCmd() {}

    /**
     * get singleton
     * @return singleton
     */
    public static DeleteMsgCmd getSingleton() {
        return singleton;
    }

    /**
     * Delete the message of all users' sessions.
     * @param userList the list of users
     * @param userName the mame of user
     * @param request the request
     */
    private void notifyUsers(List<String> userList, String userName, Map<String, Object> request) {
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


    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        String chatRoom = (String) request.get(Constant.REQUEST_CHATROOM);
        if (chatRoom == null) {
            return;
        }
        if (!userName.equals(chatRoomName2ChatRoom.get(chatRoom).getOwner())) {
            return;
        }

        List<String> userList = chatRoomName2listUser.get(chatRoom);
        notifyUsers(userList, userName, request);
    }

}
