package com.mj.example;

import java.util.Comparator;

import com.mj.printer.BinaryTreeInfo;

@SuppressWarnings("unchecked")
public class BinarySearchTree<E> implements BinaryTreeInfo {
	private Comparator<E> mComparator;
	private Node mRoot;
	private int mSize;
	
	public BinarySearchTree() {
	}
	
	public BinarySearchTree(Comparator<E> comparator) {
		mComparator = comparator;
	}
	
	public void add(E element) {
		if (element == null) {
			throw new IllegalArgumentException("element must be not null");
		}
		
		if (mRoot == null) {
			mRoot = new Node(element, null);
			mSize++;
			return;
		}
		
		Node parent = mRoot;
		Node node = mRoot;
		int cmp = 0;
		while (node != null) {
			cmp = compare(element, node.mElement);
			parent = node;
			if (cmp > 0) {
				node = node.mRight;
			} else if (cmp < 0) {
				node = node.mLeft;
			} else {
				node.mElement = element;
				return;
			}
		}
		
		Node newNode = new Node(element, parent);
		if (cmp > 0) {
			parent.mRight = newNode;
		} else {
			parent.mLeft = newNode;
		}
		mSize++;
	}
	
	/**
	 * 比较两个元素的大小
	 */
	private int compare(E e1, E e2) {
		return (mComparator != null) 
				? mComparator.compare(e1, e2) 
						: ((Comparable<E>)e1).compareTo(e2);
	}

	private class Node {
		public E mElement;
		public Node mLeft;
		public Node mRight;
		@SuppressWarnings("unused")
		public Node mParent;
		
		public Node(E element, Node parent) {
			mElement = element;
			mParent = parent;
		}
	}

	/********** BinaryTreeInfo **********/
	@Override
	public Object root() {
		return mRoot;
	}

	@Override
	public Object left(Object node) {
		return ((Node)node).mLeft;
	}

	@Override
	public Object right(Object node) {
		return ((Node)node).mRight;
	}

	@Override
	public Object string(Object node) {
		return ((Node)node).mElement;
	}
	/********** BinaryTreeInfo **********/
}
