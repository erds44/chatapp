package model.cmd;

import controller.ChatAppController;
import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Log out command.
 */
public class LogoutCmd extends ACmd {
    private static LogoutCmd singleton = new LogoutCmd();

    /**
     * Constructor pf LogoutCmd.
     */
    private LogoutCmd() {
    }

    /**
     * Get singleton.
     *
     * @return singleton
     */
    public static LogoutCmd getSingleton() {
        return singleton;
    }

    /**
     * Dismiss rooms.
     *
     * @param chatRooms   list of chatrooms
     * @param userName    name of user
     * @param type        type
     * @param userSession session of user
     */
    private void dismissRoom(List<String> chatRooms, String userName, String type, Session userSession) {
        for (String chatRoom : chatRooms) {
            if (DispatchAdapter.chatRoomName2ChatRoom.get(chatRoom).getOwner().equals(userName)) {
                dismissChatRoom(chatRoom, type);
            } else {
                userLeftChatRoom(userSession, chatRoom, userName, type);
            }
        }
    }

    /**
     * Update related data structures.
     *
     * @param userSession session of user
     * @param userName    name of user
     */
    private void updateDataStructure(Session userSession, String userName) {
        DispatchAdapter.session2userName.remove(userSession);
        DispatchAdapter.userName2session.remove(userName);
        DispatchAdapter.userName2user.remove(userName);
        DispatchAdapter.userName2chatRoomName.remove(userName);
        DispatchAdapter.chatRoomBanList.remove(userName);
        DispatchAdapter.userName2blockList.remove(userName);
        ChatAppController.userNameMap.remove(userSession);
        sendWSMsg(userSession, Constant.LOGOUT, Constant.LOGOUT, Constant.SYS_SR, Constant.LOGOUT_SR);
    }

    /**
     * Notify all users.
     */
    private void notifyAllUsers() {
        for (String eachUser : DispatchAdapter.userName2user.keySet()) {
            Session session = DispatchAdapter.userName2session.get(eachUser);
            sendWSMsg(session, Constant.SETALLUSERS, Constant.REQUEST_UPATEALLUSERLIST, Constant.SYS_SR, new Gson().toJson(DispatchAdapter.userName2user.values()));
        }
        updateAllSession();
    }

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String type = Constant.TYPE_LOGOUT;
        if (request != null && request.containsKey(Constant.TYPE_DISCONNECTED)) {
            type = Constant.TYPE_DISCONNECTED;
        }
        String userName = DispatchAdapter.session2userName.get(userSession);
        ;
        List<String> chatRooms = DispatchAdapter.userName2chatRoomName.get(userName);

        dismissRoom(chatRooms, userName, type, userSession);
        updateDataStructure(userSession, userName);
        notifyAllUsers();
    }
}
