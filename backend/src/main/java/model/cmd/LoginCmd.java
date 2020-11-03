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
        // TODO： replce string with constant
        String userName = (String)request.get(Constant.NAME);
        if (DispatchAdapter.session2userName.containsValue(userName)) {
            sendWSMsg(userSession, "login", Constant.SYS_ERR, Constant.USERNAME_USED);
            return;
        }
        User user = new User(userName, (String) request.get("School"), (ArrayList<String>)request.get("interests"),Integer.parseInt((String) request.get("age")));
        DispatchAdapter.session2userName.put(userSession, userName);
        DispatchAdapter.userName2session.put(userName, userSession);
        DispatchAdapter.userName2user.put(userName, user);
        DispatchAdapter.userName2chatRoomName.put(userName, new ArrayList<>());
    }

}
