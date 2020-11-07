package model;

import java.util.List;

/**
 * Chat room stores necessary chat room properties.
 */
public class ChatRoom {
    private String name;
    private String owner;
    private List<String> interestsRequirement; // if list is null then no restriction, if not then private
    private boolean isPublic;

    /**
     * Public constructor.
     *
     * @param name                 name of the room
     * @param owner                owner of the room
     * @param interestsRequirement requirement of interest
     */
    public ChatRoom(String name, String owner, List<String> interestsRequirement, boolean isPrivate) {
        this.name = name;
        this.owner = owner;
        this.interestsRequirement = interestsRequirement;
        this.isPublic = !isPrivate;
    }

    public String getName() {
        return this.name;
    }


    public String getOwner() {
        return this.owner;
    }


    public List<String> getInterestsRequirement() {
        return this.interestsRequirement;
    }

    public boolean getIsPublic() {
        return this.isPublic;
    }

}
