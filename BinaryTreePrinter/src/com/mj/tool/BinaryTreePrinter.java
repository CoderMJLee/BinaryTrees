package com.mj.tool;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Stack;

/**
 * 如果输入一棵二叉搜索树（input a binary search tree）: 
 * [7, 4, 9, 2, 5, 8, 11, 1, 3, 6, 10, 12]
 * 
 * 那么输出（output）:
 *	        7
 *	      /   \
 *	    4       9
 *	   / \     / \
 *	  2   5   8   11
 *	 / \   \     /  \
 *	1   3   6   10  12
 * 
 * 或者输出（or output）
 *	7
 *	├──── 9
 *	│     ├──── 11
 *	│     │     ├──── 12
 *	│     │     └──── 10
 *	│     └──── 8
 *	└──── 4
 *	      ├──── 5
 *	      │     └───R 6
 *	      └──── 2
 *	            ├──── 3
 *	            └──── 1
 * 
 * @author M了个J
 *
 */
public class BinaryTreePrinter {
	/**
	 * 一些节点的基本操作
	 */
	private NodeOperation mOperation;

	public void tree(NodeOperation operation, 
			Boolean compacted,
			Integer closestSpace) {
		System.out.print(treeString(operation, compacted, closestSpace));
	}
	
	/**
	 * 打印二叉树的树状显示，然后换行
	 * @param compacted 是否紧凑显示
	 * @param closestSpace 节点之间的最近距离
	 */
	public void treeln(NodeOperation operation, 
			Boolean compacted,
			Integer closestSpace) {
		tree(operation, compacted, closestSpace);
		System.out.println();
	}
	
	/**
	 * 生成二叉树的树状显示字符串
	 * @param compacted 是否紧凑显示
	 * @param closestSpace 节点之间的最近距离
	 */
	public synchronized String treeString(NodeOperation operation, 
			Boolean compacted,
			Integer closestSpace) {
		if (operation == null || operation.root() == null) return null;
		mOperation = operation;
		return new TreePrinter(this, compacted, closestSpace).toString();
	}
	
	public void tree(NodeOperation operation) {
		tree(operation, null, null);
	}
	
	public void treeln(NodeOperation operation) {
		treeln(operation, null, null);
	}
	
	public String treeString(NodeOperation operation) {
		return treeString(operation, null, null);
	}
	
	public void list(NodeOperation operation) {
		list(operation, null, null);
	}
	
	public void list(NodeOperation operation,
			Boolean leftFirst, 
			Boolean showDirections) {
		System.out.print(listString(operation, leftFirst, showDirections));
	}
	
	public void listln(NodeOperation operation) {
		listln(operation, null, null);
	}
	
	/**
	 * 打印二叉树的列表显示，然后换行
	 * @param leftFirst 是否先显示左子节点
	 * @param showDirections 是否显示方向
	 */
	public void listln(NodeOperation operation,
			Boolean leftFirst, 
			Boolean showDirections) {
		list(operation, leftFirst, showDirections);
		System.out.println();
	}
	
	public String listString(NodeOperation operation) {
		return listString(operation, null, null);
	}
	
	/**
	 * 生成二叉树的列表显示字符串
	 * @param leftFirst 是否先显示左子节点
	 * @param showDirections 是否显示方向
	 */
	public synchronized String listString(NodeOperation operation,
			Boolean leftFirst, 
			Boolean showDirections) {
		if (operation == null || operation.root() == null) return null;
		mOperation = operation;
		
		return new ListPrinter(this, leftFirst, showDirections).toString();
	}
	
	public interface NodeOperation {
		/**
		 * who is the root node
		 */
		Object root();
		/**
		 * how to get the left child of the node
		 */
		Object left(Object node);
		/**
		 * how to get the right child of the node
		 */
		Object right(Object node);
		/**
		 * how to print the node
		 */
		Object string(Object node);
	}
	
	private static class ListPrinter {
		private WeakReference<BinaryTreePrinter> mPrinter;
		/**
		 * 是否先显示左子树，再显示右子树
		 */
		private boolean mLeftFirst = true;
		/**
		 * 是否显示方向
		 */
		private boolean mShowDirections;
		
