# List

1. project clone
2. yarn install
3. if iOS, pod install
4. if iOS, open Xcode -> Pods -> React-Codegen -> Build Settings -> iOS Deployment Target -> iOS 12.4

# Occurred iOS install error

1.  `cd UssoftExample`
2.  `yarn install`
3.  `cd ios`
4.  `rm -rf ~/Library/Caches/CocoaPods/*`
5.  `bundle install`
6.  `bundle exec pod install`

# Issue reference

- [https://reactnative.dev/docs/environment-setup?guide=native]
- [https://github.com/CocoaPods/CocoaPods/issues/11641]
- [https://github.com/CocoaPods/CocoaPods/issues/7915]
