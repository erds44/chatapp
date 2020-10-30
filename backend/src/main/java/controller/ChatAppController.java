package controller;

import com.google.gson.JsonObject;
import org.eclipse.jetty.websocket.api.Session;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static j2html.TagCreator.*;
import static j2html.TagCreator.p;
import static spark.Spark.*;
import static spark.Spark.init;
import static spark.Spark.port;
import static spark.Spark.staticFiles;
import static spark.Spark.webSocket;

/**
 * The chat app controller communicates with all the clients on the web socket.
 */
public class ChatAppController {
    static Map<Session, String> userNameMap = new ConcurrentHashMap<>();
    static int nextUserId = 1;

    /**
     * Chat App entry point.
     *
     * @param args The command line arguments
     */
    public static void main(String[] args) {
        port(getHerokuAssignedPort());
        staticFiles.location("public/build");

        webSocket("/chatapp", WebSocketController.class);
        init();
    }

    /**
     * Broadcast message to all users.
     *
     * @param user    The message sender.
     * @param message The message.
     */
    static void broadcastMessage(Session user, String message) {
        String sender = ChatAppController.userNameMap.get(user);
        JsonObject jo = new JsonObject();
        jo.addProperty("userMessage", p(sender + " says: " + message).render());
        userNameMap.keySet().forEach(session -> {
            if (session != user) {
                try {
                    session.getRemote().sendString(String.valueOf(jo));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    /**
     * Get the heroku assigned port number.
     *
     * @return The heroku assigned port number
     */
    private static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; // return default port if heroku-port isn't set.
    }
}
