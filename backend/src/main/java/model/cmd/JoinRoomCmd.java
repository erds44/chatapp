package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

import java.util.List;
import java.util.Map;
import java.util.SplittableRandom;

/**
 * Join room command.
 */
public class JoinRoomCmd extends ACmd {
    private static JoinRoomCmd singleton = new JoinRoomCmd();

    /**
     * Constructor pf JoinRoomCmd.
     */
    private JoinRoomCmd() {
    }

    /**
     * Get singleton.
     *
     * @return singleton
     */
    public static JoinRoomCmd getSingleton() {
        return singleton;
    }

    /**
     * Check if user has joined the room.
     *
     * @param userName    name of user
     * @param roomName    name of room
     * @param userSession session of user
     * @return flag
     */
    private boolean checkHasJoined(String userName, String roomName, Session userSession) {
        if (DispatchAdapter.userName2chatRoomName.get(userName).contains(roomName)) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_JOINED);
            return true;
        }
        return false;
    }

    /**
     * Check if the user has been banned.
     *
     * @param userName    name of user
     * @param userSession session of user
     * @return flag
     */
    private boolean checkBannedUser(String userName, Session userSession) {
        if (DispatchAdapter.chatRoomBanList.contains(userName)) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_BAN);
            return true;
        }
        return false;
    }

    /**
     * If the room is private, notify users and update the data structure.
     *
     * @param roomName    name of room
     * @param userName    name of user
     * @param userSession session of user
     * @return flag
     */
    private boolean privateNotifyAllUser(String roomName, String userName, Session userSession) {
        if (!DispatchAdapter.chatRoomName2ChatRoom.get(roomName).getIsPublic()) {
            List<String> roomRequirement = DispatchAdapter.chatRoomName2ChatRoom.get(roomName).getInterestsRequirement();
            boolean qualified = false;
            for (String interest : DispatchAdapter.userName2user.get(userName).getInterest()) {
                if (roomRequirement.contains(interest)) {
                    qualified = true;
                }
            }
            if (!qualified) {
                sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.CHATROOM_JOINFALIURE);
                return true;
            }
        }
        return false;
    }

    /**
     * If the room if public, notify users and update the data structure.
     *
     * @param userName    name of user
     * @param roomName    name of room
     * @param userSession session of user
     */
    private void publicNotifyAllUsers(String userName, String roomName, Session userSession) {
        DispatchAdapter.userName2chatRoomName.get(userName).add(roomName);
        DispatchAdapter.chatRoomName2listUser.get(roomName).add(userName);
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_SR, roomName + " " + Constant.CHATROOM_JOIN);
        for (String user : DispatchAdapter.chatRoomName2listUser.get(roomName)) {
            String owner = DispatchAdapter.chatRoomName2ChatRoom.get(roomName).getOwner();
            if (!user.equals(userName)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, owner + ": " + userName + " joins the room - " + roomName);
            }
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
        String userName = getUser(userSession);
        String roomName = (String) request.get(Constant.NAME);
        if (checkHasJoined(userName, roomName, userSession)) {
            return;
        }
        if (checkBannedUser(userName, userSession)) {
            return;
        }
        if (privateNotifyAllUser(roomName, userName, userSession)) {
            return;
        }
        publicNotifyAllUsers(userName, roomName, userSession);
    }
}
