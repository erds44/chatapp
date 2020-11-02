package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.ArrayList;
import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LoginCmd extends ACmd {


    @SuppressWarnings("unchecked")
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = (String)request.get("name");

        if (DispatchAdapter.session2username.containsValue(userName)) {
            sendWSMsg(userSession, "login", "err", Constant.USERNAME_USED);
            return;
        }
        User user = new User((String) request.get("name"), (String) request.get("School"), (ArrayList<String>)request.get("interests"),Integer.parseInt((String) request.get("age")));
        DispatchAdapter.session2username.put(userSession, (String) request.get("name"));
        DispatchAdapter.session2user.put(userSession, user);
        DispatchAdapter.userName2session.put(userName, userSession);
//        Debug.printMap(DispatchAdapter.session2user, "session2user:");
//        Debug.printMap(DispatchAdapter.user2session, "user2session:");
    }

}