		public ListPrinter(BinaryTreePrinter printer, Boolean leftFirst, Boolean showDirections) {
			mPrinter = new WeakReference<>(printer);
			mLeftFirst = (leftFirst == null) ? false : leftFirst;
			mShowDirections = (showDirections == null) ? false : leftFirst;
		}
		
		@Override
		public String toString() {
			StringBuilder sb = new StringBuilder();
			BinaryTreePrinter printer = mPrinter.get();
			
			Stack<Node> stack = new Stack<>();
			stack.push(new Node(this, printer.mOperation.root(), null));
			
			while (!stack.isEmpty()) {
				Node node = stack.pop();
				sb.append(node.toString());
				sb.append("\n");

				Object left = printer.mOperation.left(node.mBtNode);
				Object right = printer.mOperation.right(node.mBtNode);
				if (mLeftFirst) {
					if (right != null) {
						stack.push(node.mRight = new Node(this, right, node));
					}
					if (left != null) {
						stack.push(node.mLeft = new Node(this, left, node));
					}
				} else {
					if (left != null) {
						stack.push(node.mLeft = new Node(this, left, node));
					}
					if (right != null) {
						stack.push(node.mRight = new Node(this, right, node));
					}
				}
			}
			sb.deleteCharAt(sb.length() - 1);
			return sb.toString();
		}
		
		private static class Node {
			private WeakReference<ListPrinter> mPrinter;
			public Object mBtNode;
			public int mLevel;
			public Node mLeft;
			public Node mRight;
			public Node mParent;
			private static final int LINE_COUNT = 4;
			private static final String LINE = "─";
			private static final String LEFT = "L";
			private static final String RIGHT = "R";
			private static final String LAST = "└";
			private static final String FIRST = "├";
			private static final String MIDDLE = "│";
			
			public Node(ListPrinter printer, Object node, Node parent) {
				mPrinter = new WeakReference<>(printer);
				mBtNode = node;
				mParent = parent;
				mLevel = (parent == null) ? 0 : (parent.mLevel + 1);
			}
			
			@Override
			public String toString() {
				ListPrinter printer = mPrinter.get();
				StringBuilder sb = new StringBuilder();
				int level = mLevel;
				while (level-- > 0) {
					if (level == 0) {
						Node node = printer.mLeftFirst ? mParent.mRight 
								: mParent.mLeft;
						if (this == node || node == null) {
							sb.append(LAST);
						} else {
							sb.append(FIRST);
						}
						sb.append(Strings.repeat(LINE, LINE_COUNT - 1));
						if (this == mParent.mLeft 
								&& (mParent.mRight == null 
								|| printer.mShowDirections)) {
							sb.append(LEFT);
						} else if (this == mParent.mRight 
								&& (mParent.mLeft == null 
								|| printer.mShowDirections)) {
							sb.append(RIGHT);
						} else {
							sb.append(LINE);
						}
					} else {
						Node parent = this;
						for (int i = 0; i < level; i++) {
							parent = parent.mParent;
						}
						Node pParent = parent.mParent;
						if ((printer.mLeftFirst && pParent.mLeft == parent 
								&& pParent.mRight != null)
								|| 
								(!printer.mLeftFirst && pParent.mRight == parent 
								&& pParent.mLeft != null)) {
							sb.append(MIDDLE);
						} else {
							sb.append(Strings.BLANK);
						}
						sb.append(Strings.blank(LINE_COUNT));
					}
					sb.append(Strings.BLANK);
				}

				sb.append(printer.mPrinter.get().mOperation.string(mBtNode));
				return sb.toString();
			}
		}
	}
	
	private static class TreePrinter {
		private WeakReference<BinaryTreePrinter> mPrinter;
		private static final String LEFT_LINE = "/"; 
		private static final String RIGHT_LINE = "\\"; 
		private static final int NODE_SPACE = 2; 
		/**
		 * 根节点
		 */
		private Node mRoot;
		private int mMinX;
		private int mMaxLength;
		/**
		 * 节点之间的最近距离
		 */
		private int mClosestSpace = 3; 
		/**
		 * 是否紧凑显示
		 */
		private boolean mCompacted;
		
