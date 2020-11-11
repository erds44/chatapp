package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;


/**
 * Ban user command.
 */
public class BanCmd extends ACmd {
    private static BanCmd singleton = new BanCmd();

    /**
     * Constructor pf BanCmd.
     */
    private BanCmd() {
    }

    /**
     * get singleton.
     *
     * @return singleton
     */
    public static BanCmd getSingleton() {
        return singleton;
    }

    /**
     * Remove banned user from room.
     *
     * @param username name of banned user
     * @param room     name of room
     */
    protected void removeAndNotify(String username, String room) {
        // remove user from room.
        DispatchAdapter.userName2chatRoomName.get(username).remove(room);
        DispatchAdapter.chatRoomName2listUser.get(room).remove(username);
        updateAllSession();
        String owner = DispatchAdapter.chatRoomName2ChatRoom.get(room).getOwner();
        // Notify the other user in the room.
        for (String user : DispatchAdapter.chatRoomName2listUser.get(room)) {
            if (!user.equals(username)) {
                Session session = DispatchAdapter.userName2session.get(user);
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, owner + ": " + username + " " + Constant.BAN_BEHAVIOR);
            }
        }
    }

    /**
     * Warm user the first time he sending "hate".
     *
     * @param reportedUserSession the session of reported user
     * @param username            the name of user
     * @return flag
     */
    private boolean warnUser(Session reportedUserSession, String username) {
        User user = DispatchAdapter.userName2user.get(username);
        // Warn the user if he has no previous record.
        if (!user.getIsWarned()) {
            user.setIsWarned(true);
            sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_WARNUSER, Constant.SYS_INFO, Constant.BAN_WARN);
            return true;
        }
        return false;
    }

    /**
     * Deal with the banned user.
     *
     * @param username name of banned user
     * @param room     name of room
     * @return flag
     */
    private boolean handleBan(String username, String room) {
        if (!DispatchAdapter.userName2chatRoomName.containsKey(username) || !DispatchAdapter.chatRoomName2listUser.containsKey(room)) {
            return true;
        }
        // if user is the owner, remove chat room
        if (DispatchAdapter.chatRoomName2ChatRoom.get(room).getOwner().equals(username)) {
            dismissChatRoom(room, Constant.TYPE_BAN);
        } else {
            removeAndNotify(username, room);
        }
        return false;
    }

    /**
     * Notify the reported user.
     *
     * @param source              name of source
     * @param reportedUserSession session of reported user
     */
    private void notifyReportedUser(String source, Session reportedUserSession) {
        switch (source) {
            case Constant.BAN_BROADCAST:
                sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_BANUSER, Constant.SYS_ERR, Constant.BAN_BROADCAST_MSG);
                break;
            case Constant.BAN_PRIVATEMSG:
                sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_BANUSER, Constant.SYS_ERR, Constant.BAN_PRIVATE_MSG);
                break;
            case Constant.REPORT:
                sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_BANUSER, Constant.SYS_ERR, Constant.BAN_REPORT_MSG);
                break;
            default:
                break;
        }
    }

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String username = (String) request.get(Constant.REQUEST_BAN_USERNAME);
        String room = (String) request.get(Constant.REQUEST_ROOM);
        String source = (String) request.get(Constant.REQUEST_SOURCE);

        Session reportedUserSession = DispatchAdapter.userName2session.getOrDefault(username, null);

        // If the user triggers "hate" in broadcast / private.
        if (!source.equals(Constant.BAN_REPORT)) {
            if (warnUser(reportedUserSession, username)) {
                return;
            }
        }

        if (source.equals(Constant.BAN_BROADCAST) || source.equals(Constant.BAN_REPORT)) {
            if (handleBan(username, room)) {
                return;
            }
        }

        // Ban the reported user to the chatRoomBanList.
        DispatchAdapter.chatRoomBanList.add(username);

        // Notify the reported user.
        notifyReportedUser(source, reportedUserSession);
    }
}
