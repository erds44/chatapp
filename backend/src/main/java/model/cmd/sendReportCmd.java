package model.cmd;

import com.google.gson.JsonObject;
import model.ChatRoom;
import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class sendReportCmd extends ACmd {
    private static sendReportCmd singleton = new sendReportCmd();
    /**
     * Constructor pf sendReportCmd.
     */
    private sendReportCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static sendReportCmd getSingleton() {
        return singleton;
    }

    /**
     * Send to admin.
     * @param reportedUsername name of reported user
     * @param reportedReason reason of reported
     * @param reportedRoom reported room
     * @param adminSession session of admin
     */
    private void sendToAdmin(String reportedUsername, String reportedReason, String reportedRoom, Session adminSession) {
        // send to admin
        JsonObject jo = new JsonObject();
        jo.addProperty(Constant.PROPERTY_REPORTEDUSERNAME, reportedUsername);
        jo.addProperty(Constant.PROPERTY_REPORTEDREASON, reportedReason);
        jo.addProperty(Constant.PROPERTY_REPORTEDROOM, reportedRoom);
        sendWSMsg(adminSession, Constant.REPORT, Constant.REQUEST_REPORTUSER, Constant.SYS_SR, String.valueOf(jo));
    }


    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String reportedUsername = (String) request.get(Constant.REQUEST_REPORTEDUSERNAME);
        String reportedReason = (String) request.get(Constant.REQUEST_REPORTEDREASON);
        String reportedRoom = (String) request.get(Constant.REQUEST_REPORTEDROOM);

        ChatRoom room = DispatchAdapter.chatRoomName2ChatRoom.getOrDefault(reportedRoom, null);

        String adminName = room.getOwner();
        Session adminSession = DispatchAdapter.userName2session.getOrDefault(adminName, null);
        System.out.println(adminSession == null);
        sendToAdmin(reportedUsername, reportedReason, reportedRoom, adminSession);
    }

}
