package model;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import model.cmd.*;
import org.eclipse.jetty.websocket.api.Session;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * This adapter interfaces with the models and the controller.
 */
public class DispatchAdapter {
    private static DispatchAdapter singleton;
    public static Map<Session, String> session2userName = new ConcurrentHashMap<>();
    public static Map<String, Session> userName2session = new ConcurrentHashMap<>();
    public static Map<String, User> userName2user = new ConcurrentHashMap<>();
    public static Map<String, List<String>> userName2chatRoomName = new ConcurrentHashMap<>();
    public static Map<String, ChatRoom> chatRoomName2ChatRoom = new ConcurrentHashMap<>();
    public static Map<String, List<String>> chatRoomName2listUser = new ConcurrentHashMap<>();
    public static Map<String, List<String>> userName2blockList = new ConcurrentHashMap<>();
    public static List<String> chatRoomBanList = new CopyOnWriteArrayList<>();

    /**
     * Private Constructor for singleton pattern.
     */
    private DispatchAdapter() {

    }

    /**
     * Get only 1 dispatchAdapter.
     *
     * @return dispatchAdapter
     */
    public static DispatchAdapter getSingleton() {
        if (singleton == null) {
            singleton = new DispatchAdapter();
        }
        return singleton;
    }

    /**
     * Handle for websocket close.
     */
    public synchronized void leave(Session user) {
        ACmd cmd = LogoutCmd.getSingleton();
        HashMap hash = new HashMap();
        hash.put("disconnected", null);
        cmd.execute(user, hash);
    }

    /**
     * Process request for a given user session.
     *
     * @param user    user
     * @param request request body
     */
    public synchronized void process(Session user, String request) {
        System.out.println(request);
        JsonObject jRequest = new JsonParser().parse(request).getAsJsonObject();
        String command = jRequest.get("command").getAsString();
        JsonObject body = jRequest.get("body").getAsJsonObject();
        HashMap bodyMap = new Gson().fromJson(body, HashMap.class);

        CmdFactory cmdFactory = CmdFactory.getSingleton();
        ACmd cmd = cmdFactory.createCmd(command);
        if(cmd != null) {
            cmd.execute(user, bodyMap);
        }
    }
}
