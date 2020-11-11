package model;

import java.util.List;

/**
 * User stores necessary user infomations.
 */
public class User {
    private int age;
    private String name;
    private String school;
    private List<String> interest;
    private Boolean isWarned;

    /**
     * Public constructor.
     *
     * @param name     name of the user
     * @param school   name of the school
     * @param interest interest of the user
     * @param age      age of the user
     */

    public User(String name, String school, List<String> interest, int age) {
        this.age = age;
        this.name = name;
        this.school = school;
        this.interest = interest;
        this.isWarned = false;
    }

    /**
     * Get the user interests.
     * @return interest
     */
    public List<String> getInterest() {
        return interest;
    }

    /**
     * Get it the user warned.
     * @return isWarned
     */
    public Boolean getIsWarned() {
        return isWarned;
    }

    /**
     * Set the user warned.
     * @param isWarned isWarned.
     */
    public void setIsWarned(Boolean isWarned) {
        this.isWarned = isWarned;
    }
}
