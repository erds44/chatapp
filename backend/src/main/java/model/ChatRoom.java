package model;

import java.util.List;

/**
 * Chat room stores necessary chat room properties.
 */
public class ChatRoom {
    private String name;
    private User owner;
    private List<String> interestsRequirement; // if list is null then no restriction, if not then private

    /**
     * Public constructor.
     * @param name name of the room
     * @param owner owner of the room
     * @param interestsRequirement
     */
    public ChatRoom(String name, User owner, List<String> interestsRequirement) {
        this.name = name;
        this.owner = owner;
        this.interestsRequirement = interestsRequirement;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public void setInterestsRequirement(List<String> interestsRequirement) {
        this.interestsRequirement = interestsRequirement;
    }

}
