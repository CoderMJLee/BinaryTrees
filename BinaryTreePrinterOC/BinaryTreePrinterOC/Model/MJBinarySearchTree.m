//
//  MJBinarySearchTree.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/2.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "MJBinarySearchTree.h"

@interface MJBSTNode : NSObject {
@public
    id _element;
    MJBSTNode *_left;
    MJBSTNode *_right;
    __weak MJBSTNode *_parent;
}
@end

@implementation MJBSTNode
+ (instancetype)nodeWithElement:(id)element parent:(MJBSTNode *)parent {
    MJBSTNode *node = [[self alloc] init];
    node->_element = element;
    node->_parent = parent;
    return node;
}
@end

@interface MJBinarySearchTree() {
    NSUInteger _size;
    MJBSTNode *_root;
    MJBSTComparatorBlock _comparatorBlock;
    id<MJBSTComparator> _comparator;
}
@end

@implementation MJBinarySearchTree

+ (instancetype)tree {
    return [self treeWithComparator:nil];
}

+ (instancetype)treeWithComparatorBlock:(_Nullable MJBSTComparatorBlock)comparatorBlock {
    MJBinarySearchTree *bst = [[self alloc] init];
    bst->_comparatorBlock = comparatorBlock;
    return bst;
}

+ (instancetype)treeWithComparator:(id<MJBSTComparator>)comparator {
    MJBinarySearchTree *bst = [[self alloc] init];
    bst->_comparator = comparator;
    return bst;
}

- (NSUInteger)size {
    return _size;
}

- (BOOL)isEmpty {
    return _size == 0;
}

- (void)add:(id)element {
    if (!element) return;
    
    if (!_root) {
        _root = [MJBSTNode nodeWithElement:element parent:nil];
        _size++;
        return;
    }
    
    MJBSTNode *parent = _root;
    MJBSTNode *node = _root;
    int cmp = 0;
    while (node) {
        cmp = [self _compare:element e2:node->_element];
        parent = node;
        if (cmp > 0) {
            node = node->_right;
        } else if (cmp < 0) {
            node = node->_left;
        } else {
            node->_element = element;
            return;
        }
    }
    
    MJBSTNode *newNode = [MJBSTNode nodeWithElement:element parent:parent];
    if (cmp > 0) {
        parent->_right = newNode;
    } else {
        parent->_left = newNode;
    }
    _size++;
}

#pragma mark - private methods
- (int)_compare:(id)e1 e2:(id)e2 {
    return _comparatorBlock ? _comparatorBlock(e1, e2) :
    (_comparator ? [_comparator compare:e1 another:e2] : [e1 compare:e2]);
}

#pragma mark - MJBinaryTreeInfo
- (id)left:(MJBSTNode *)node {
    return node->_left;
}

- (id)right:(MJBSTNode *)node {
    return node->_right;
}

- (id)string:(MJBSTNode *)node {
    return node->_element;
}

- (id)root {
    return _root;
}
@end
