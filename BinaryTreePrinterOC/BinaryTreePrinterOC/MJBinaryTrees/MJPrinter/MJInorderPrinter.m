//
//  MJInorderPrinter.m
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "MJInorderPrinter.h"
#import "NSString+Trees.h"

@implementation MJInorderPrinter

static NSString *rightAppend;
static NSString *leftAppend;
static NSString *blankAppend;
static NSString *lineAppend;

+ (void)initialize {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        int length = 2;
        rightAppend = [NSString stringWithFormat:@"┌%@", [@"─" mj_repeat:length]];
        leftAppend = [NSString stringWithFormat:@"└%@", [@"─" mj_repeat:length]];
        blankAppend = [NSString mj_blank:length + 1];
        lineAppend = [NSString stringWithFormat:@"│%@", [NSString mj_blank:length]];
    });
}

/**
 * 生成node节点的字符串
 *  nodePrefix node那一行的前缀字符串
 *  leftPrefix node整棵左子树的前缀字符串
 *  rightPrefix node整棵右子树的前缀字符串
 */
- (NSString *)_printString:(id)node
               nodePrefix:(NSMutableString *)nodePrefix
               leftPrefix:(NSMutableString *)leftPrefix
               rightPrefix:(NSMutableString *)rightPrefix {
    id left = [self.tree left:node];
    id right = [self.tree right:node];
    NSString *string = [[self.tree string:node] description];
    
    NSUInteger length = string.length;
    if (length % 2 == 0) {
        length--;
    }
    length >>= 1;
    
    NSMutableString *nodeString = [NSMutableString string];
    if (right) {
        [rightPrefix appendString:[NSString mj_blank:length]];
        [nodeString appendString:[self _printString:right
                                         nodePrefix:[NSMutableString stringWithFormat:@"%@%@", rightPrefix, rightAppend]
                                         leftPrefix:[NSMutableString stringWithFormat:@"%@%@", rightPrefix, lineAppend]
                                        rightPrefix:[NSMutableString stringWithFormat:@"%@%@", rightPrefix, blankAppend]]];
    }
    [nodeString appendString:nodePrefix];
    [nodeString appendString:string];
    [nodeString appendString:@"\n"];
    if (left) {
        [leftPrefix appendString:[NSString mj_blank:length]];
        [nodeString appendString:[self _printString:left
                                         nodePrefix:[NSMutableString stringWithFormat:@"%@%@", leftPrefix, leftAppend]
                                         leftPrefix:[NSMutableString stringWithFormat:@"%@%@", leftPrefix, blankAppend]
                                        rightPrefix:[NSMutableString stringWithFormat:@"%@%@", leftPrefix, lineAppend]]];
    }
    return nodeString;
}

- (NSString *)printString {
    NSMutableString *string = [NSMutableString string];
    [string appendString:[self _printString:[self.tree root]
                                 nodePrefix:[NSMutableString string]
                                 leftPrefix:[NSMutableString string]
                                rightPrefix:[NSMutableString string]]];
    [string deleteCharactersInRange:NSMakeRange(string.length - 1, 1)];
    return string;
}
@end
