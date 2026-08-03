/*<listing chapter="8" number="2">*/
package KW.CH08;

/**
 * Implements the insertion sort algorithm.
 * @author Koffman and Wolfgang
 **/
public class InsertionSort implements SortAlgorithm {
	

    private static long comparisons = 0;  // <---------- [ADDED]

    public long getComparisons() { // <---------- [ADDED] Returns the comparison value
        return comparisons;
    }
    

    /**
     * Sort the table using insertion sort algorithm.
     * pretable contains Comparable objects.
     * posttable is sorted.
     * @param table The array to be sorted
     */
    @Override
    public <T extends Comparable<T>>  void sort(T[] table) {
    	
    	 comparisons = 0; // <-- RESET counter
    	
        for (int nextPos = 1; nextPos < table.length; nextPos++) {
            // Invariant: table[0 . . . nextPos - 1] is sorted.
            // Insert element at position nextPos
            // in the sorted subarray.
            insert(table, nextPos);
        } // End for.
    } // End sort.

    /**
     * Insert the element at nextPos where it belongs
     * in the array.
     * pretable[0 . . . nextPos - 1] is sorted.
     * posttable[0 . . . nextPos] is sorted.
     * @param table The array being sorted
     * @param nextPos The position of the element to insert
     */
    private static <T extends Comparable<T>>  void insert(T[] table,
            int nextPos) {
        T nextVal = table[nextPos]; // Element to insert.
        while (nextPos > 0
                && nextVal.compareTo(table[nextPos - 1]) < 0) {
        	
        	comparisons++; // <---------- [ADDED] Adds Everytime it compares
        	
        	
            table[nextPos] = table[nextPos - 1]; // Shift down.
            nextPos--; // Check next smaller element.
        }
        // Insert nextVal at nextPos.
        table[nextPos] = nextVal;
    }
}
/*</listing>*/
