package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;

/**
 * @CLassName RemoveUserCmd
 * @Description TODO
 * @Author Weiwei Zhou
 * @Date 11/6/20  9:15 PM
 */

public class RemoveUserCmd extends ACmd {
    private static RemoveUserCmd singleton = new RemoveUserCmd();
    /**
     * Constructor pf RemoveUserCmd.
     */
    private RemoveUserCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static RemoveUserCmd getSingleton() {
        return singleton;
    }

    /**
     * Remove the room of the joined list of the user.
     * @param userName name of user
     * @return flag
     */
    private boolean removeJoinedList(String userName, String roomName) {
        // Remove the room of the joined list of the user.
        if (!DispatchAdapter.userName2chatRoomName.containsKey(userName) ||
                !DispatchAdapter.userName2chatRoomName.get(userName).remove(roomName)) {
            return true;
        }
        return false;
    }

    /**
     * Remove the user from the joined room.
     * @param roomName name of room
     * @param userName name of user
     * @return flag
     */
    private boolean removeJoinedRoom(String roomName, String userName) {
        // Remove the user from the joined Room.
        if (!DispatchAdapter.chatRoomName2listUser.containsKey(roomName) ||
                !DispatchAdapter.chatRoomName2listUser.get(roomName).remove(userName)) {
            return true;
        }
        return false;
    }

    /**
     * Norify the removed user.
     * @param userName name of user
     * @param roomName name of room
     */
    private void notifyRemovedUser(String userName, String roomName) {
        // Notify the removed user.
        Session removedUserSession = DispatchAdapter.userName2session.get(userName);
        if (removedUserSession != null) {
            sendWSMsg(removedUserSession, Constant.ROOM, Constant.REQUEST_BANUSER, Constant.SYS_ERR, "You were removed from " + roomName + "!");
        }
    }

    /**
     * Notify other users in the room.
     * @param roomName name of room
     * @param userName name of user
     */
    private void notifyOtherUsers(String roomName, String userName) {
        String owner = DispatchAdapter.chatRoomName2ChatRoom.get(roomName).getOwner();
        // Notify the other user in the room.
        for (String user : DispatchAdapter.chatRoomName2listUser.get(roomName)) {
            if (!user.equals(userName)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, owner + ": " + userName + " was removed from the room!");
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
        String userName = (String) request.get("userName");
        String roomName = (String) request.get("roomName");

        if (removeJoinedList(userName, roomName)) {
            return;
        }
        if(removeJoinedRoom(roomName, userName)) {
            return;
        }
        notifyRemovedUser(userName, roomName);
        notifyOtherUsers(roomName, userName);
    }
}
