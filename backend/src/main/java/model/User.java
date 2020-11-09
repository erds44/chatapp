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

    public List<String> getInterest() {
        return interest;
    }

    public Boolean getIsWarned() {
        return isWarned;
    }

    public void setIsWarned(Boolean isWarned) {
        this.isWarned = isWarned;
    }
}
