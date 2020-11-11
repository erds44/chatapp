package model.cmd;
import utility.Constant;

import java.lang.reflect.AccessibleObject;
import java.util.HashMap;

/**
* @CLassName CmdFactory
* @Description TODO
* @Author  Weiwei Zhou
* @Date 11/9/20  5:37 PM
*/

public class CmdFactory {
    private static CmdFactory ONLY;
    private HashMap<String, ACmd> AcmdHashMap = new HashMap<>();

    /**
     * Private Constructor for singleton pattern.
     */
    private CmdFactory() {
        AcmdHashMap.put(Constant.COMMAND_LOGIN, LoginCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_LOGOUT, LogoutCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_CREATEROOM, CreateRoomCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_EXITROOM, LeaveRoomCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_EXITALLROOM, LeaveAllRoomCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_JOINROOM, JoinRoomCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_REPORT, sendReportCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_BAN, BanCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_FORCETOLEAVE, RemoveUserCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_BREOADCAST, SendMsgCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_RECALL, RecallMsgCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_EDIT, EditMsgCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_DELETE, DeleteMsgCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_PRIVATE, PrivateMsgCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_BLOCK, BlockCmd.getSingleton());
        AcmdHashMap.put(Constant.COMMAND_INVITE, InviteCmd.getSingleton());

    }

    /**
     * Get only 1 factory.
     * @return CmdFactory.
     */
    public static CmdFactory getSingleton() {
        if (ONLY == null) {
            ONLY = new CmdFactory();
        }
        return ONLY;
    }

    /**
     * Create a certain command
     * @param command the name of certain command
     * @return cmd
     */
    public ACmd createCmd(String command) {
        ACmd cmd = null;
        if (AcmdHashMap.containsKey(command)) {
            cmd = AcmdHashMap.get(command);
        }
        return cmd;
    }
}
