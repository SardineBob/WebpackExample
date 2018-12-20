# NPM環境初始建置
    npm init
# 如果是從github抓下來的專案，就執行以下，讓npm自行抓下載對應版本
    npm i
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
# MobX安裝
    npm install --save-dev mobx@4.3.1 mobx-react@5.2.3
# 安裝讓babel認識MobX修飾詞的plugin
    npm install --save-dev babel-plugin-transform-class-properties@6.24.1 babel-plugin-transform-decorators-legacy@1.3.5
# 開啟webpack.config.js，把上述babel的plugin加入到設定檔中
    use: {
        // '-loader' 可省略，即 'babel'
        loader: 'babel-loader',
        options: {
            presets: ['env'],
            plugins: ['transform-decorators-legacy','transform-class-properties']
            }
        }
# MobX最主要的三個修飾詞
## - observable
### 將變數加入觀察，當變數值有異動，會直接啟動render
## - computed
### 這是改變值的邏輯，呼叫方只要接受到return回來的值，就會出發render
## - action
### 這是function

# React拖拉元件使用react-sortable-hoc第三方套件
    npm install react-sortable-hoc --save
## 使用react-sortable-hoc的三個要點
### 1.會分成三個區塊，item、list、sortable
### 2.item component必須被SortableElement()再包裝，才能由list區塊呼叫使用
### 3.list component再render item component的時候，必須給予屬性【index】，這個index是在SortableElement()中使用，並指的是array的index，這很重要，元件才知道哪兩個array的Index對調
### 4.list component必須被SortableContainer()再包裝，才能由sortable區塊呼叫使用
### 5.sortable component必須準備一個onSortEnd()方法，當拖拉排序結束時，要做的事情，這是改變state狀態的邏輯
### 6.onSortEnd()等方法的事件，是用於SortableContainer()包裝物件所使用，也就是說必須當作在render list component時的屬性，其他還有很多event可以使用，詳請請看github官網【 https://github.com/clauderic/react-sortable-hoc 】
