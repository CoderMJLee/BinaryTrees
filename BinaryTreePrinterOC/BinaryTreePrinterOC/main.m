//
//  main.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MJBinaryTrees.h"
#import "MJBinarySearchTree.h"

void test1() {
    int data[] = { 38, 18, 4, 69, 85, 71, 34, 36, 29, 100 };
    int len = sizeof(data) / sizeof(int);
    
    MJBinarySearchTree *bst = [MJBinarySearchTree tree];
    for (int i = 0; i < len; i++) {
        [bst add:@(data[i])];
    }
    
    [MJBinaryTrees println:bst];
    printf("---------------------------------\n");
    [MJBinaryTrees println:bst style:MJPrintStyleInorder];
    printf("---------------------------------\n");
}

void test2() {
    int data[] = { 38, 18, 4, 69, 85, 71, 34, 36, 29, 100 };
    int len = sizeof(data) / sizeof(int);
    
    MJBinarySearchTree *bst = [MJBinarySearchTree
                               treeWithComparatorBlock:^int(id  _Nonnull e1, id  _Nonnull e2) {
        return [e2 compare:e1];
    }];
    for (int i = 0; i < len; i++) {
        [bst add:@(data[i])];
    }
    
    [MJBinaryTrees println:bst];
    printf("---------------------------------\n");
    [MJBinaryTrees println:bst style:MJPrintStyleInorder];
    printf("---------------------------------\n");
}

void test3() {
    MJBinarySearchTree *bst = [MJBinarySearchTree tree];
    for (int i = 0; i < 20; i++) {
        [bst add:@((arc4random() % 666) + 1)];
    }
    
    [MJBinaryTrees println:bst];
    printf("---------------------------------\n");
    [MJBinaryTrees println:bst style:MJPrintStyleInorder];
    printf("---------------------------------\n");
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        test1();
        test2();
        test3();
    }
    return 0;
}
