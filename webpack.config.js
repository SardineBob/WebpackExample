var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './main.jsx'
    ],
    output:{
        //path.join的兩個參數，可依目前作業系統的檔案路徑規則，協助串接符號
        path: path.join(__dirname, 'dist'),
        filename: 'compiled.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules:[
            {
                // '/' 是 JS 正則表達式標記，'.' 是正則表達式關鍵字，所以前面要加個 '\' 讓正則表達式以字元方式處理，'|' 是 '或' 的意思，'$' 是字串結束符號
                // 整體意思是找檔名末尾是 .js 或 .jsx 的
                test: /\.(js|jsx)$/,
	            // node_modules 的 JS 檔必定是瀏覽器原本就能吃的 ES5，不需要經過編譯，所以忽略以增加效率和避免錯誤
                exclude: /node_modules/,
                use: {
                    // '-loader' 可省略，即 'babel'
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    devtool: 'sourcemaps',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};