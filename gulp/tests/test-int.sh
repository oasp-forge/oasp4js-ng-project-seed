TEST_DIR=.test_int

echo "Creating test directory..."
if [ -d "$TEST_DIR" ]; then
	rm -r "$TEST_DIR"
fi

mkdir "$TEST_DIR"

echo "Copying app files..."
cp -R app "$TEST_DIR"/app
cp -R gulp "$TEST_DIR"/gulp

cp *.* .bowerrc .editorconfig .eslintrc "$TEST_DIR"

cd "$TEST_DIR"

echo "Installing dependencies..."
npm install -g bower
npm install -g gulpfile
npm install -g typings

npm install