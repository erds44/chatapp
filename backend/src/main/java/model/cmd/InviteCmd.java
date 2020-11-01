package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class InviteCmd extends ACmd {

    /**
     * If the user to be invited does not exist. Notify the admin.
     * If the user has been banned to enter the room before. Notify the user.
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {

    }

}
