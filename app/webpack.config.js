const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require('path');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './build');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

module.exports = (env, argv) => {
    const isProduction = (argv.mode === 'production');
    const apiURL = isProduction 
            ? ""
            : "";
    return {
        mode: "development",
    
        // Enable sourcemaps for debugging webpack output.
        devtool: "source-map",
    
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js"]
        },
        entry: {
            app: path.join(APP_DIR, "index.tsx"),
            editor: path.join(APP_DIR, "index-editor.tsx"),
        },
        output: {
            filename: '[name].[contenthash].js',
            path: BUILD_DIR,
        },
    
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    include: APP_DIR,
                    use: [{
                      loader: 'style-loader',
                    }, {
                      loader: 'css-loader',
                      options: {
                        modules: true,
                        namedExport: true,
                      },
                    }],
                }, 
                {
                    test: /\.css$/,
                    include: MONACO_DIR,
                    use: ['style-loader', 'css-loader'],  
                }
            ]
        },
    
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
    
        devServer: {
            contentBase: BUILD_DIR,
            compress: true,
            port: 9000
        },
    
        // https://webpack.js.org/configuration/optimization/
        optimization: {
            minimizer: [new TerserPlugin()],
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: "Choreo Console",
                template: path.join(APP_DIR, "index-mui.ejs"),
                filename: "index.html",
                excludeChunks: ["editor"]
            }),
            new HtmlWebpackPlugin({
                title: "Choreo Code Editor",
                template: path.join(APP_DIR, "index-w3css.ejs"),
                filename: "code.html",
                excludeChunks: ["app"]
            }),
            new webpack.DefinePlugin({
                API_BACKEND_URL: JSON.stringify(apiURL)
            }),
            new CopyWebpackPlugin([
                {
                    from : path.join(APP_DIR, "assets"),
                    to : ''
                }
            ], {
                ignore: [".gitkeep"]
            }),
            new MonacoWebpackPlugin({
                languages: ['ballerina'],
                features: ['bracketMatching']
            })
        ]
    };
}