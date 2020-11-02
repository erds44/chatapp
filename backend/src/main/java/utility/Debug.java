package utility;

import java.util.Map;

/**
 * This class provides some tools for debugging.
 */
public class Debug {

    public static <T, G> void printMap(Map<T, G> map, String title ){
        System.out.println(title);
        map.forEach((key, value) -> System.out.println(key + ":" + value + " " + value.getClass()));
        System.out.println("----------------------------------------------------");
    }
}