		public TreePrinter(BinaryTreePrinter printer, Boolean compacted,
				Integer closestSpace) {
			mPrinter = new WeakReference<>(printer);
			// 初始化
			mCompacted = (compacted == null) ? mCompacted : compacted;
			mClosestSpace = (closestSpace != null && closestSpace > 1) 
					? closestSpace : mClosestSpace;
			mRoot = new Node(this, printer.mOperation.root());
			mMaxLength = mRoot.mLength;
		}
		
		/**
		 * 生成二叉树的树状显示字符串
		 * @param compacted 是否紧凑显示
		 * @param closestSpace 节点之间的最近距离
		 */
		@Override
		public String toString() {
			if (mPrinter.get().mOperation == null || mRoot == null) return null;
			
			// nodes用来存放所有的节点
			List<List<Node>> nodes = new ArrayList<>();
			fillNodes(nodes);
			cleanNodes(nodes);
			compressNodes(nodes);
			addLineNodes(nodes);
			
			// 构建字符串
			StringBuilder string = new StringBuilder();
			int rowCount = nodes.size();
			for (int i = 0; i < rowCount; i++) {
				if (i != 0) {
					string.append("\n");
				}
				
				List<Node> rowNodes = nodes.get(i);
				StringBuilder rowSb = new StringBuilder();
				for (Node node : rowNodes) {
					int leftSpace = node.mX - rowSb.length() - mMinX;
					rowSb.append(Strings.blank(leftSpace));
					rowSb.append(node.mString);
				}
				
				string.append(rowSb);
			}
					
			return string.toString();
		}
		
		/**
		 * 添加一个元素节点
		 */
		private Node addNode(List<Node> nodes, Object btNode) {
			Node node = null;
			if (btNode != null) {
				node = new Node(this, btNode);
				mMaxLength = Math.max(mMaxLength, node.mLength);
				nodes.add(node);
			} else {
				nodes.add(null);
			}
			return node;
		}
		
		/**
		 * 以满二叉树的形式填充节点
		 */
		private void fillNodes(List<List<Node>> nodes) {
			if (nodes == null) return;
			BinaryTreePrinter printer = mPrinter.get();
			
			// 第一行
			List<Node> firstRowNodes = new ArrayList<>();
			firstRowNodes.add(mRoot);
			nodes.add(firstRowNodes);

			// 其他行
			while (true) {
				List<Node> preRowNodes = nodes.get(nodes.size() - 1);
				List<Node> rowNodes = new ArrayList<>();
				
				boolean notNull = false;
				for (Node node : preRowNodes) {
					if (node == null) {
						rowNodes.add(null);
						rowNodes.add(null);
					} else {
						Node left = addNode(rowNodes, printer.mOperation.left(node.mBtNode));
						if (left != null) {
							node.mLeft = left;
							left.mParent = node;
							notNull = true;
						}
						
						Node right = addNode(rowNodes, printer.mOperation.right(node.mBtNode));
						if (right != null) {
							node.mRight = right;
							right.mParent = node;
							notNull = true;
						}
					}
				}
				
				// 全是null，就退出
				if (!notNull) break;
				nodes.add(rowNodes);
			}
			
			// 确保是偶数
			if (mMaxLength % 2 != 0) {
				mMaxLength++;
			}
		}

