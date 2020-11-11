package utility;

import java.util.Map;

/**
 * This class provides some tools for debugging.
 */
public class Debug {
    /**
     * Print a map for debugging.
     *
     * @param map   map
     * @param title name
     * @param <T>   generic type of key
     * @param <G>   generic type of value
     */
    public static <T, G> void printMap(Map<T, G> map, String title) {
        System.out.println(title);
        map.forEach((key, value) -> System.out.println(key + ":" + value + " " + value.getClass()));
        System.out.println("----------------------------------------------------");
    }
}
