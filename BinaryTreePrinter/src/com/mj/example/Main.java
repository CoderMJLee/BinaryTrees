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
	
	static void tree1(BinaryTreePrinter printer) {
		BinarySearchTree<Integer> bst = bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			});
		printer.treeln(bst);
		/*
		        7
		      /   \
		    4       9
		   / \     / \
		  2   5   8   11
		 / \   \     /  \
		1   3   6   10  12
		 */
		
		// compacted, space is 3
		// 紧凑显示，最小间距是3
		printer.treeln(bst, true, 3);
		/*
		       7
		     /   \
		    4     9
		   / \   / \
		  2   5 8   11
		 / \   \   /  \
		1   3   6 10  12
		 */
		
		printer.treeln(bst(new Integer[]{
				381, 12, 410, 9, 40, 394, 540, 
				35, 190, 476, 760, 146, 445,
				600, 800
			}));
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
	}
	
	static void tree2(BinaryTreePrinter printer) {
		// other usage
		printer.treeln(new NodeOperation() {
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
		
		printer.treeln(new NodeOperation() {
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
	}
	
	static void tree3(BinaryTreePrinter printer) {
		// also can write to file
		String filePath = "F:/test/bst.txt";

		// generate print string
		String string = printer.treeString(bst(new Integer[]{
				30, 10, 60, 5, 20, 40, 80,
				15, 50, 70, 90
			}));
		Files.writeToFile(filePath, string);
		/*
		        30
		     /      \
		  10          60
		 /  \       /    \
		5    20   40      80
		    /       \    /  \
		  15        50  70  90
		*/
	}
	
	static void list(BinaryTreePrinter printer) {
		BinarySearchTree<Integer> bst = bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			});
		printer.listln(bst);
		/*
		7
		├──── 9
		│     ├──── 11
		│     │     ├──── 12
		│     │     └──── 10
		│     └──── 8
		└──── 4
		      ├──── 5
		      │     └───R 6
		      └──── 2
		            ├──── 3
		            └──── 1
		 */

		// show left first, show directions
		// 先显示左子树，再显示右子树。并且显示方向
		printer.listln(bst, true, true);
		/*
		7
		├───L 4
		│     ├───L 2
		│     │     ├───L 1
		│     │     └───R 3
		│     └───R 5
		│           └───R 6
		└───R 9
		      ├───L 8
		      └───R 11
		            ├───L 10
		            └───R 12
		 */
	}
	
	public static void main(String[] args) {
		// initialize printer
		BinaryTreePrinter printer = new BinaryTreePrinter();
		
		tree1(printer);
		tree2(printer);
		tree3(printer);
		
		list(printer);
	}
}
