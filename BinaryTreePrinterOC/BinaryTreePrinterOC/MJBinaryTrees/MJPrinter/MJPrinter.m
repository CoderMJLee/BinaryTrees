//
//  MJPrinter.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "MJPrinter.h"

@interface MJPrinter()
@end

@implementation MJPrinter

+ (instancetype)printerWithTree:(id<MJBinaryTreeInfo>)tree {
    MJPrinter *printer = [[self alloc] init];
    printer.tree = tree;
    return printer;
}

- (void)println {
    [self print];
    printf("\n");
}

- (void)print {
    printf("%s", self.printString.UTF8String);
}

- (NSString *)printString {
    return nil;
}

@end
