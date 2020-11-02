package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

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
