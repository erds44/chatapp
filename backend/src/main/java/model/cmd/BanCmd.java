package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BanCmd extends ACmd {

    /**
     * Admin can ban users and delete messages.
     * A user will be warned and eventually forcibly banned from all chat rooms if the user uses the word “hate” in a message.
     *
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
