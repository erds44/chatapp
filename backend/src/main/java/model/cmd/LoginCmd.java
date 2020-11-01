package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LoginCmd extends ACmd {

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
//        if (DispatchAdapter.session2user.containsKey(userSession)) {
//            sendWSErrMsg(userSession, "Username already used!");
//            return;
//        }
//        User user = new User(null, null, null, 0);
//        DispatchAdapter.session2user.put(userSession, user);
//        DispatchAdapter.user2session.put(user, userSession);
    }
    @SuppressWarnings("unchecked")
    public void execute(Session userSession, Map<String, Object> request) {
        if (DispatchAdapter.session2username.containsValue(request.get("name"))) {
            sendWSMsg(userSession, "login", "err", Constant.USERNAME_USED);
            return;
        }
        User user = new User((String) request.get("name"), (String) request.get("School"), (ArrayList<String>)request.get("interests"),Integer.parseInt((String) request.get("age")));
        DispatchAdapter.session2username.put(userSession, (String) request.get("name"));
        DispatchAdapter.user2session.put(user, userSession);
//        Debug.printMap(DispatchAdapter.session2user, "session2user:");
//        Debug.printMap(DispatchAdapter.user2session, "user2session:");
    }

}
