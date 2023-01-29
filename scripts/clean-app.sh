rm -fr $TMPDIR/react-*
rm -fr $TMPDIR/metro-*
rm -fr $TMPDIR/haste-map-metro-4-*
rm -fr $TMPDIR/npm*
rm -fr $TMPDIR/*.json.gzip
watchman watch-del-all
rm -rf node_modules/
rm -f package-lock.json
rm -f package-lock.json
rm -f ios/Podfile.lock
rm -rf ios/Pods
rm -rf android/build

yarn
cd ios
pod install --repo-update
cd ..
