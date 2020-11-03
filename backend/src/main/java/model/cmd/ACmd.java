package model.cmd;

import com.google.gson.JsonObject;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;

/**
 * Abstract command class for encapsulation.
 */
public abstract class ACmd {

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    public abstract void execute(Session userSession, Map<String, Object> request);

    /**
     * Help method  to get the user by session.
     *
     * @param session user session
     * @return user
     */
    protected String getUser(Session session) {
        return DispatchAdapter.session2userName.get(session);
    }

    /**
     * Send websocket error message.
     *
     * @param session user session
     */
    protected void sendWSMsg(Session session, String command, String type, String body) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("request", command);
        jsonObject.addProperty("type", type);
        jsonObject.addProperty("body", body);
        try {
            session.getRemote().sendString(String.valueOf(jsonObject));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
