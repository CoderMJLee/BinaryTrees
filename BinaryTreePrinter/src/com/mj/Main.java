package com.mj;

import com.mj.tool.BinaryTreePrinter;
import com.mj.tool.BinaryTreePrinter.NodeOperation;
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
		// initialize printer
		BinaryTreePrinter printer = new BinaryTreePrinter();
		
		// optional setting
		printer.setCompacted(false);
		printer.setClosestSpace(3);
		
		// print
		BinarySearchTree<Integer> bst1 = bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			});
		printer.println(bst1);
		/*
		        7
		      /   \
		    4       9
		   / \     / \
		  2   5   8   11
		 / \   \     /  \
		1   3   6   10  12
		 */
		
		BinarySearchTree<Integer> bst2 = bst(new Integer[]{
				381, 12, 410, 9, 40, 394, 540, 
				35, 190, 476, 760, 146, 445,
				600, 800
			});
		printer.println(bst2);
		/*
		        381
		      /     \
		  12           410
		 /  \         /   \
		9    40     394   540
		    /  \         /   \
		 35    190    476     760
		      /       /      /   \
		    146     445    600   800
		 */
		
		printer.println(bst(new Integer[]{
				30, 10, 60, 5, 20, 40, 80,
				15, 50, 70, 90
			}));
		/*
		        30
		     /      \
		  10          60
		 /  \       /    \
		5    20   40      80
		    /       \    /  \
		  15        50  70  90
		 */
		
		// other usage
		printer.println(new NodeOperation() {
			@Override
			public Object root() {
				return 8;
			}
			
			@Override
			public Object left(Object node) {
				if (node.equals(8)) return 3;
				if (node.equals(3)) return 1;
				if (node.equals(6)) return 4;
				if (node.equals(14)) return 13;
				return null;
			}
			
			@Override
			public Object right(Object node) {
				if (node.equals(8)) return 10;
				if (node.equals(10)) return 14;
				if (node.equals(3)) return 6;
				if (node.equals(6)) return 7;
				return null;
			}
		});
		/*
		          8
			    /   \
			  3       10
			 / \        \
			1   6       14
			   / \      /
			  4   7   13
		 */
		
		// also can write to file
		String filePath = "/Users/mj/Desktop/bst.txt";
		// String filePath = "C:/test/bst.txt";

		// generate print string
		String printString = printer.printString(bst1);
		Files.writeToFile(filePath, printString);
	}
}
