package cmd;

import org.eclipse.jetty.websocket.api.Session;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
 */
public class BlockCmd extends ACmd {

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

}
