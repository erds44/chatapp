package model.cmd;

import com.google.gson.JsonObject;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import com.google.gson.Gson;
import java.security.cert.CertificateParsingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import static j2html.TagCreator.p;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LoginCmd extends ACmd {
    private static LoginCmd singleton = new LoginCmd();

    /**
     * Constructor pf LeaveRoomCmd.
     */
    private LoginCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static LoginCmd getSingleton() {
        return singleton;
    }

    /**
     * Check if the user is already login.
     * @param userName name of user
     * @param userSession session of user
     * @return flag
     */
    private boolean checkAlreadyLogin(String userName, Session userSession) {
        if (DispatchAdapter.session2userName.containsValue(userName)) {
            sendWSMsg(userSession, Constant.LOGIN, Constant.LOGIN, Constant.SYS_ERR, Constant.USERNAME_USED);
            return true;
        }
        return false;
    }

    /**
     * Update all related data structures.
     * @param userName name of user
     * @param request request
     * @param userSession session of user
     */
    private void updateDataStructure(String userName, Map<String, Object> request, Session userSession) {
        User user = new User(userName, (String) request.get(Constant.SCHOOL), (ArrayList<String>)request.get(Constant.INTERESTS), (int)Math.round((Double) request.get(Constant.REQUEST_AGE)));
        DispatchAdapter.session2userName.put(userSession, userName);
        DispatchAdapter.userName2session.put(userName, userSession);
        DispatchAdapter.userName2user.put(userName, user);
        DispatchAdapter.userName2chatRoomName.put(userName, new CopyOnWriteArrayList<>());
        DispatchAdapter.userName2blockList.put(userName, new CopyOnWriteArrayList<>());
        sendWSMsg(userSession, Constant.LOGIN, Constant.LOGIN, Constant.SYS_SR, userName);
        sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_SR, Constant.LOGIN_SR);
    }

    /**
     * Notidy all users.
     */
    private void notifyAllUser() {
        for (String eachUser : DispatchAdapter.userName2user.keySet()){
            Session session = DispatchAdapter.userName2session.get(eachUser);
            sendWSMsg(session, Constant.SETALLUSERS, Constant.REQUEST_UPATEALLUSERLIST, Constant.SYS_SR, new Gson().toJson(DispatchAdapter.userName2user.values()) );
        }
        updateAllSession();
    }

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = (String)request.get(Constant.NAME);
        if (checkAlreadyLogin(userName, userSession)) {
            return;
        }

        updateDataStructure(userName, request, userSession);
        notifyAllUser();
    }

}
