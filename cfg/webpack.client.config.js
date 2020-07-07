function setupDevtool() {
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
}

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV == "development";
const IS_PROD = NODE_ENV == "production";

module.exports = {
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    mode: NODE_ENV ? NODE_ENV : 'production',
    entry: path.resolve(__dirname, '../src/client/index.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js'
    },
    module: {
        rules: [{
            test: /\.[tj]sx?$/,
            use: ['ts-loader']
        }]
    },
    devtool: setupDevtool()
};