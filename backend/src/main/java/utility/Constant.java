package utility;

/**
 * Constant class stores string literals and magic numbers.
 */
public class Constant {
    public static final String USERNAME_USED = "Username already used!";
    public static final String LOGIN_SR = "login successfully!";
    public static final String LOGOUT_SR = "logout successfully!";
    public static final String CHATROOM_USED = "Chatroom name already used!";
    public static final String CHATROOM_CREATED = " created successfully!";
    public static final String CHATROOM_EXIT = " exits successfully!";
    public static final String CHATROOM_EXITALL = "All chatroom(s) exit(s) successfully!";
    public static final String CHATROOM_JOINFALIURE = "Sorry, you are not qualified to join the room!";
    public static final String CHATROOM_BAN = "Sorry, you are banned from entering all chat rooms!";
    public static final String CHATROOM_JOINED = "Room is joined!";
    public static final String CHATROOM_JOIN = "joins successfully!";
    public static final String REQUEST_CREATEROOM = "createRoom";
    public static final String REQUEST_JOINROOM ="joinRoom";
    public static final String REQUEST_EXITROOM = "exitRoom";
    public static final String REQUEST_EXITALLROOM = "exitAllRoom";
    public static final String REQUEST_UPDATEALLROOM = "updateAllRoom";
    public static final String REQUEST_UPDATEUSERLIST = "updateUserList";
    public static final String REQUEST_REPORTUSER = "reportUser";
    public static final String REQUEST_BANUSER = "banUser";
    public static final String REQUEST_WARNUSER = "warnUser";

    public static final String REPORT ="report";
    public static final String PRIMESSAGE ="privateMessage";
    public static final String PRIMSG_SUCCESS = "Send successfully!";
    public static final String PRIMSG_BLOCK = "Sorry, you are block by the user.";
    public static final String PRIMSG_FEEDBACK = "priMsg_feedback";

    // Message related constants

    public static final String MESSAGE ="message";
    public static final String ON_MESSAGE = "ON_MESSAGE";
    public static final String DELETE_MESSAGE = "DELETE_MESSAGE";
    public static final String EDIT_MESSAGE = "EDIT_MESSAGE";
    public static final String RECALL_MESSAGE = "RECALL_MESSAGE";

    public static final String NAME = "name";
    public static final String ROOM = "room";
    public static final String LOGIN = "login";
    public static final String SCHOOL = "school";
    public static final String INTERESTS = "interests";
    public static final String SYS_SR = "sr";
    public static final String SYS_ERR = "err";
    public static final String SYS_INFO = "info";
    public static final String LOGOUT = "logout";

    // Ban source
    public static final String BAN_BROADCAST = "broadcast";
    public static final String BAN_PRIVATEMSG = "privateMsg";
    public static final String BAN_REPORT = "report";
    public static final String BAN_BROADCAST_MSG ="Your broadcast message includes inappropriate words. You are banned from joining other rooms.";
    public static final String BAN_PRIVATE_MSG = "Your private message includes inappropriate words. You are banned from joining other rooms.";
    public static final String BAN_REPORT_MSG = "You are banned from joining other rooms due to report.";
    public static final String BAN_BEHAVIOR = "has been banned due to inappropriate behaviors!";
    public static final String BAN_WARN = "Inappropriate words are detected! (You will be banned next time)";

    //invite and userlist
    public static final String PUBLIC_INVITE = "Public room can't invite";
    public static final String ALREADY_INVITE = "This user has joined the room";
    public static final String BANNED_INVITE = "This user has been banned from entering all rooms";
    public static final String NON_ADMIN_INVITE = "Only admin can invite";
    public static final String NON_EXIST_USER = "This user not exist.";
    public static final String SUCCESSFUL_INVITE = "invited you to ";

    public static final String SETALLUSERS = "setallusers";
    public static final String REQUEST_UPATEALLUSERLIST = "updateAllUsers";

}
