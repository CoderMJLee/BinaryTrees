//
//  NSString+Trees.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "NSString+Trees.h"

@implementation NSString (Trees)

- (NSString *)mj_repeat:(NSUInteger)count {
    NSMutableString *string = [NSMutableString string];
    while (count-- > 0) {
        [string appendString:self];
    }
    return string;
}

+ (NSString *)mj_blank:(NSUInteger)count {
    return [@" " mj_repeat:count];
}

@end
