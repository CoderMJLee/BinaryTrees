package com.mj.example;

import com.mj.printer.BinaryTrees;

import java.util.ArrayList;
import java.util.List;

import com.mj.printer.BinaryTreeInfo;
import com.mj.printer.BinaryTrees.PrintStyle;

public class Main {
	
	public static void main(String[] args) {
		tree1();
		tree2();
		tree3();
	}
	
	static void tree1() {
		for (BinarySearchTree<Integer> bst : bsts) {
			// PrintStyle.LEVEL_ORDER（层序打印）
			BinaryTrees.println(bst); 
			
			System.out.println(LINE);
			
			// PrintStyle.INORDER（中序打印）
			BinaryTrees.println(bst, PrintStyle.INORDER);
			
			System.out.println(LINE);
		}
	}
	
	static void tree2() {
		// other usage
		BinaryTreeInfo info1 = new BinaryTreeInfo() {
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
		};
		BinaryTrees.println(info1);
		System.out.println(LINE);
		BinaryTrees.println(info1, PrintStyle.INORDER);
		System.out.println(LINE);

		
		
		BinaryTreeInfo info2 = new BinaryTreeInfo() {
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
		};
		BinaryTrees.println(info2);
		System.out.println(LINE);
		BinaryTrees.println(info2, PrintStyle.INORDER);
	}
	
	static void tree3() {
		  // String string = BinaryTrees.printString(bsts.get(0));
		  // Files.writeToFile("F:/a/b/c/1.txt", string);
	}

	static final String LINE = "----------------------------------";
	static List<BinarySearchTree<Integer>> bsts = new ArrayList<>();
	
	static BinarySearchTree<Integer> bst(Integer ints[]) {
		if (ints == null) return null;
		BinarySearchTree<Integer> bst = new BinarySearchTree<Integer>();
		for (Integer integer : ints) {
			bst.add(integer);
		}
		return bst;
	}
	
	static {
		bsts.add(bst(new Integer[]{
				7,4,9,2,5,8,11,1,3,6,10,12
			}));
		bsts.add(bst(new Integer[]{
				381, 12, 410, 9, 40, 394, 540, 
				35, 190, 476, 760, 146, 445,
				600, 800
			}));
		
		// 二叉树数量
		int bstCount = 3;
		for (int i = 0; i < bstCount; i++) {
			BinarySearchTree<Integer> bst = new BinarySearchTree<Integer>();
			bsts.add(bst);
			
			// 二叉树的节点数量
			int nodeCount = (int) (10 + Math.random() * 30);
			for (int j = 0; j < nodeCount; j++) {
				double random = Math.random();
				// 每个节点的值
				int element = 0;
				if (random > 0.6) {
					element = (int) (Math.random() * 10000);
				} else if (random > 0.3) {
					element = (int) (Math.random() * 1000);
				} else {
					element = (int) (Math.random() * 100);
				}
				bst.add(element);
			}
		}
	}
}
