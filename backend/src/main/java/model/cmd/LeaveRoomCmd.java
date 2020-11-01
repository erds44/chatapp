package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LeaveRoomCmd extends ACmd {

    /**
     * A user can choose to exit one chat room or all chat rooms.
     * Clear to remaining users why a user left the room.
     * Owner leaves roomm dismisses the room.
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
