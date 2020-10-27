package model;


import java.time.LocalTime;

/**
 * Chat Message to be displayed in a chat room.
 */
public class Message {
    private String text;
    private String sender;
    private String chatRoom;
    private LocalTime time;

    /**
     * Public constructor.
     * @param text text sent
     * @param sender text sender
     * @param chatRoom text sent chatroom
     */
    public Message(String text, String sender, String chatRoom){
        this.text = text;
        this.sender = sender;
        this.chatRoom = chatRoom;
        this.time = LocalTime.now();
    }
}
