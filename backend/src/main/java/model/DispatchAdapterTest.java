package model;

import junit.framework.TestCase;
import org.eclipse.jetty.websocket.common.WebSocketSession;


import static org.mockito.Mockito.mock;

public class DispatchAdapterTest extends TestCase {
    private WebSocketSession user1 = mock(WebSocketSession.class);
    private WebSocketSession user2 = mock(WebSocketSession.class);
    private WebSocketSession user3 = mock(WebSocketSession.class);
    private WebSocketSession user4 = mock(WebSocketSession.class);
    private WebSocketSession user5 = mock(WebSocketSession.class);
    private String message;

    public void test() {
        // test login
        message = "{\"command\":\"login\",\"body\":{\"name\":\"AAAAA\",\"age\":2,\"school\":\"Rice University\",\"interests\":[\"Reading\"]}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test login", 1, DispatchAdapter.userName2user.size());

        // test create room
        message = "{\"command\":\"createRoom\",\"body\":{\"name\":\"2313\",\"interests\":[\"Music\",\"Sports\"],\"isPrivate\":true}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test create room", 1, DispatchAdapter.chatRoomName2ChatRoom.size());

        // test exit room
        message = "{\"command\":\"exitRoom\",\"body\":{\"name\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test exit room", 0, DispatchAdapter.chatRoomName2ChatRoom.size());

        // test exit all room
        message = "{\"command\":\"exitAllRoom\",\"body\":{}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test exit all rooms", 0, DispatchAdapter.chatRoomName2ChatRoom.size());

        // test join room
        message = "{\"command\":\"createRoom\",\"body\":{\"name\":\"2313\",\"interests\":[\"Music\",\"Sports\"],\"isPrivate\":false}}";
        DispatchAdapter.getSingleton().process(user1, message);
        message = "{\"command\":\"login\",\"body\":{\"name\":\"789798\",\"age\":12,\"school\":\"Rice University\",\"interests\":[\"Reading\"]}}";
        DispatchAdapter.getSingleton().process(user2, message);
        message = "{\"command\":\"joinRoom\",\"body\":{\"name\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user2, message);
        assertEquals("Test join room", 1, DispatchAdapter.chatRoomName2ChatRoom.size());
        message = "{\"command\":\"login\",\"body\":{\"name\":\"AAAAAA\",\"age\":1,\"school\":\"Rice University\",\"interests\":[\"Music\"]}}";
        DispatchAdapter.getSingleton().process(user4, message);
        message = "{\"command\":\"createRoom\",\"body\":{\"name\":\"ABC\",\"interests\":[\"Reading\"],\"isPrivate\":true}}";
        DispatchAdapter.getSingleton().process(user4, message);
        message = "{\"command\":\"login\",\"body\":{\"name\":\"7897989\",\"age\":200,\"school\":\"Rice University\",\"interests\":[\"Traveling\"]}}";
        DispatchAdapter.getSingleton().process(user5, message);
        message = "{\"command\":\"joinRoom\",\"body\":{\"name\":\"ABC\"}}";
        DispatchAdapter.getSingleton().process(user5, message);

        // test report & ban
        message = "{\"command\":\"login\",\"body\":{\"name\":\"432432423\",\"age\":1,\"school\":\"Rice University\",\"interests\":[\"Music\"]}}";
        DispatchAdapter.getSingleton().process(user3, message);
        message = "{\"command\":\"joinRoom\",\"body\":{\"name\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user3, message);
        message = "{\"command\":\"report\",\"body\":{\"reportedUsername\":\"789798\",\"reportedReason\":\"Sexual Content\",\"reportedRoom\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user3, message);
        message = "{\"command\":\"ban\",\"body\":{\"username\":\"789798\",\"room\":\"2313\",\"source\":\"report\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        message = "{\"command\":\"exitAllRoom\",\"body\":{}}";
        DispatchAdapter.getSingleton().process(user3, message);
        assertEquals("Test report", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test force to leave
        message = "{\"command\":\"forceToLeave\",\"body\":{\"userName\":\"432432423\",\"roomName\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test report", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test broadcast
        message = "{\"command\":\"broadcast\",\"body\":{\"chatRoom\":\"2313\",\"text\":\"hate\",\"id\":\"bea635c0-3589-44f8-a842-894469932132\",\"time\":1604892867811,\"sender\":\"Zhijian\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test recallMessage
        message = "{\"command\":\"recallMessage\",\"body\":{\"messageId\":\"bea635c0-3589-44f8-a842-894469932132\",\"chatRoom\":\"2313\",\"recallTime\":1604893108364}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test editMessage
        message = "{\"command\":\"editMessage\",\"body\":{\"messageId\":\"bea635c0-3589-44f8-a842-894469932132\",\"chatRoom\":\"2313\",\"editedText\":\"1232\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        //test deleteMessage
        message = "{\"command\":\"broadcast\",\"body\":{\"chatRoom\":\"2313\",\"text\":\"2312\",\"id\":\"2c8ee1ae-79f9-4157-a363-59e579120da8\",\"time\":1604893627873,\"sender\":\"AAAAA\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        message = "{\"command\":\"deleteMessage\",\"body\":{\"messageId\":\"2c8ee1ae-79f9-4157-a363-59e579120da8\",\"chatRoom\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test privateMessage
        message = "{\"command\":\"privateMessage\",\"body\":{\"name\":\"AAAAA\",\"info\":\"12312\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());

        // test block
        message = "{\"command\":\"block\",\"body\":{\"userName\":\"AAAAA\"}}";
        DispatchAdapter.getSingleton().process(user2, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());
        message = "{\"command\":\"createRoom\",\"body\":{\"name\":\"1\",\"isPrivate\":false}}";
        DispatchAdapter.getSingleton().process(user5, message);
        message = "{\"command\":\"joinRoom\",\"body\":{\"name\":\"1\"}}";
        DispatchAdapter.getSingleton().process(user4, message);
        message = "{\"command\":\"block\",\"body\":{\"userName\":\"AAAAA\"}}";
        DispatchAdapter.getSingleton().process(user5, message);
        message = "{\"command\":\"broadcast\",\"body\":{\"chatRoom\":\"ABC\",\"text\":\"42131\",\"id\":\"4c768ddb-5432-4fc8-8cc4-f244f11134c5\",\"time\":1604895955521,\"sender\":\"AAAAA\"}}";
        DispatchAdapter.getSingleton().process(user4, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());







        // test invite
        message = "{\"command\":\"invite\",\"body\":{\"currentUser\":\"AAAAA\",\"inviteUserName\":\"231\",\"invitedRoom\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());
        message = "{\"command\":\"invite\",\"body\":{\"currentUser\":\"789798\",\"inviteUserName\":\"231\",\"invitedRoom\":\"2313\"}}";
        DispatchAdapter.getSingleton().process(user2, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());
        message = "{\"command\":\"invite\",\"body\":{\"currentUser\":\"AAAAA\",\"inviteUserName\":\"789798\",\"invitedRoom\":\"ABC\"}}";
        DispatchAdapter.getSingleton().process(user4, message);
        assertEquals("Test broadcast", 1, DispatchAdapter.chatRoomName2listUser.get("2313").size());





        // test hate
        message = "{\"command\":\"broadcast\",\"body\":{\"chatRoom\":\"2313\",\"text\":\"hate\",\"id\":\"bea635c0-3589-44f8-a842-894469932132\",\"time\":1604892867811,\"sender\":\"Zhijian\"}}";
        DispatchAdapter.getSingleton().process(user1, message);
        assertEquals("Test broadcast", 3, DispatchAdapter.chatRoomName2ChatRoom.size());

        // test logout
        message = "{\"command\":\"logout\",\"body\":{}}";
        DispatchAdapter.getSingleton().process(user2, message);
        assertEquals("Test logout", 4, DispatchAdapter.userName2user.size());



    }
}
