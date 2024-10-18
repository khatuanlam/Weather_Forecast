const path = require('path');

module.exports = {
    mode: 'development', // hoặc 'production' tùy theo nhu cầu
    entry: './src/index.ts', // thay đổi đường dẫn đến tệp entry của bạn
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // thư mục xuất ra
    },
    resolve: {
        extensions: ['.ts', '.js'], // thêm .ts để Webpack có thể hiểu TypeScript
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader', // hoặc sử dụng babel-loader nếu cần
            exclude: /node_modules/,
        }, ],
    },
    node: {
        fs: 'empty', // Bỏ qua mô-đun fs
    },
};