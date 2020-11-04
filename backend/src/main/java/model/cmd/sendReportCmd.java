package model.cmd;

import com.google.gson.JsonObject;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class sendReportCmd extends ACmd {


    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String reportedUsername = (String) request.get("reportedUsername");
        String reportedReason = (String) request.get("reportedReason");
        //String room

        // find the admin

        // send to admin
        JsonObject jo = new JsonObject();
        jo.addProperty("reportedUsername", reportedUsername);
        jo.addProperty("reportedReason", reportedReason);
        sendWSMsg(userSession, Constant.REPORT, Constant.SYS_SR, String.valueOf(jo));
    }

}
