//
//  MJPrinter.h
//  BinaryTreePrinterOC
//
//  Created by MJ Lee on 2019/5/1.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MJBinaryTreeInfo.h"

NS_ASSUME_NONNULL_BEGIN

@interface MJPrinter : NSObject
@property (nonatomic, strong) id<MJBinaryTreeInfo> tree;
+ (instancetype)printerWithTree:(id<MJBinaryTreeInfo>)tree;
- (void)println;
- (void)print;
- (NSString *)printString;
@end

NS_ASSUME_NONNULL_END
