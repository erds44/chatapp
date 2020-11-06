package model.cmd;

import com.google.gson.JsonObject;
import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
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
        String reportedRoom = (String) request.get("reportedRoom");

        ChatRoom room = DispatchAdapter.chatRoomName2ChatRoom.getOrDefault(reportedRoom, null);

        // TODO  if room is null ....

        String adminName = room.getOwner();
        Session adminSession = DispatchAdapter.userName2session.getOrDefault(adminName, null);
        System.out.println(adminSession == null);
        // send to admin
        JsonObject jo = new JsonObject();
        jo.addProperty("reportedUsername", reportedUsername);
        jo.addProperty("reportedReason", reportedReason);
        jo.addProperty("reportedRoom", reportedRoom);
        sendWSMsg(adminSession, Constant.REPORT, Constant.REQUEST_REPORTUSER, Constant.SYS_SR, String.valueOf(jo));
    }

}
