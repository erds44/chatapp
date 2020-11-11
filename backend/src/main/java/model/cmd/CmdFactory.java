package model.cmd;


import utility.Constant;

import java.util.HashMap;

/**
 * Command factory for making command.
 */

public class CmdFactory {
    private static CmdFactory ONLY;
    private HashMap<String, ACmd> aCmdHashMap = new HashMap<>();

    /**
     * Private Constructor for singleton pattern.
     */
    private CmdFactory() {
        aCmdHashMap.put(Constant.COMMAND_LOGIN, LoginCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_LOGOUT, LogoutCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_CREATEROOM, CreateRoomCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_EXITROOM, LeaveRoomCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_EXITALLROOM, LeaveAllRoomCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_JOINROOM, JoinRoomCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_REPORT, SendReportCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_BAN, BanCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_FORCETOLEAVE, RemoveUserCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_BREOADCAST, SendMsgCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_RECALL, RecallMsgCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_EDIT, EditMsgCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_DELETE, DeleteMsgCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_PRIVATE, PrivateMsgCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_BLOCK, BlockCmd.getSingleton());
        aCmdHashMap.put(Constant.COMMAND_INVITE, InviteCmd.getSingleton());

    }

    /**
     * Get only 1 factory.
     *
     * @return CmdFactory
     */
    public static CmdFactory getSingleton() {
        if (ONLY == null) {
            ONLY = new CmdFactory();
        }
        return ONLY;
    }

    /**
     * Create a certain command.
     *
     * @param command the name of certain command
     * @return cmd
     */
    public ACmd createCmd(String command) {
        ACmd cmd = null;
        if (aCmdHashMap.containsKey(command)) {
            cmd = aCmdHashMap.get(command);
        }
        return cmd;
    }
}
