package cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
 */
public class JoinRoomCmd extends ACmd {

    /**
     * A user can determine who is in the chat room.
     * Messages in order sent, can contain text, images (emojis), and/or links. Messages can be edited, recalled, or deleted.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        // TODO
    }

}
