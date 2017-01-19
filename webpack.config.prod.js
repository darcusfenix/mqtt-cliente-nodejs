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

        new webpack.optimize.DedupePlugin(),

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
