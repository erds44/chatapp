package model;


import com.google.gson.Gson;
import org.eclipse.jetty.websocket.api.Session;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * This adapter interfaces with the models and the controller.
 */
public class DispatchAdapter {
    private static DispatchAdapter singleton;
    public static Map<Session, User> session2user = new ConcurrentHashMap<>();
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
    public DispatchAdapter getSingleton() {
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
    public void Process(Session user, String request) {

    }
}
