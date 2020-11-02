package model;


import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import model.cmd.ACmd;
import model.cmd.LoginCmd;
import org.eclipse.jetty.websocket.api.Session;
import utility.Debug;

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
    public static Map<Session, String> session2username = new ConcurrentHashMap<>();
    public static Map<String, ChatRoom> name2ChatRoom = new ConcurrentHashMap<>();
    public static Map<ChatRoom, List<User>> chatRoom2listUser = new ConcurrentHashMap<>();
    public static Map<List<User>, ChatRoom> listUser2chatRoom = new ConcurrentHashMap<>();
    public static Map<User, Session> user2session = new ConcurrentHashMap<>();
    public static Map<User, List<User>> user2blockList = new ConcurrentHashMap<>();
    public static List<User> chatRoomBanList = new CopyOnWriteArrayList<>();

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
     * Process request for a given user session.
     *
     * @param user    user
     * @param request request body
     */
    public void process(Session user, String request) {
        JsonObject jRequest = new JsonParser().parse(request).getAsJsonObject();
        String command = jRequest.get("command").getAsString();
        JsonObject body = jRequest.get("body").getAsJsonObject();
        HashMap bodyMap = new Gson().fromJson(body, HashMap.class);
        // below for testing
        // Debug.printMap(bodyMap, "bodyMap:");
        ACmd cmd = null;
        switch (command){
            case "login":
                cmd = new LoginCmd();
                break;
            default:
                break;
        }
        cmd.execute(user, bodyMap);
    }
}
