package model.cmd;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;

import javax.print.attribute.standard.PrinterMessageFromOperator;
import java.util.Map;

/**
 * Abstract command class for encapsulation.
 */
public abstract class ACmd {
    protected Gson gson = new Gson();
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
    protected void sendWSMsg(Session session, String section, String command, String type, String msg, String body) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("section", section);
        jsonObject.addProperty("request", command);
        jsonObject.addProperty("type", type);
        jsonObject.addProperty("msg", msg);
        jsonObject.addProperty("body", body);
        try {
            session.getRemote().sendString(String.valueOf(jsonObject));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
