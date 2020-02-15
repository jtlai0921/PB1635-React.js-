﻿//
//  ReactVersion.h
//  ReactVersion
//
//  Created by Vic on 15/10/13.
//  Copyright c 2015年 fx-team. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTBridge.h"

@interface ReactVersion : NSObject<RCTBridgeModule>

+ (NSURL *)currentVersionPath;

+ (void)setInAppVersion:(NSString *)version;

@end
