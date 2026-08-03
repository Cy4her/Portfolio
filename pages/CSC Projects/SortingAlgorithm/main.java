package KW.CH08;

import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

//Name: Yeshua Macwan
//Class: CSC 130

public class main {
    private static  Scanner in = new Scanner(System.in);
    private static SelectionSort SS = new SelectionSort();
    private static QuickSort2 QS = new QuickSort2();
    private static MergeSort MS = new MergeSort();
    private static InsertionSort IS = new InsertionSort();
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		User(); // runs the app
		in.close(); // close only when completely done with System.in
	    System.out.println("[System]: Thank You For Using Sorting Things!!! ");
		
	}
	
	 private static void User() {
	        while (true) {
	        	 System.out.println("\n\t\t|| Sorting Things ||\n"); // These prints acts as guide for User.
	        	 System.out.println("[System]:Welcome To The Sorting Things User!!!");
	        	 System.out.println("Here are the options you have to nivagate yourself by typing & entering the corrospanding");
	            System.out.println("\n[Select]: 0 = SelectionSort, 1 = InsertionSort, 2 = MergeSort, 3 = QuickSort, 4 = Info, q = quit");
	            System.out.print("[User]>");
	            String input = in.nextLine().trim().toLowerCase(); //Stores the user input

	            if (input.equals("q")) break; // If user chooses q it'll end the application.
	            UserInput(input); //takes the user input  and checks which one they chose.
	        }
	    }
	 
	 private static void UserInput(String input) { // Checks what user wants.
	        switch (input) {
	            case "0": // 
	            	Algorithm("SelectionSort", SS); // Passes the name and the Algorithm
	                break;

	            case "1": // 
	            	Algorithm("InsertionSort", IS);  // Passes the name and the Algorithm
	            	 break;

	            case "2": // 
	            	Algorithm("MergeSort", MS);  // Passes the name and the Algorithm
	            	 break;
	                
	            case "3": // 
	            	Algorithm("QuickSort", QS);  // Passes the name and the Algorithm
	            	 break;
	            case "4"://  Gives Information to the user How it works
	            	 System.out.println("\n\t  ||<< Information About Selection >>||");
	            	 System.out.println("[Info] Selection: Typing & entering 0,1,2,4 let's you choose which Algorithm you want."
	            	 		+ "\n[Info] After Selection: System will ask the user how many element they want to add in the array."
	            	 		+ "\nIt'll call the method, create an arry of that size, and add random number within the array. "
	            	 		+ "\nAfter, It'll display the unsorted array first, then sorts the array and finally displays the Sorted Arry at the end."
	            	 		+ "\n[Info] What is 'Q'?: It'll stop the program.");
	            	 System.out.println("\n\t  ||<< Information About Algorithm  >>||");
	            	 System.out.println("[Info] Selection Sort: O(n²), simple but slow."
	            	 		+ "\n[Info] Insertion Sort: O(n²), good on almost-sorted data."
	            	 		+ "\n[Info] Merge Sort: O(n log n), stable and efficient."
	            	 		+ "\n[Info] Quick Sort: O(n log n) average, very fast.");

	            	 
	            	 break;
	            default:  System.out.println("[System]:Unknown option Detected Use: 0,1,2,3 or q.");
	        }
	    }
	 
	 private static void Algorithm(String name, SortAlgorithm sorter) {
		 System.out.print("[System]: Please enter the number of elements you want within the Array (N): ");
		 int N = ArraySizeNum(); // Stores the number as N and The method makes user choose the size of the array
		 Integer[] arr = InsertRandomInt(N); //calls the method that creates the array with the size that user chose
		 
		 System.out.println("\n\t\t|| OUT-PUT ||");
		 System.out.println("\n[Original Array] " + name + ":"); // Displays The Original Array
		 printArray(arr); //Prints The Array
	 
		 
		 
	     Integer[] copy = Arrays.copyOf(arr, arr.length);   
	     sorter.sort(copy); // sorts the array depending on what user choose
	     
	     
	     
	     if (name == "SelectionSort") { 
	    	 System.out.println("[Sorted Array] " + name + ":"); //Prints the Sorted Array
	    	 printArray(copy); //Prints The Array
	    	 System.out.println("Sorting Algorithm name: " + name); //Prints name of the Sorting Algorithm
	    	 System.out.println("Array element number: " + N); //Prints The size of the array or how many elements are within the array
	    	 System.out.println("Comparisons: " + SS.getComparisons() );} 
	     
	     
	     
	     else if (name == "InsertionSort") { 
	    	 System.out.println("[Sorted Array] " + name + ":"); //Prints the Sorted Array
	    	 printArray(copy); //Prints The Array
	    	 System.out.println("Sorting Algorithm name: " + name); //Prints name of the Sorting Algorithm
	    	 System.out.println("Array element number: " + N); //Prints The size of the array or how many elements are within the array
	    	 System.out.println("Comparisons: " + IS.getComparisons() );}
	     
	     
	     
	     else if (name == "MergeSort") {
	    	 System.out.println("[Sorted Array] " + name + ":"); //Prints the Sorted Array
	    	 printArray(copy); //Prints The Array
	    	 System.out.println("Sorting Algorithm name: " + name); //Prints name of the Sorting Algorithm
	    	 System.out.println("Array element number: " + N); //Prints The size of the array or how many elements are within the array
	    	 System.out.println("Comparisons: " + MS.getComparisons() );}
	     
	     
	     
	     else if (name == "QuickSort") { 
	    	 System.out.println("[Sorted Array] " + name + ":" ); //Prints the Sorted Array
	    	 printArray(copy); //Prints The Array
	    	 System.out.println("Sorting Algorithm name: " + name); //Prints name of the Sorting Algorithm
	    	 System.out.println("Array element number: " + N); //Prints The size of the array or how many elements are within the array
	    	 System.out.println("Comparisons: " + QS.getComparisons()  );}

	 }
	 
	 private static void printArray(Integer[] arr) { // Prints the array it goes to next line after 50 columns

		    int columns = 50;  

		    System.out.println("[");

		    for (int i = 0; i < arr.length; i++) {
		        System.out.print("  " + arr[i]);

		        // checks if its the last element or not if not prints the comma to separate
		        if (i < arr.length - 1) System.out.print(",");

		        // print newline every 50 elements
		        if ((i + 1) % columns == 0) System.out.println();
		    }

		    System.out.println("\n]");
		}

	 
	 private static Integer[] InsertRandomInt(int N) { //Generates random number for the array to be inserted
	        Random rand = new Random(); // random number generator class
	        Integer[] arr = new Integer[N];
	        for (int i = 0; i < N; i++) arr[i] = rand.nextInt(100000); // inserts random number between 0 to 1000000
	        return arr;
	    }
	 
	 private static int ArraySizeNum() { //Ask user what array size they want.
	        while (true) {
	            try {
	                int num = Integer.parseInt(in.nextLine().trim());
	                
	                
	                if (num >= 50000) System.out.println("[System] The Choosen number is Too big. Please type smaller max is 50000. \n[User]>"); // checks if the user puts a large number or not
	                else if (num > 0) return num; // return the number if the chosen number is not too big
	                else System.out.print("[System]: Please enter a positive integer \n[User]> "); // Prints this if the number is negative.
	                
	            	} catch (Exception e) {
	                System.out.print("[System]: Invalid input. Try again: \n[User]> "); // if it's not integer it tells user it's not a valid input
	            }
	        }
	    }

}
