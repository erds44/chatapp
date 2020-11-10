package model.cmd;

import com.google.gson.JsonObject;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import com.google.gson.Gson;
import java.security.cert.CertificateParsingException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import static j2html.TagCreator.p;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class LoginCmd extends ACmd {


    @SuppressWarnings("unchecked")
    public void execute(Session userSession, Map<String, Object> request) {
        // TODO： replce string with constant
        String userName = (String)request.get(Constant.NAME);
        if (DispatchAdapter.session2userName.containsValue(userName)) {
            sendWSMsg(userSession, Constant.LOGIN, Constant.LOGIN, Constant.SYS_ERR, Constant.USERNAME_USED);
            return;
        }
        User user = new User(userName, (String) request.get(Constant.SCHOOL), (ArrayList<String>)request.get(Constant.INTERESTS), (int)Math.round((Double) request.get("age")));
        DispatchAdapter.session2userName.put(userSession, userName);
        DispatchAdapter.userName2session.put(userName, userSession);
        DispatchAdapter.userName2user.put(userName, user);
        DispatchAdapter.userName2chatRoomName.put(userName, new CopyOnWriteArrayList<>());
        DispatchAdapter.userName2blockList.put(userName, new CopyOnWriteArrayList<>());
        sendWSMsg(userSession, Constant.LOGIN, Constant.LOGIN, Constant.SYS_SR, userName);
        sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_SR, Constant.LOGIN_SR);

        for (String eachUser : DispatchAdapter.userName2user.keySet()){
            Session session = DispatchAdapter.userName2session.get(eachUser);
            sendWSMsg(session, Constant.SETALLUSERS, Constant.REQUEST_UPATEALLUSERLIST, Constant.SYS_SR, new Gson().toJson(DispatchAdapter.userName2user.values()) );
        }


        updateAllSession();
    }

}
