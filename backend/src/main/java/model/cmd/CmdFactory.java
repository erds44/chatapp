package model.cmd;

/**
* @CLassName CmdFactory
* @Description TODO
* @Author  Weiwei Zhou
* @Date 11/9/20  5:37 PM
*/

public class CmdFactory {
    private static CmdFactory ONLY;

    /**
     * Private Constructor for singleton pattern.
     */
    private CmdFactory() {

    }

    /**
     * Get only 1 factory.
     *
     * @return CmdFactory.
     */
    public static CmdFactory getSingleton() {
        if (ONLY == null) {
            ONLY = new CmdFactory();
        }
        return ONLY;
    }

    public ACmd createCmd(String command) {
        ACmd cmd = null;
        switch (command) {
            case "login":
                cmd = new LoginCmd();
                break;
            case "logout":
                cmd = new LogoutCmd();
                break;
            case "createRoom":
                cmd = new CreateRoomCmd();
                break;
            case "exitRoom":
                cmd = new LeaveRoomCmd();
                break;
            case "exitAllRoom":
                cmd = new LeaveAllRoomCmd();
                break;
            case "joinRoom":
                cmd = new JoinRoomCmd();
                break;
            case "report":
                cmd = new sendReportCmd();
                break;
            case "ban":
                cmd = new BanCmd();
                break;
            case "forceToLeave":
                cmd = new RemoveUserCmd();
                break;
            case "broadcast":
                cmd = new SendMsgCmd();
                break;
            case "recallMessage":
                cmd = new RecallMsgCmd();
                break;
            case "editMessage":
                cmd = new EditMsgCmd();
                break;
            case "deleteMessage":
                cmd = new DeleteMsgCmd();
                break;
            case "privateMessage":
                cmd = new PrivateMsgCmd();
                break;
            case "block":
                cmd = new BlockCmd();
                break;
            case "invite":
                cmd = new InviteCmd();
                break;
            default:
                break;
        }
        return cmd;
    }
}
