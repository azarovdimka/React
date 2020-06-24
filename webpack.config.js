const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(_dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(_dirname, 'dist'),
        filename: 'index.js'
    }
    module: {
        rules: [{
            test: /\.[tj]sx?$/,
            use: ['ts-loader']
sx?$        }]
    }
}