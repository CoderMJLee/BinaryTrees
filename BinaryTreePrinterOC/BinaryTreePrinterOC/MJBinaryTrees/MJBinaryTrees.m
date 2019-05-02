//
//  MJBinaryTrees.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "MJBinaryTrees.h"

@implementation MJBinaryTrees

+ (void)println:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style {
    [[self _printerWithTree:tree style:style] println];
}

+ (void)println:(id<MJBinaryTreeInfo>)tree {
    [self println:tree style:MJPrintStyleLevelOrder];
}

+ (void)print:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style {
    [[self _printerWithTree:tree style:style] print];
}

+ (void)print:(id<MJBinaryTreeInfo>)tree {
    [self print:tree style:MJPrintStyleLevelOrder];
}

+ (NSString *)printString:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style {
    return [self _printerWithTree:tree style:style].printString;
}

+ (NSString *)printString:(id<MJBinaryTreeInfo>)tree {
    return [self printString:tree style:MJPrintStyleLevelOrder];
}

+ (MJPrinter *)_printerWithTree:(id<MJBinaryTreeInfo>)tree style:(MJPrintStyle)style {
    if (!tree) return nil;
    if (style == MJPrintStyleLevelOrder) {
        return [MJLevelOrderPrinter printerWithTree:tree];
    }
    return [MJInorderPrinter printerWithTree:tree];
}

@end
