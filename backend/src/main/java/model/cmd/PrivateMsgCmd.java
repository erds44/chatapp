package model.cmd;

import com.google.gson.Gson;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

import static model.DispatchAdapter.chatRoomName2listUser;
import static model.DispatchAdapter.userName2session;

/**
 * Send private message command.
 */
public class PrivateMsgCmd extends ACmd {
    private static PrivateMsgCmd singleton = new PrivateMsgCmd();

    /**
     * Constructor pf PrivateMsgCmd.
     */
    private PrivateMsgCmd() {
    }

    /**
     * Get singleton.
     *
     * @return singleton
     */
    public static PrivateMsgCmd getSingleton() {
        return singleton;
    }

    /**
     * Check if the user has been blocked.
     *
     * @param userSession session of user
     * @param userName    name of user
     * @param person      person
     * @return flag
     */
    private boolean checkBlockedUser(Session userSession, String userName, String person) {
        if (DispatchAdapter.userName2blockList.get(userName).contains(person)) {
            sendWSMsg(userSession, Constant.PRIMESSAGE, Constant.PRIMSG_FEEDBACK, Constant.SYS_ERR, Constant.PRIMSG_BLOCK);
            return true;
        }
        return false;
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
        String person = (String) request.get(Constant.PROPERTY_NAME);
        if (person == null) {
            return;
        }
        Session session = DispatchAdapter.userName2session.get(person);
        if (session == null) {
            return;
        }

        if (checkBlockedUser(userSession, userName, person)) {
            return;
        }
        sendWSMsg(session, Constant.PRIMESSAGE, userName, Constant.SYS_SR, new Gson().toJson(request));
        sendWSMsg(userSession, Constant.PRIMESSAGE, Constant.PRIMSG_FEEDBACK, Constant.SYS_SR, Constant.PRIMSG_SUCCESS);
    }
}
