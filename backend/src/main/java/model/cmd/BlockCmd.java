package model.cmd;

import model.DispatchAdapter;
import org.eclipse.jetty.websocket.api.Session;
import utility.Constant;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import utility.Constant;

/**
 * Login model.cmd create the user and stored in dispatchAdapter map.
 */
public class BlockCmd extends ACmd {
    private static BlockCmd singleton = new BlockCmd();

    /**
     * Constructor of BlockCmd.
     */
    private BlockCmd() {}

    /**
     * Get singleton.
     * @return singleton
     */
    public static BlockCmd getSingleton() {
        return singleton;
    }

    /**
     * Perform the execution of a block command.
     * @param userSession user session
     * @param request     request
     */
    @Override
    public void execute(Session userSession, Map<String, Object> request) {
        String blockUserName = (String) request.get(Constant.REQUEST_USERNAME);
        String userName = getUser(userSession);

        if(DispatchAdapter.userName2blockList.containsKey(blockUserName)){
            if(DispatchAdapter.userName2blockList.get(blockUserName).contains(userName)){
                sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_ERR, blockUserName + Constant.NOTIFY_BLOCK_ERR);
                return;
            }
            DispatchAdapter.userName2blockList.get(blockUserName).add(userName);
        }
        sendWSMsg(userSession, Constant.ROOM, Constant.ROOM, Constant.SYS_SR, blockUserName + Constant.NOTIFY_BLOCK_SUCCESS );
    }

}
