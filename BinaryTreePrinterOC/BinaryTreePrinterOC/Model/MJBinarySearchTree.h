//
//  MJBinarySearchTree.h
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/2.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MJBinaryTreeInfo.h"

NS_ASSUME_NONNULL_BEGIN

@protocol MJBSTComparator
@required
- (int)compare:(id)e1 another:(id)e2;
@end

typedef int (^MJBSTComparatorBlock)(id e1, id e2);

@interface MJBinarySearchTree : NSObject <MJBinaryTreeInfo>
- (NSUInteger)size;
- (BOOL)isEmpty;
- (void)add:(id)element;

+ (instancetype)tree;
+ (instancetype)treeWithComparatorBlock:(_Nullable MJBSTComparatorBlock)comparator;
+ (instancetype)treeWithComparator:(_Nullable id<MJBSTComparator>)comparator;
@end

NS_ASSUME_NONNULL_END