		/**
		 * 删除全部null、更新节点的坐标
		 */
		private void cleanNodes(List<List<Node>> nodes) {
			if (nodes == null) return;
			
			int rowCount = nodes.size();
			if (rowCount < 2) return;
			
			// 最后一行的节点数量
			int lastRowNodeCount = nodes.get(rowCount - 1).size();
			
			// 最后一行的长度
			int lastRowLength = lastRowNodeCount * mMaxLength 
					+ NODE_SPACE * (lastRowNodeCount - 1);
			
			// 空集合
			Collection<Object> nullSet = Collections.singleton(null);
			
			for (int i = 0; i < rowCount; i++) {
				List<Node> rowNodes = nodes.get(i);
				
				int rowNodeCount = rowNodes.size();
				// 节点左右两边的间距
				int cornerSpace = ((lastRowLength 
						- (rowNodeCount - 1) * NODE_SPACE) 
						/ rowNodeCount - mMaxLength) >> 1;
				
				int rowLength = 0;
				for (int j = 0; j < rowNodeCount; j++) {
					if (j != 0) {
						// 每个节点之间的间距
						rowLength += NODE_SPACE;
					}
					rowLength += cornerSpace;
					Node node = rowNodes.get(j);
					if (node != null) {
						int deltaX = (mMaxLength - node.mLength) >> 1;
						node.mX = rowLength + deltaX;
						node.mY = i;
					}
					rowLength += mMaxLength;
					rowLength += cornerSpace;
				}
				// 删除所有的null
				rowNodes.removeAll(nullSet);
			}
		}
		
		/**
		 * 压缩空格
		 */
		private void compressNodes(List<List<Node>> nodes) { 
			if (nodes == null) return;
			
			int rowCount = nodes.size();
			if (rowCount < 2) return;
			
			for (int i = rowCount - 2; i >= 0; i--) {
				List<Node> rowNodes = nodes.get(i);
				for (Node node : rowNodes) {
					Node left = node.mLeft;
					Node right = node.mRight;
					if (left == null && right == null) continue;
					if (left != null && right != null) {
						// 让左右节点对称
						node.balance(left, right);
						int space = left.closestSpaceToRight(right);
						if (mCompacted && space < (right.mX - left.rightX())) {
							// 如果最小距离 < left、right之间的距离
							// 说明最小距离是非兄弟节点之间的距离
							space -= 1; 
						} else {
							space -= mClosestSpace; 
						}
						if (space > 0) {
							space = space >> 1;
							left.translateX(space);
							right.translateX(-space);
						}
					} else if (left != null) {
						int space = node.middleX() - left.middleX() - (mClosestSpace - 1);
						if (space > 0) {
							left.translateX(space);
						}
					} else { // node.mRight != null
						int space = node.middleX() - right.middleX() + (mClosestSpace - 1);
						if (space < 0) {
							right.translateX(space);
						}
					}
				}
			}
		}
		
		/**
		 * 添加一个线节点
		 * @param parentNode 跟line相连的父节点
		 * @param childNode  跟line相连的子节点
		 * @param line line的字符串内容
		 */
		private Node addLineNode(List<Node> lineNodes, 
				Node parentNode,
				Node childNode, String line) {
			if (childNode == null) return null;
			
			Node lineNode = new Node(this, line);
			lineNodes.add(lineNode);

			/**** 这一段暂时没啥用 ****/
			lineNode.mParent = parentNode;
			if (childNode == parentNode.mLeft) {
				lineNode.mLeft = childNode;
			} else if (childNode == parentNode.mRight) {
				lineNode.mRight = childNode;
			}
			/**** 这一段暂时没啥用 ****/
			
			int middleX = parentNode.middleX() + childNode.middleX();
			lineNode.mX = middleX >> 1;
			lineNode.mY = parentNode.mY + 1;
			childNode.mY = parentNode.mY + 2;
			
			mMinX = Math.min(mMinX, childNode.mX);
			
			return lineNode;
		}

		/**
		 * 添加父子节点之间的线节点
		 */
		private void addLineNodes(List<List<Node>> nodes) {
			if (nodes == null) return;
			List<List<Node>> newNodes = new ArrayList<>();
			
			int rowCount = nodes.size();
			if (rowCount < 2) return;
			
			mMinX = mRoot.mX;
			
			for (int i = 0; i < rowCount; i++) {
				List<Node> rowNodes = nodes.get(i);
				newNodes.add(rowNodes);
				
				if (i == rowCount - 1) continue;
				
				List<Node> lineNodes = new ArrayList<>();
				for (Node node : rowNodes) {
					Node left = addLineNode(lineNodes, node, 
							node.mLeft, LEFT_LINE);
					Node right = addLineNode(lineNodes, node, 
							node.mRight, RIGHT_LINE);
					// 使左右线节点对称
					node.balance(left, right);
				}
				newNodes.add(lineNodes);
			}
			
			nodes.clear();
			nodes.addAll(newNodes);
		}
		
