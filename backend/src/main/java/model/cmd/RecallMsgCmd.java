package model.cmd;

import com.google.gson.Gson;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

import static model.DispatchAdapter.chatRoomName2listUser;
import static model.DispatchAdapter.userName2session;

/**
 * Recall a message command.
 */
public class RecallMsgCmd extends ACmd {
    private static RecallMsgCmd singleton = new RecallMsgCmd();
    /**
     * Constructor pf RecallMsgCmd.
     */
    private RecallMsgCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static RecallMsgCmd getSingleton() {
        return singleton;
    }

    /**
     * Notify all users.
     * @param userList list of user
     * @param userName name of user
     * @param request request
     */
    private void notifyAllUsers(List<String> userList, String userName, Map<String, Object> request) {
        for (String user : userList) {
            if (user.equals(userName) || DispatchAdapter.userName2blockList.get(userName).contains(user)) {
                continue;
            }
            Session otherSession = userName2session.get(user);
            sendWSMsg(otherSession, Constant.MESSAGE, Constant.RECALL_MESSAGE, Constant.SYS_SR, new Gson().toJson(request));
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
        List<String> userList = chatRoomName2listUser.get(chatRoom);
        if (userList == null || userList.isEmpty()) {
            return;
        }
        notifyAllUsers(userList, userName, request);
    }

}
