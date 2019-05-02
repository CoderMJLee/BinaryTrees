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

typedef int (^MJBSTComparator)(id e1, id e2);

@interface MJBinarySearchTree : NSObject <MJBinaryTreeInfo>
- (NSUInteger)size;
- (BOOL)isEmpty;
- (void)add:(id)element;

+ (instancetype)tree;
+ (instancetype)treeWithComparator:(_Nullable MJBSTComparator)comparator;
@end

NS_ASSUME_NONNULL_END
