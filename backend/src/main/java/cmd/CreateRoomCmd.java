package cmd;

import model.ChatRoom;
import model.DispatchAdapter;
import model.User;
import org.eclipse.jetty.websocket.api.Session;

import java.util.ArrayList;

/**
 * Login cmd create the user and stored in dispatchAdapter map.
 */
public class CreateRoomCmd extends ACmd {

    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, String request) {
        String chatRoomName = null;
        if (DispatchAdapter.name2ChatRoom.containsKey(chatRoomName)) {
            sendWSErrMsg(userSession, "Chat room name already used!");
            return;
        }
        ChatRoom room = new ChatRoom(null, null, null);
        DispatchAdapter.name2ChatRoom.put(chatRoomName, room);
        ArrayList<User> userList = new ArrayList<>();
        userList.add(getUser(userSession));
        DispatchAdapter.chatRoom2listUser.put(room, userList);

    }

}
