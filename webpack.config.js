const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        port: 8000,
    },
};