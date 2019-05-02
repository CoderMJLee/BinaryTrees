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
    
    MJBinarySearchTree *bst = [[MJBinarySearchTree alloc] init];
    for (int i = 0; i < len; i++) {
        [bst add:@(data[i])];
    }
    
    [MJBinaryTrees println:bst];
    printf("---------------------------------\n");
    [MJBinaryTrees println:bst style:MJPrintStyleInorder];
}

void test2() {
    MJBinarySearchTree *bst = [[MJBinarySearchTree alloc] init];
    for (int i = 0; i < 20; i++) {
        [bst add:@((arc4random() % 666) + 1)];
    }
    
    [MJBinaryTrees println:bst];
    printf("---------------------------------\n");
    [MJBinaryTrees println:bst style:MJPrintStyleInorder];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        test2();
    }
    return 0;
}
