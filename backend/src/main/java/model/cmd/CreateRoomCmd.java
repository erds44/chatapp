package model.cmd;

import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;
import utility.Debug;

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
        String userName = getUser(userSession);
        if(DispatchAdapter.chatRoomName2ChatRoom.containsKey(roomName)){
            sendWSMsg(userSession, Constant.ROOM, Constant.REQUEST_CREATEROOM, Constant.SYS_ERR, Constant.CHATROOM_USED);
            return;
        }
        List<String> requirement = null;
        if(request.containsKey(Constant.INTERESTS)){
            requirement = (ArrayList<String>) request.get(Constant.INTERESTS);
        }
        ChatRoom room = new ChatRoom(roomName, userName,requirement);
        DispatchAdapter.chatRoomName2ChatRoom.put(roomName, room);
        DispatchAdapter.chatRoomName2listUser.put(roomName, new ArrayList<>());
        DispatchAdapter.chatRoomName2listUser.get(roomName).add(userName);
        // to be deleted
        if(!DispatchAdapter.userName2chatRoomName.containsKey(userName)){
            DispatchAdapter.userName2chatRoomName.put(userName, new ArrayList<>());
        }

        DispatchAdapter.userName2chatRoomName.get(userName).add(roomName);
        sendWSMsg(userSession,Constant.ROOM, Constant.REQUEST_CREATEROOM, Constant.SYS_SR, Constant.CHATROOM_CREATED, roomName, DispatchAdapter.chatRoomName2listUser.get(roomName).toString());
        for(Session session : DispatchAdapter.session2userName.keySet()){
            sendWSMsg(session, Constant.ROOM, Constant.REQUEST_UPDATEALLROOM, Constant.SYS_SR, null, DispatchAdapter.chatRoomName2ChatRoom.keySet().toString());
        }
    }

}
