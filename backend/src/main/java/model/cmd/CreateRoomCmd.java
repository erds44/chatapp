package model.cmd;

import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class CreateRoomCmd extends ACmd {



    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    @SuppressWarnings("unchecked")
    public void execute(Session userSession, Map<String, Object> request) {
        String roomName = (String) request.get(Constant.NAME);
        String userName = "123"; // TODO: login first
        // String userName = getUser(userSession);
        if(DispatchAdapter.chatRoomName2ChatRoom.containsKey(roomName)){
            System.out.println("catch");
            sendWSMsg(userSession, Constant.REQUEST_CREATEROOM, Constant.SYS_ERR, Constant.CHATROOM_USED);
            return;
        }
        List<String> requirement = null;
        if(request.containsKey(Constant.INTERESTS)){
            requirement = (ArrayList<String>) request.get(Constant.INTERESTS);
        }
        ChatRoom room = new ChatRoom(roomName, userName,requirement);
        DispatchAdapter.chatRoomName2ChatRoom.put(roomName, room);
        DispatchAdapter.chatRoomName2listUser.put(roomName, List.of(userName));
        DispatchAdapter.userName2chatRoomName.get(userName).add(roomName);
        sendWSMsg(userSession, Constant.REQUEST_CREATEROOM, Constant.SYS_SR, Constant.CHATROOM_CREATED);
    }

}
