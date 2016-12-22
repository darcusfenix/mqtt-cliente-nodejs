import path from "path";
import nodeExternals from "webpack-node-externals";
export default {
    "debug": true,
    "devtool": "inline-source-map",
    "noInfo": false,
    "entry": [
        path.resolve(__dirname, "src/server.es6")
    ],
    "target": "node",
    "externals": [nodeExternals()],
    "output": {
        "path": path.resolve(__dirname, "src"),
        "publicPath": "/",
        "filename": "bundle.js"
    },
    "plugins": [],
    "module": {
        "loaders": [
            {"test": /\.js$/, "exclude": /node_modules/, "loaders": ["babel"]},
            {"test": /\.es6$/, "exclude": /node_modules/, "loaders": ["babel"]},
            {"test": /\.css$/, "loaders": ["style", "css"]}
        ]
    },
    "resolve": {
        "extensions": ["", ".js", ".jsx", ".es6", ".json"]

    }
};
