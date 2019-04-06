package com.mj.example;

import java.util.Comparator;

import com.mj.printer.BinaryTreeInfo;

@SuppressWarnings("unchecked")
public class BinarySearchTree<E> implements BinaryTreeInfo {
	private Comparator<E> comparator;
	private Node root;
	private int size;
	
	public BinarySearchTree() {
	}
	
	public BinarySearchTree(Comparator<E> comparator) {
		this.comparator = comparator;
	}
	
	public void add(E element) {
		if (element == null) {
			throw new IllegalArgumentException("element must be not null");
		}
		
		if (root == null) {
			root = new Node(element, null);
			size++;
			return;
		}
		
		Node parent = root;
		Node node = root;
		int cmp = 0;
		while (node != null) {
			cmp = compare(element, node.element);
			parent = node;
			if (cmp > 0) {
				node = node.right;
			} else if (cmp < 0) {
				node = node.left;
			} else {
				node.element = element;
				return;
			}
		}
		
		Node newNode = new Node(element, parent);
		if (cmp > 0) {
			parent.right = newNode;
		} else {
			parent.left = newNode;
		}
		size++;
	}
	
	/**
	 * 比较两个元素的大小
	 */
	private int compare(E e1, E e2) {
		return (comparator != null) 
				? comparator.compare(e1, e2) 
						: ((Comparable<E>)e1).compareTo(e2);
	}

	private class Node {
		public E element;
		public Node left;
		public Node right;
		@SuppressWarnings("unused")
		public Node parent;
		
		public Node(E element, Node parent) {
			this.element = element;
			this.parent = parent;
		}
	}

	/********** BinaryTreeInfo **********/
	@Override
	public Object root() {
		return root;
	}

	@Override
	public Object left(Object node) {
		return ((Node)node).left;
	}

	@Override
	public Object right(Object node) {
		return ((Node)node).right;
	}

	@Override
	public Object string(Object node) {
		return ((Node)node).element;
	}
	/********** BinaryTreeInfo **********/
}
