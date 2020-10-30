package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BroadcastMsgCmd extends ACmd {

    /**
     * An unblocked user can send a direct or broadcast message to all users in the chat room.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

}
