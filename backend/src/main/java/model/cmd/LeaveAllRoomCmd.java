package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;

/**
 * Leave all rooms command.
 */
public class LeaveAllRoomCmd extends ACmd {
    private static LeaveAllRoomCmd singleton = new LeaveAllRoomCmd();

    /**
     * Constructor pf LeaveAllRoomCmd.
     */
    private LeaveAllRoomCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static LeaveAllRoomCmd getSingleton() {
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
        for (String chatRoomName : DispatchAdapter.userName2chatRoomName.get(userName)) {
            if (DispatchAdapter.chatRoomName2ChatRoom.get(chatRoomName).getOwner().equals(userName)) {
                dismissChatRoom(chatRoomName, Constant.TYPE_EXIT);
            } else {
                userLeftChatRoom(userSession, chatRoomName, userName, Constant.TYPE_EXIT);
            }
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_EXITALLROOM, Constant.SYS_SR, Constant.CHATROOM_EXITALL);
        updateAllSession();
    }


}
