package com.mj.tool;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * 输入一棵二叉搜索树（input a binary search tree）: 
 * [7, 4, 9, 2, 5, 8, 11, 1, 3, 6, 10, 12]
 * 
 * 输出（output）:
 *	        7
 *	      /   \
 *	    4       9
 *	   / \     / \
 *	  2   5   8   11
 *	 / \   \     /  \
 *	1   3   6   10  12
 *
 * @author M了个J
 *
 */
public class BinaryTreePrinter {
	private static final String LEFT_LINE = "/"; 
	private static final String RIGHT_LINE = "\\"; 
	private static final int NODE_SPACE = 2; 
	/**
	 * 一些节点的基本操作
	 */
	private NodeOperation mOperation;
	/**
	 * 根节点
	 */
	private StringNode mRoot;
	private int mMinNodeX;
	private int mNodeLength;
	private int mClosestSpace = 3; 
	private boolean mCompacted = false;
	
	/**
	 * 是否紧凑显示
	 */
	public void setCompacted(boolean compacted) {
		mCompacted = compacted;
	}

	/**
	 * 节点之间的最近距离
	 */
	public void setClosestSpace(int closestSpace) {
		mClosestSpace = (closestSpace > 1) ? closestSpace : mClosestSpace;
	}
	
	public void print( NodeOperation operation) {
		System.out.println(printString(operation));
	}
	
	public void println(NodeOperation operation) {
		print(operation);
		System.out.println();
	}
	
