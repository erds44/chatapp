package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BanCmd extends ACmd {


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
//        Debug.printMap(DispatchAdapter.userName2chatRoomName,"userName2chatRoomName");
//        Debug.printMap(DispatchAdapter.chatRoomName2listUser,"userName2chatRoomName");
        if (!DispatchAdapter.userName2chatRoomName.containsKey(username)) {
            return;
        }
        if (!DispatchAdapter.userName2chatRoomName.get(username).remove(room)) {
            return;
        }

        if (!DispatchAdapter.chatRoomName2listUser.containsKey(room)) {
            return;
        }
        if (!DispatchAdapter.chatRoomName2listUser.get(room).remove(username)) {
            return;
        }

        // Ban the reported user to the chatRoomBanList.
        DispatchAdapter.chatRoomBanList.add(username);

        // Notify the reported user.
        Session reportedUserSession = DispatchAdapter.userName2session.get(username);
        if (reportedUserSession != null) {
            sendWSMsg(reportedUserSession, Constant.ROOM, Constant.REQUEST_BANUSER, Constant.SYS_ERR, "You are banned from all rooms!");
        }

        // Notify the other user in the room.
        for(String user: DispatchAdapter.chatRoomName2listUser.get(room)){
            if(!user.equals(username)) {
                Session session = DispatchAdapter.userName2session.get(user);
                System.out.println("in ban");
                sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEUSERLIST, Constant.SYS_SR, username + " has been banned due to inappropriate behaviors!");
            }
        }

        updateAllSession();

    }

}
