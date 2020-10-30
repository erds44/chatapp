package model;

/**
 * User stores necessary user infomations.
 */
public class User {
    private int age;
    private String name;
    private String school;
    private String[] interest;

    /**
     * Public constructor.
     * @param name name of the user
     * @param school name of the school
     * @param interest interest of the user
     * @param age age of the user
     */

    public User(String name, String school, String[] interest, int age) {
        this.age = age;
        this.name = name;
        this.school = school;
        this.interest = interest;
    }

    /**
     * Get the name of the user.
     * @return
     */
    public String getName() {
        return name;
    }
}
