package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.Map;

/**
 * Leave a single room command.
 */
public class LeaveRoomCmd extends ACmd {
    private static LeaveRoomCmd singleton = new LeaveRoomCmd();

    /**
     * Constructor pf LeaveRoomCmd.
     */
    private LeaveRoomCmd() {
    }

    /**
     * Get singleton.
     *
     * @return singleton
     */
    public static LeaveRoomCmd getSingleton() {
        return singleton;
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
        String chatRoomName = (String) request.get(Constant.NAME);
        // if user is the owner, remove chat room
        if (DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName) != null
                && DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner().equals(userName)) {
            dismissChatRoom(chatRoomName, Constant.TYPE_EXIT);
        } else {
            // remove user from list
            userLeftChatRoom(userSession, chatRoomName, userName, Constant.TYPE_EXIT);
        }
        DispatchAdapter.userName2chatRoomName.get(userName).remove(chatRoomName);
        updateAllSession();
    }


}
