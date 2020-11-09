package model.cmd;

import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import java.util.Map;


/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BanCmd extends ACmd {

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
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String username = (String) request.get("username");
        String room = (String) request.get("room");
        String source = (String) request.get("source");

        Session reportedUserSession = DispatchAdapter.userName2session.getOrDefault(username, null);

        // If the user triggers "hate" in broadcast / private.
        if (!source.equals(Constant.BAN_REPORT)) {
            User user = DispatchAdapter.userName2user.get(username);
            // Just warn the user if he has no previous record.
            if (!user.getIsWarned()) {
                user.setIsWarned(true);
                sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_WARNUSER, Constant.SYS_INFO, Constant.BAN_WARN);
                return;
            }
        }

        if (source.equals(Constant.BAN_BROADCAST) || source.equals(Constant.BAN_REPORT)) {
            if (!DispatchAdapter.userName2chatRoomName.containsKey(username) || !DispatchAdapter.chatRoomName2listUser.containsKey(room)) {
                return;
            }

            // if user is the owner, remove chat room
            if (DispatchAdapter.chatRoomName2ChatRoom.get(room).getOwner().equals(username)) {
                dismissChatRoom(room, "ban");
            } else {
                removeAndNotify(username, room);
            }
        }

        // Ban the reported user to the chatRoomBanList.
        DispatchAdapter.chatRoomBanList.add(username);

        // Notify the reported user.
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
        }

    }

}
