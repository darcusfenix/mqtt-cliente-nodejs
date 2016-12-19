import path from "path";
import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtrackTextPlugin from "extract-text-webpack-plugin";

export default {
    "debug": true,
    "devtool": "source-map",
    "noInfo": false,
    "entry": {
        //"vendedor": path.resolve(__dirname, "src/vendedor"),
        "bundle": path.resolve(__dirname, "src/index")
    },
    "target": "web",
    "output": {
        "path": path.resolve(__dirname, "public"),
        "publicPath": "/",
        "filename": "[name].js"
    },
    "plugins": [
/*
        new ExtrackTextPlugin("[name].[contentHash].css"),

        new WebpackMd5Hash(),

        new webpack.optimize.CommonsChunkPlugin({
            "name": "vendedor"
        }),

        new HtmlWebPackPlugin({
            "template": "src/login.htm",
            "minify": {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            "inject": true,
            "trackJSToken": "5d4ab205296d4c4cb0cf237faf448888"
        }),
        */

        // Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),

        // Minify JS
        new webpack.optimize.UglifyJsPlugin()
    ],
    "module": {
        "loaders": [
            {"test": /\.js$/, "exclude": /node_modules/, "loaders": ["babel"]},
            {"test": /\.es6/, "exclude": /node_modules/, "loaders": ["babel"]},
           // {"test": /\.css$/, "loader": ExtrackTextPlugin.extract("css?sourceMap")}
        ]
    },
    "resolve": {
        "extensions": ["", ".js", ".jsx", ".es6", "json"]
    }
};
