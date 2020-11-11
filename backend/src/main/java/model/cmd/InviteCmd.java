package model.cmd;

import org.eclipse.jetty.websocket.api.Session;
import model.ChatRoom;
import model.DispatchAdapter;
import java.util.Map;
import java.util.Iterator;
import java.util.List;
import model.User;
import utility.Constant;
/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class InviteCmd extends ACmd {
    private static InviteCmd singleton = new InviteCmd();

    /**
     * Constructor pf InviteCmd.
     */
    private InviteCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static InviteCmd getSingleton() {
        return singleton;
    }

    /**
     * Check if no such user.
     * @param inviteUsername name of invited user
     * @param userSession session of user
     * @return flag
     */
    private boolean checkNoUser(String inviteUsername, Session userSession) {
        if (!DispatchAdapter.userName2user.containsKey(inviteUsername)) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.NON_EXIST_USER);
            return true;
        }
        return false;
    }

    /**
     * Check if the invited user is the admin.
     * @param currentUser name of current user
     * @param userList user list
     * @param userSession session of user
     * @return flag
     */
    private boolean checkAdmin(String currentUser, List<String> userList, Session userSession) {
        if (!currentUser.equals(userList.get(0))) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.NON_ADMIN_INVITE);
            return true;
        }
        return false;
    }

    /**
     * Check if the room is private.
     * @param room Room
     * @param userSession session of user
     * @return flag
     */
    private boolean checkPrivate(ChatRoom room, Session userSession) {
        if (room.getIsPublic()) {
            // notification: public room can't invite
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.PUBLIC_INVITE);
            return true;
        }
        return false;
    }

    /**
     * check if there is any duplicate.
     * @param inviteUsername name of invited user
     * @param room Room
     * @param userSession session of user
     * @param inviteRoom name of invited room
     * @return flag
     */
    private boolean checkDuplicate(String inviteUsername, ChatRoom room, Session userSession, String inviteRoom) {
        if (inviteUsername.equals(room.getOwner()) || DispatchAdapter.chatRoomName2listUser.getOrDefault(inviteRoom, null).contains(inviteUsername)) {
            // notification: already exist
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.ALREADY_INVITE);
            return true;
        }
        return false;
    }

    /**
     * Check if user has been banned.
     * @param inviteUsername name of invited user
     * @param userSession session of user
     * @return flag
     */
    private boolean checkBannedUser(String inviteUsername, Session userSession) {
        if (DispatchAdapter.chatRoomBanList.contains(inviteUsername)) {
            //notification: user has been banned
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.BANNED_INVITE);
            return true;
        }
        return false;
    }

    /**
     * Norify all users and update the data structures.
     * @param inviteUsername name of invited user
     * @param inviteRoom name of invited room
     * @param currentUser name of current user
     */
    private void notifyUsers(String inviteUsername, String inviteRoom, String currentUser) {
        Session inviteUserSession = DispatchAdapter.userName2session.get(inviteUsername);
        DispatchAdapter.userName2chatRoomName.get(inviteUsername).add(inviteRoom);
        DispatchAdapter.chatRoomName2listUser.get(inviteRoom).add(inviteUsername);
        sendWSMsg(inviteUserSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_SR, currentUser + " " + Constant.SUCCESSFUL_INVITE + " " + inviteRoom);
        for (String user : DispatchAdapter.chatRoomName2listUser.get(inviteRoom)) {
            if (!user.equals(inviteUsername)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, inviteUsername + " joins the room " + inviteRoom);
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
        String inviteUsername = (String) request.get(Constant.REQUEST_INVITEUSERNAME);
        String inviteRoom = (String)request.get(Constant.REQUEST_INVITEROOM);
        String currentUser = (String) request.get(Constant.REQUEST_CURRENTUSER);

        if (checkNoUser(inviteUsername, userSession)) {
            return;
        }

        ChatRoom room = DispatchAdapter.chatRoomName2ChatRoom.getOrDefault(inviteRoom, null);
        List<String> userList = DispatchAdapter.chatRoomName2listUser.getOrDefault(inviteRoom, null);

        if (checkAdmin(currentUser, userList, userSession)) {
            return;
        }

        if (checkPrivate(room, userSession)) {
            return;
        }

        if (checkDuplicate(inviteUsername, room, userSession, inviteRoom)) {
            return;
        }

        if(checkBannedUser(inviteUsername, userSession)) {
            return;
        }

        notifyUsers(inviteUsername, inviteRoom, currentUser);
    }

}
