package model.cmd;

import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class CreateRoomCmd extends ACmd {
    private static CreateRoomCmd singleton = new CreateRoomCmd();

    /**
     * Constructor pf CreateRoomCmd.
     */
    private CreateRoomCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static CreateRoomCmd getSingleton() {
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
        String roomName = (String) request.get(Constant.NAME);
        String userName = getUser(userSession);
        if (checkDuplicate(userSession, roomName)) {
            return;
        }
        createRoom(request, roomName, userName);
        DispatchAdapter.userName2chatRoomName.get(userName).add(roomName);
        sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_CREATEROOM, Constant.SYS_SR, roomName + Constant.CHATROOM_CREATED);
        updateAllSession();
    }

    /**
     * Help method to check if duplicate username exists.
     *
     * @param userSession current session
     * @param roomName    chat room name
     * @return isDuplicated
     */
    private boolean checkDuplicate(Session userSession, String roomName) {
        if (DispatchAdapter.chatRoomName2ChatRoom.containsKey(roomName)) {
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_CREATEROOM, Constant.SYS_ERR, Constant.CHATROOM_USED);
            return true;
        }
        return false;
    }

    /**
     * Help method to create a room.
     *
     * @param request  request body
     * @param roomName chat room name
     * @param userName username
     */

    @SuppressWarnings("unchecked")
    private void createRoom(Map<String, Object> request, String roomName, String userName) {
        List<String> requirement = new CopyOnWriteArrayList<>();
        if (request.containsKey(Constant.INTERESTS) && (boolean)request.get(Constant.REQUEST_ISPRIVATE)) {
            requirement = (ArrayList<String>) request.get(Constant.INTERESTS);
        }
        ChatRoom room = new ChatRoom(roomName, userName, requirement, (boolean)request.get(Constant.REQUEST_ISPRIVATE));
        DispatchAdapter.chatRoomName2ChatRoom.put(roomName, room);
        DispatchAdapter.chatRoomName2listUser.put(roomName, new CopyOnWriteArrayList<>());
        DispatchAdapter.chatRoomName2listUser.get(roomName).add(userName);
    }


}
