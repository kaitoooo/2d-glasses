const config = require('./config');
const path = require('path');
const Sass = require('sass');
// ビルドする際にHTMLも生成する
const HtmlWebpackPlugin = require('html-webpack-plugin');
// キャッシュパラメータを付与する
const cacheParam = new Date().getTime().toString();
// 古いファイルと未使用のファイルを削除するため
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// ファイルをコピーする
const CopyWebpackPlugin = require('copy-webpack-plugin');
// CSSを別ファイルに生成する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//パッケージのライセンス情報をjsファイルの中に含める
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/layouts/pages/index.tsx',
    output: {
        filename: 'js/[name].bundle.js?[chunkhash:7]',
        path: config.dist,
    },
    //パッケージのライセンス情報をjsファイルの中に含める
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
            }),
        ],
    },
    // モジュールの解決方法を指定
    resolve: {
        modules: [config.src, 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        fallback: {
            fs: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                // exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                exclude: /node_modules\/(?!(dom7|ssr-window)\/).*/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: '3.21.1',
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // ビルドの高速化
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /(\.s[ac]ss)$/, // 対象ファイルの拡張子
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: Sass,
                        },
                    },
                ],
            },
            {
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                // 画像をファイルとして取り込む
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/assets/',
                    publicPath: (path) => '../img/assets/' + path,
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // CSSファイル名をつける
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[chunkhash:7]',
        }),
        //コピーする対象を選択
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(config.assets, 'img'),
                    to: path.resolve(config.dist, 'img'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', '**/.gitkeep'],
                    },
                    noErrorOnMissing: true,
                },
                {
                    from: path.resolve(config.assets, 'static'),
                    to: path.resolve(config.dist, ''),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', '**/.gitkeep'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        // index.html
        new HtmlWebpackPlugin({
            cacheParam: '?ver=' + cacheParam, // キャッシュパラメータ付与
            template: path.resolve(__dirname, `./src/pages/index.html`),
            filename: 'index.html', // 出力するHTMLのファイル名
            inject: 'body', // "body" | "head" | false
            scriptLoading: 'defer',
            minify: {
                removeComments: true, // コメント削除、圧縮
            },
        }),
    ],
};
