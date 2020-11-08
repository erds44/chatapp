package model.cmd;

import com.google.gson.Gson;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

import static model.DispatchAdapter.chatRoomName2listUser;
import static model.DispatchAdapter.userName2session;

public class PrivateMsgCmd extends ACmd{
    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String userName = getUser(userSession);
        String person = (String) request.get("name");
        if (person == null) {
            return;
        }
        Session session = DispatchAdapter.userName2session.get(person);
        if(session == null) {
            return;
        }
        if(DispatchAdapter.userName2blockList.get(userName).contains(person)) {
            sendWSMsg(userSession, Constant.PRIMESSAGE, Constant.PRIMSG_FEEDBACK, Constant.SYS_ERR, Constant.PRIMSG_BLOCK);
            return;
        }
        sendWSMsg(session, Constant.PRIMESSAGE, userName, Constant.SYS_SR, new Gson().toJson(request));
        sendWSMsg(userSession, Constant.PRIMESSAGE, Constant.PRIMSG_FEEDBACK, Constant.SYS_SR, Constant.PRIMSG_SUCCESS);
    }
}
