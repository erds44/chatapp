package cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
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
        if (DispatchAdapter.session2user.containsKey(userSession)) {
            sendWSErrMsg(userSession, "Username already used!");
            return;
        }
        User user = new User(null, null, null, 0);
        DispatchAdapter.session2user.put(userSession, user);
        DispatchAdapter.user2session.put(user, userSession);
    }

}
