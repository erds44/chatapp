package cmd;

import org.eclipse.jetty.websocket.api.Session;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
 */
public class GetRoomCmd extends ACmd {

    /**
     * A user can determine what chat rooms they have joined and what public rooms they can join.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

}
