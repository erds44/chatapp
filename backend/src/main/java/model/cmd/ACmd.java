package model.cmd;

import com.google.gson.JsonObject;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;

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

    /**
     * Help method  to get the user by session.
     * @param session user session
     * @return user
     */
    protected User getUser(Session session) {
        return DispatchAdapter.session2user.get(session);
    }

    /**
     * Send websocket error message.
     * @param session user session
     * @param msg message
     */
    protected void sendWSErrMsg(Session session, String msg) {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("errMsg", msg);
        try {
            session.getRemote().sendString(String.valueOf(jsonObject));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Send websocket user message.
     * @param session user session
     * @param msg message
     */
    protected void sendWSUserMsg(Session session, String msg){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("userMsg", msg);
        try {
            session.getRemote().sendString(String.valueOf(jsonObject));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Send websocket system message.
     * @param session user session
     * @param msg message
     */
    protected void sendWSSysMsg(Session session, String msg){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("sysMsg", msg);
        try {
            session.getRemote().sendString(String.valueOf(jsonObject));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
