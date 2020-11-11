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
    public static final String ON_MESSAGE_ERR = "ON_MESSAGE_ERR";
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

    // Properties
    public static final String PROPERTY_SECTION = "section";
    public static final String PROPERTY_REQUEST = "request";
    public static final String PROPERTY_TYPE = "type";
    public static final String PROPERTY_MSG = "msg";
    public static final String PROPERTY_PARAM = "param";
    public static final String PROPERTY_REPORTEDUSERNAME = "reportedUsername";
    public static final String PROPERTY_REPORTEDREASON = "reportedReason";
    public static final String PROPERTY_REPORTEDROOM = "reportedRoom";

    // Dismissed methods and reasons
    public static final String TYPE_EXIT = "exit";
    public static final String TYPE_LOGOUT = "logout";
    public static final String TYPE_DISCONNECTED = "disconnected";
    public static final String TYPE_BAN = "ban";
    public static final String REASON_DISMISS_EXIT = "because the admin exits!";
    public static final String REASON_DISMISS_LOGOUT = "because the admin logs out!";
    public static final String REASON_DISMISS_DISCONNECTED = "because the admin web socket closes!";
    public static final String REASON_DISMISS_BAN = "because the admin is banned!";

    // Reason of user lefting room
    public static final String REASON_LEFT_EXIT = "through exiting!";
    public static final String REASON_LEFT_LOGOUT = "through logout!";
    public static final String REASON_LEFT_DISCONNECTED = "through closing the web socket!";

    // Requests
    public static final String REQUEST_USERNAME = "userName";
    public static final String REQUEST_BAN_USERNAME = "username";
    public static final String REQUEST_ROOM = "room";
    public static final String REQUEST_SOURCE = "source";
    public static final String REQUEST_ISPRIVATE = "isPrivate";
    public static final String REQUEST_CHATROOM = "chatRoom";
    public static final String REQUEST_INVITEUSERNAME = "inviteUserName";
    public static final String REQUEST_INVITEROOM = "invitedRoom";
    public static final String REQUEST_CURRENTUSER = "currentUser";
    public static final String REQUEST_AGE = "age";
    public static final String REQUEST_REPORTEDUSERNAME = "reportedUsername";
    public static final String REQUEST_REPORTEDREASON = "reportedReason";
    public static final String REQUEST_REPORTEDROOM = "reportedRoom";

    // Block
    public static final String NOTIFY_BLOCK_ERR = " already blocked!";
    public static final String NOTIFY_BLOCK_SUCCESS = " blocked successfully!";

    // Command
    public static final String COMMAND_LOGIN = "login";
    public static final String COMMAND_LOGOUT = "logout";
    public static final String COMMAND_CREATEROOM = "createRoom";
    public static final String COMMAND_EXITROOM = "exitRoom";
    public static final String COMMAND_EXITALLROOM = "exitAllRoom";
    public static final String COMMAND_JOINROOM = "joinRoom";
    public static final String COMMAND_REPORT = "report";
    public static final String COMMAND_BAN = "ban";
    public static final String COMMAND_FORCETOLEAVE = "forceToLeave";
    public static final String COMMAND_BREOADCAST = "broadcast";
    public static final String COMMAND_RECALL = "recallMessage";
    public static final String COMMAND_EDIT = "editMessage";
    public static final String COMMAND_DELETE = "deleteMessage";
    public static final String COMMAND_PRIVATE = "privateMessage";
    public static final String COMMAND_BLOCK = "block";
    public static final String COMMAND_INVITE = "invite";
}
