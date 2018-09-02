# NPM環境初始建置
    npm init
# React安裝
    npm install --save react react-dom
# Babel安裝與配置
## - 安裝核心套件(babel-core)
## - 安裝支援錯誤語法檢查(babel-eslint)
## - 安裝支援編譯ES6語法(babel-preset-es2015)
## - 安裝支援編譯JSX語法(babel-preset-react)
## - 安裝用webpack編譯時的loader(babel-loader@7) ps.第七版
    npm install --save-dev babel-core babel-eslint babel-preset-env babel-preset-es2015 babel-preset-react babel-loader@7
## 接著在NPM的根目錄中建立一個【.babelrc】的檔案，告訴babel編譯的各項設定，需引入那些額外套件
    {
        "presets":[
            "es2015",
            "react"
        ]
    }
# Webpack安裝
## 因為使用babel需要逐一針對檔案編譯，故搭配一個自動打包套件webpack，幫助我們將整個網站做打包；這兩行都要做，第二行不做的話，需要設系統環境變數，指到webpack.cmd與webpack-cli.cmd，兩行都做本機的run cmd，專案的加在專案裡執行
    npm install --save-dev webpack webpack-cli //這是加至專案
    npm install -g webpack webpack-cli //這會加到本機端(路徑為：C:\Users\Bob-Lai\AppData\Roaming\npm)
## Webpack同樣需要做一些設定檔，在npm根目錄新增一個webpack.config.js，並輸入以下內容，所有設定會放在module.exports中
    var path = require('path');
    var webpack = require('webpack');

    module.exports={};
## entry：這是告訴webpack將每個設定在entry的jsx檔案都進行編譯，其中包含內部引用到的require文件如css、jS、img等
    entry: [
        './main.jsx'
    ]
## output：打包後，生成的檔案路徑，其中常用的屬性如下列：
### - path:打包後生成的目錄
### - filename:打包後生成的檔案名稱
    output:{
        //path.join的兩個參數，可依目前作業系統的檔案路徑規則，協助串接符號
        path: path.join(__dirname, 'dist'),
        filename: 'compiled.js'
    }
## resolve：內部引用檔案相關配置，其中常用的屬性如下列：
### - extensions:require可省略的副檔名
    resolve: {
        extensions: ['.js', '.jsx']
    }
## module：屬性loaders是將entry 及 require 到的檔都會依此轉換成 JS，常用的屬性如下列：
### - test:指定目標檔案的檔名
### loader:指定使用的 loader
### include:白名單，只處理的目錄
### exclude:黑名單，忽略、不處理的目錄
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
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
## devtool：設置 eval 或 SourceMap 屬性，debug 用，有幾種種類
- 'eval'
- 'source-map'
- 'hidden-source-map'
- 'inline-source-map'
- 'eval-source-map'
- 'cheap-source-map'
- 'cheap-module-source-map'
### 可以混搭，code如下
    devtool: 'cheap-module-eval-source-map'
## plugins：插件配置
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
# 執行webpack，兩種做法
    webpack --watch
    webpack -p