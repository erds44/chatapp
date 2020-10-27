package model;


import com.google.gson.Gson;
import org.eclipse.jetty.websocket.api.Session;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * This adapter interfaces with the models and the controller.
 */
public class DispatchAdapter {
    public static Map<Session, User> session2user = new ConcurrentHashMap<>();
    public static Map<String, ChatRoom> name2ChatRoom = new ConcurrentHashMap<>();
    public static Map<ChatRoom, List<User>> chatRoom2listUser = new ConcurrentHashMap<>();
    public static Map<List<User>, ChatRoom> listUser2chatRoom = new ConcurrentHashMap<>();
    public static Map<User, Session> user2session = new ConcurrentHashMap<>();
    public static Map<User, List<User>> user2banList = new ConcurrentHashMap<>();

    /**
     * Process request for a given user session.
     * @param user user
     * @param request request body
     */
    public void Process(Session user, String request) {

    }
}
