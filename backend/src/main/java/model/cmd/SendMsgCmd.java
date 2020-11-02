package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class SendMsgCmd extends ACmd {

    /**
     * An unblocked user should be notified that their message has been received.
     * A user can only send a message to someone else in the same chat room as them.
     * An unblocked user can send a direct or broadcast message to all users in the chat room
     * check for "hate" key word and check for block users.
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
