package model.cmd;

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
        String reportedName = (String) request.get("reportedName");
        //String room

        // find the admin

        // send to admin
        sendWSMsg(userSession, Constant.REPORT, Constant.SYS_SR, "say hate!");
    }

}
