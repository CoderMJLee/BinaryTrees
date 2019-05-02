//
//  MJBinaryTreeInfo.h
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol MJBinaryTreeInfo <NSObject>
@required
/**
 * who is the root node
 */
- (id)root;
/**
 * how to get the left child of the node
 */
- (id)left:(id)node;
/**
 * how to get the right child of the node
 */
- (id)right:(id)node;
/**
 * how to print the node
 */
- (id)string:(id)node;
@end

NS_ASSUME_NONNULL_END
