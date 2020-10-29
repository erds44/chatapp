package model.cmd;

import org.eclipse.jetty.websocket.api.Session;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LeaveAllRoomCmd extends ACmd {

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

}
