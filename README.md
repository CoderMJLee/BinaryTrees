# BinaryTrees
> Some operations for binary tree



## BinaryTreePrinter

> Print binary tree like a real tree.
- 输入一棵二叉搜索树（input a binary search tree）: 
	-  [7, 4, 9, 2, 5, 8, 11, 1, 3, 6, 10, 12]
- 输出（output）:
```shell
         7
       /   \
     4       9
    / \     / \
   2   5   8   11
  / \   \     /  \
 1   3   6   10  12
```

- 示例（example）

```java
public class BinarySearchTree implements NodeOperation {
	/********** NodeOperation **********/
	@Override
	public Object root() {
		// tell me who is the root node
		return mRoot;
	}

	@Override
	public Object left(Object node) {
		// tell me how get the left child of the node
		return ((Node)node).mLeft;
	}

	@Override
	public Object right(Object node) {
		// tell me how get the right child of the node
		return ((Node)node).mRight;
	}
	/********** NodeOperation **********/
}

// new some bsts
BinarySearchTree<Integer> bst1 = bst(new Integer[]{
		7, 4, 9, 2, 5, 8, 11, 1, 3, 6, 10, 12
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

// initialize a printer
BinaryTreePrinter printer = new BinaryTreePrinter();

// optional setting
// printer.setCompacted(false);
// printer.setClosestSpace(3);

// print
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

printer.println(bst3);
/*
        30
     /      \
  10          60
 /  \       /    \
5    20   40      80
    /       \    /  \
  15        50  70  90
*/

// also can write to file
String filePath = "/Users/mj/Desktop/bst.txt";
// String filePath = "C:/test/bst.txt";
String printString = printer.printString(bst1);
Files.writeToFile(filePath, printString);

```

