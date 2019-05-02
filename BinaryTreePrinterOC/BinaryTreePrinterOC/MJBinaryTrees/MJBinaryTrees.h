//
//  MJBinaryTrees.h
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MJBinaryTreeInfo.h"
#import "MJLevelOrderPrinter.h"
#import "MJInorderPrinter.h"

typedef NS_ENUM(NSInteger, MJPrintStyle) {
    MJPrintStyleLevelOrder,
    MJPrintStyleInorder
};

NS_ASSUME_NONNULL_BEGIN

@interface MJBinaryTrees : NSObject
+ (void)println:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style;
+ (void)println:(id<MJBinaryTreeInfo>)tree;

+ (void)print:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style;
+ (void)print:(id<MJBinaryTreeInfo>)tree;

+ (NSString *)printString:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style;
+ (NSString *)printString:(id<MJBinaryTreeInfo>)tree;
@end

NS_ASSUME_NONNULL_END