		private static class Node {
			@SuppressWarnings("unused")
			private WeakReference<TreePrinter> mPrinter;
			public Object mBtNode;
			public Node mLeft;
			public Node mRight;
			@SuppressWarnings("unused")
			public Node mParent;
			public int mX;
			public int mY;
			private int mHeight;
			public String mString;
			public int mLength;
			
			private void init(String string) {
				string = (string == null) ? "null" : string;
				string = string.isEmpty() ? " " : string;
				
				mLength = string.length();
				mString = string;
			}
			
			public Node(TreePrinter printer, String string) {
				mPrinter = new WeakReference<>(printer);
				init(string);
			}
			
			public Node(TreePrinter printer, Object node) {
				mPrinter = new WeakReference<>(printer);
				init(printer.mPrinter.get().mOperation.string(node).toString());
				
				mBtNode = node;
			}
			
			/**
			 * 让left和right基于this对称
			 */
			private void balance(Node left, Node right) {
				if (left == null || right == null) return;
				int deltaLeft = mX - left.rightX();
				int deltaRight = right.mX - rightX();
				int delta = Math.max(deltaLeft, deltaRight);
				left.mX = mX - delta - left.mLength;
				right.mX = rightX() + delta;
			}

			private int height(Node node) {
				if (node == null) return 0;
				if (node.mHeight != 0) return node.mHeight;
				node.mHeight = 1 + Math.max(height(node.mLeft), height(node.mRight));
				return node.mHeight;
			}
			
			/**
			 * 和右节点之间的最小距离
			 */
			private int closestSpaceToRight(Node right) {
				int height = height(this);
				int rightHeight = height(right);
				int delta = Integer.MAX_VALUE;
				for (int i = 0; i < height && i < rightHeight; i++) {
					LevelMeta meta = levelMeta(i);
					LevelMeta rightMeta = right.levelMeta(i);
					delta = Math.min(delta, rightMeta.mLeftX - meta.mRightX);
				}
				return delta;
			}
			
			private LevelMeta levelMeta(int level) {
				if (level < 0) return null;
				List<Node> list = new ArrayList<>();
				Queue<Node> queue = new LinkedList<>();
				queue.offer(this);
				
				int levelY = mY + level;
				// 层序遍历找出第level行的所有节点
				while (!queue.isEmpty()) {
					Node node = queue.poll();
					if (levelY == node.mY) {
						list.add(node);
					} else if (node.mY > levelY) break;
					
					if (node.mLeft != null) {
						queue.offer(node.mLeft);
					}
					if (node.mRight != null) {
						queue.offer(node.mRight);
					}
				}
				
				Node left = list.get(0);
				Node right = list.get(list.size() - 1);
				return new LevelMeta(left.mX, right.rightX());
			}
			public int middleX() {
				return mX + (mLength >> 1);
			}
			public int rightX() {
				return mX + mLength;
			}
			public void translateX(int deltaX) {
				mX += deltaX;
				if (mLeft != null) {
					mLeft.translateX(deltaX);
				}
				if (mRight != null) {
					mRight.translateX(deltaX);
				}
			}
		}
		
		private static class LevelMeta {
			public int mLeftX;
			public int mRightX;
			public LevelMeta(int mLeftX, int mRightX) {
				this.mLeftX = mLeftX;
				this.mRightX = mRightX;
			}
		}
	}
	
	private static class Strings {
		public static final String BLANK = " ";
		public static String repeat(String string, int count) {
			if (string == null || count <= 0) return null;
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < count; i++) {
				sb.append(string);
			}
			return sb.toString();
		}
		public static String blank(int length) {
			if (length < 0) return null;
			if (length == 0) return "";
			return String.format("%" + length + "s", "");
		}
	}
}