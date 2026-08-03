/*<listing chapter="8" number="3">*/
package KW.CH08;

/**
 * Implements the Shell sort algorithm.
 * @author Koffman and Wolfgang
 **/
public class ShellSort implements SortAlgorithm {

    /**
     * Sort the table using Shell sort algorithm.
     * pretable contains Comparable objects.
     * posttable is sorted.
     * @param table The array to be sorted
     */
    @Override
    public <T extends Comparable<T>>  void sort(T[] table) {
        // Gap between adjacent elements.
        int gap = table.length / 2;
        while (gap > 0) {
            for (int nextPos = gap; nextPos < table.length;
                    nextPos++) {
                // Insert element at nextPos in its subarray.
                insert(table, nextPos, gap);
            } // End for.

            // Reset gap for next pass.
            if (gap == 2) {
                gap = 1;
            } else {
                gap = (int) (gap / 2.2);
            }
        } // End while.
    } // End sort.

    /**
     * Inserts element at nextPos where it belongs in array.
     * preElements through nextPos - gap in subarray are sorted.
     * postElements through nextPos in subarray are sorted.
     * @param table The array being sorted
     * @param nextPos The position of element to insert
     * @param gap The gap between elements in the subarray
     */
    private static <T extends Comparable<T>>  void insert(T[] table,
            int nextPos,
            int gap) {
        T nextVal = table[nextPos]; // Element to insert.
        // Shift all values > nextVal in subarray down by gap.
        while ((nextPos > gap - 1) // First element not shifted.
                && (nextVal.compareTo(table[nextPos - gap]) < 0)) {
            table[nextPos] = table[nextPos - gap]; // Shift down.
            nextPos -= gap; // Check next position in subarray.
        }
        table[nextPos] = nextVal; // Insert nextVal.
    }
}
/*</listing>*/
