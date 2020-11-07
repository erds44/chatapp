package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BlockCmd extends ACmd {


    /**
     * Perform the execution of a command.
     *
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String blockUserName = (String) request.get("userName");
        String userName = getUser(userSession);
        if(DispatchAdapter.userName2blockList.containsKey(blockUserName)){
            if(DispatchAdapter.userName2blockList.get(blockUserName).contains(userName)){
                sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_ERR, blockUserName + " already blocked!");
                return;
            }
            DispatchAdapter.userName2blockList.get(blockUserName).add(userName);
        }else{
            List<String> blockList = new CopyOnWriteArrayList<>();
            blockList.add(userName);
            DispatchAdapter.userName2blockList.put(blockUserName, blockList);
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_SR, blockUserName + " blocked successfully!");
    }

}
