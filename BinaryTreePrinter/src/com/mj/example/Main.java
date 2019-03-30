package com.mj.example;

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
		
		// print
		BinarySearchTree<Integer> bst1 = bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			});
		printer.println(bst1);
//		printer.println(bst1, true, 3);
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

			@Override
			public Object string(Object node) {
				return node;
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
		
		printer.println(new NodeOperation() {
			@Override
			public Object root() {
				return "Life";
			}
			
			@Override
			public Object left(Object node) {
				if (node.equals("Life")) return "Animal";
				if (node.equals("Person")) return "Man";
				if (node.equals("Animal")) return "Cat";
				if (node.equals("Dog")) return "Teddy";
				return null;
			}
			
			@Override
			public Object right(Object node) {
				if (node.equals("Life")) return "Person";
				if (node.equals("Person")) return "Woman";
				if (node.equals("Animal")) return "Dog";
				if (node.equals("Dog")) return "SingleDog";
				return null;
			}

			@Override
			public Object string(Object node) {
				return node;
			}
		});
		/*
		          Life
		        /      \
		  Animal        Person
		   /  \         /    \
		Cat    Dog    Man    Woman
		     /     \
		 Teddy   SingleDog
		 */
		
		// also can write to file
		// String filePath = "C:/test/bst.txt";
		String filePath = "/Users/mj/Desktop/bst.txt";

		// generate print string
		String string = printer.printString(bst1);
		Files.writeToFile(filePath, string);
	}
}
