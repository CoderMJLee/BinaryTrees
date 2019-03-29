package com.mj;

import com.mj.tool.BinaryTreePrinter;
import com.mj.tool.Files;

public class Main {

	static BinarySearchTree<Integer> bst(Integer ints[]) {
		if (ints == null) return null;
		BinarySearchTree<Integer> bst = new BinarySearchTree<Integer>();
		for (Integer integer : ints) {
			bst.add(integer);
		}
		return bst;
	}
	
	public static void main(String[] args) {
		BinarySearchTree<Integer> bst1 = bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			});
		BinarySearchTree<Integer> bst2 = bst(new Integer[]{
				381, 12, 410, 9, 40, 394, 540, 
				35, 190, 476, 760, 146, 445,
				600, 800
			});
		BinarySearchTree<Integer> bst3 = bst(new Integer[]{
				30, 10, 60, 5, 20, 40, 80,
				15, 50, 70, 90
			});
		
		// initialize printer
		BinaryTreePrinter printer = new BinaryTreePrinter();
		
		// optional setting
		printer.setCompacted(false);
		printer.setClosestSpace(3);
		
		// print
		printer.println(bst1);
		printer.println(bst2);
		printer.println(bst3);
		
		// also can write to file
		String filePath = "/Users/mj/Desktop/bst.txt";
		// String filePath = "C:/test/bst.txt";
		String printString = printer.printString(bst1);
		Files.writeToFile(filePath, printString);
	}
}
