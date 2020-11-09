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



    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String inviteUsername = (String) request.get("inviteUserName");
        String inviteRoom = (String)request.get("invitedRoom");
        String currentUser = (String) request.get("currentUser");

        if (!DispatchAdapter.userName2user.containsKey(inviteUsername)) {
            // notification no this user
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.NON_EXIST_USER);
            return;
        }

        ChatRoom room = DispatchAdapter.chatRoomName2ChatRoom.getOrDefault(inviteRoom, null);
        User inviteUser = DispatchAdapter.userName2user.getOrDefault(inviteUsername,  null);
        List<String> interests = room.getInterestsRequirement();
        List<String> userInterest = inviteUser.getInterest();
        List<String> userList = DispatchAdapter.chatRoomName2listUser.getOrDefault(inviteRoom, null);

        if (!currentUser.equals(userList.get(0))) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.NON_ADMIN_INVITE);
            return;
        }


        if (room.getIsPublic()) {
            // notification: public room can't invite
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.PUBLIC_INVITE);
            return;
        }

        if (inviteUsername==room.getOwner() || DispatchAdapter.chatRoomName2listUser.getOrDefault(inviteRoom, null).contains(inviteUsername)) {
            // notification: already exist
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.ALREADY_INVITE);
            return;
        }

        if (DispatchAdapter.chatRoomBanList.contains(inviteUsername)) {
            //notification: user has been banned
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_JOINROOM, Constant.SYS_ERR, Constant.BANNED_INVITE);
            return;
        }

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

}
