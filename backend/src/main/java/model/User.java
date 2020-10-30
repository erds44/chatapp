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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getInterest() {
        return interest;
    }

    public void setInterest(String interest) {
        this.interest = interest;
    }
}
