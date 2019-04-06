package com.mj.printer;

/**
   ┌───381────┐
   │          │
┌─12─┐     ┌─410─┐
│    │     │     │
9  ┌─40─┐ 394 ┌─540─┐
   │    │     │     │
  35 ┌─190 ┌─476 ┌─760─┐
     │     │     │     │
    146   445   600   800
    
             ┌──800
         ┌──760
         │   └──600
     ┌──540
     │   └──476
     │       └──445
 ┌──410
 │   └──394
381
 │     ┌──190
 │     │   └──146
 │  ┌──40
 │  │  └──35
 └──12
    └──9
  
 * @author M了个J
 *
 */
public final class BinaryTrees {

	private BinaryTrees() {
	}

	public static void print(BinaryTreeInfo tree) {
		print(tree, null);
	}

	public static void println(BinaryTreeInfo tree) {
		println(tree, null);
	}

	public static void print(BinaryTreeInfo tree, PrintStyle style) {
		if (tree == null || tree.root() == null)
			return;
		printer(tree, style).print();
	}

	public static void println(BinaryTreeInfo tree, PrintStyle style) {
		if (tree == null || tree.root() == null)
			return;
		printer(tree, style).println();
	}

	public static String printString(BinaryTreeInfo tree) {
		return printString(tree, null);
	}

	public static String printString(BinaryTreeInfo tree, PrintStyle style) {
		if (tree == null || tree.root() == null)
			return null;
		return printer(tree, style).printString();
	}

	private static Printer printer(BinaryTreeInfo tree, PrintStyle style) {
		if (style == PrintStyle.INORDER) {
			return new InorderPrinter(tree);
		}
		return new LevelOrderPrinter(tree);
	}

	public enum PrintStyle {
		LEVEL_ORDER, INORDER
	}
}