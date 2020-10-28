package cmd;

import org.eclipse.jetty.websocket.api.Session;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
 */
public class NotifiyOwnerCmd extends ACmd {

    /**
     * Notify owner of the room.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

}