	/**
	 * 生成二叉树的树状显示字符串
	 */
	public synchronized String printString(NodeOperation operation) {
		if (operation == null || operation.root() == null) return null;
		
		// 初始化
		mOperation = operation;
		mRoot = new StringNode(operation.root());
		mNodeLength = mRoot.mLength;
		
		// nodes用来存放所有的节点
		List<List<StringNode>> nodes = new ArrayList<>();
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
			
			List<StringNode> rowNodes = nodes.get(i);
			StringBuilder rowSb = new StringBuilder();
			for (StringNode node : rowNodes) {
				int leftSpace = node.mX - rowSb.length() - mMinNodeX;
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
	private StringNode addNode(List<StringNode> nodes, Object btNode) {
		StringNode node = null;
		if (btNode != null) {
			node = new StringNode(btNode);
			mNodeLength = Math.max(mNodeLength, node.mLength);
			nodes.add(node);
		} else {
			nodes.add(null);
		}
		return node;
	}
	
	/**
	 * 以满二叉树的形式填充节点
	 */
	private void fillNodes(List<List<StringNode>> nodes) {
		if (nodes == null) return;
		// 第一行
		List<StringNode> firstRowNodes = new ArrayList<>();
		firstRowNodes.add(mRoot);
		nodes.add(firstRowNodes);

		// 其他行
		while (true) {
			List<StringNode> preRowNodes = nodes.get(nodes.size() - 1);
			List<StringNode> rowNodes = new ArrayList<>();
			
			boolean notNull = false;
			for (StringNode node : preRowNodes) {
				if (node == null) {
					rowNodes.add(null);
					rowNodes.add(null);
				} else {
					StringNode left = addNode(rowNodes, mOperation.left(node.mBtNode));
					if (left != null) {
						node.mLeft = left;
						left.mParent = node;
						notNull = true;
					}
					
					StringNode right = addNode(rowNodes, mOperation.right(node.mBtNode));
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
		if (mNodeLength % 2 != 0) {
			mNodeLength++;
		}
	}

	/**
	 * 删除全部null、更新节点的坐标
	 */
	private void cleanNodes(List<List<StringNode>> nodes) {
		if (nodes == null) return;
		
		int rowCount = nodes.size();
		if (rowCount < 2) return;
		
		// 最后一行的节点数量
		int lastRowNodeCount = nodes.get(rowCount - 1).size();
		
		// 最后一行的长度
		int lastRowLength = lastRowNodeCount * mNodeLength 
				+ NODE_SPACE * (lastRowNodeCount - 1);
		
		// 空集合
		Collection<Object> nullSet = Collections.singleton(null);
		
		for (int i = 0; i < rowCount; i++) {
			List<StringNode> rowNodes = nodes.get(i);
			
			int rowNodeCount = rowNodes.size();
			// 节点左右两边的间距
			int cornerSpace = ((lastRowLength 
					- (rowNodeCount - 1) * NODE_SPACE) 
					/ rowNodeCount - mNodeLength) >> 1;
			
			int rowLength = 0;
			for (int j = 0; j < rowNodeCount; j++) {
				if (j != 0) {
					// 每个节点之间的间距
					rowLength += NODE_SPACE;
				}
				rowLength += cornerSpace;
				StringNode node = rowNodes.get(j);
				if (node != null) {
					int deltaX = (mNodeLength - node.mLength) >> 1;
					node.mX = rowLength + deltaX;
					node.mY = i;
				}
				rowLength += mNodeLength;
				rowLength += cornerSpace;
			}
			// 删除所有的null
			rowNodes.removeAll(nullSet);
		}
	}
	
	/**
	 * 压缩空格
	 */
	private void compressNodes(List<List<StringNode>> nodes) { 
		if (nodes == null) return;
		
		int rowCount = nodes.size();
		if (rowCount < 2) return;
		
		for (int i = rowCount - 2; i >= 0; i--) {
			List<StringNode> rowNodes = nodes.get(i);
			for (StringNode node : rowNodes) {
				StringNode left = node.mLeft;
				StringNode right = node.mRight;
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
	private StringNode addLineNode(List<StringNode> lineNodes, 
			StringNode parentNode,
			StringNode childNode, String line) {
		if (childNode == null) return null;
		
		StringNode lineNode = new StringNode(line);
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
		
		mMinNodeX = Math.min(mMinNodeX, childNode.mX);
		
		return lineNode;
	}

	/**
	 * 添加父子节点之间的线节点
	 */
	private void addLineNodes(List<List<StringNode>> nodes) {
		if (nodes == null) return;
		List<List<StringNode>> newNodes = new ArrayList<>();
		
		int rowCount = nodes.size();
		if (rowCount < 2) return;
		
		mMinNodeX = mRoot.mX;
		
		for (int i = 0; i < rowCount; i++) {
			List<StringNode> rowNodes = nodes.get(i);
			newNodes.add(rowNodes);
			
			if (i == rowCount - 1) continue;
			
			List<StringNode> lineNodes = new ArrayList<>();
			for (StringNode node : rowNodes) {
				StringNode left = addLineNode(lineNodes, node, 
						node.mLeft, LEFT_LINE);
				StringNode right = addLineNode(lineNodes, node, 
						node.mRight, RIGHT_LINE);
				// 使左右线节点对称
				node.balance(left, right);
			}
			newNodes.add(lineNodes);
		}
		
		nodes.clear();
		nodes.addAll(newNodes);
	}
	
	public interface NodeOperation {
		Object root();
		Object left(Object node);
		Object right(Object node);
	}

	private class StringNode {
		public Object mBtNode;
		public StringNode mLeft;
		public StringNode mRight;
		@SuppressWarnings("unused")
		public StringNode mParent;
		public int mX;
		public int mY;
		private int mHeight;
		public String mString;
		public int mLength;
		
		public StringNode(String string) {
			string = (string == null) ? "null" : string;
			string = string.isEmpty() ? " " : string;
			
			mLength = string.length();
			mString = string;
		}
		
		public StringNode(Object node) {
			this(node.toString());
			
			mBtNode = node;
		}
		
		/**
		 * 让left和right基于this对称
		 */
		private void balance(StringNode left, StringNode right) {
			if (left == null || right == null) return;
			int deltaLeft = mX - left.rightX();
			int deltaRight = right.mX - rightX();
			int delta = Math.max(deltaLeft, deltaRight);
			left.mX = mX - delta - left.mLength;
			right.mX = rightX() + delta;
		}

		private int height(StringNode node) {
			if (node == null) return 0;
			if (node.mHeight != 0) return node.mHeight;
			node.mHeight = 1 + Math.max(height(node.mLeft), height(node.mRight));
			return node.mHeight;
		}
		
		/**
		 * 和右节点之间的最小距离
		 */
		private int closestSpaceToRight(StringNode right) {
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
			List<StringNode> list = new ArrayList<>();
			Queue<StringNode> queue = new LinkedList<>();
			queue.offer(this);
			
			int levelY = mY + level;
			// 层序遍历找出第level行的所有节点
			while (!queue.isEmpty()) {
				StringNode node = queue.poll();
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
			
			StringNode left = list.get(0);
			StringNode right = list.get(list.size() - 1);
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
	
	private static class Strings {
		public static String blank(int length) {
			if (length < 0) return null;
			if (length == 0) return "";
			return String.format("%" + length + "s", "");
		}
	}
}