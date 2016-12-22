import path from "path";

export default {
    "debug": true,
    "devtool": "inline-source-map",
    "noInfo": false,
    "entry": [
        path.resolve(__dirname, "src/index")
    ],
    "target": "node",
    "output": {
        "path": path.resolve(__dirname, "src"),
        "publicPath": "/",
        "filename": "bundle.js"
    },
    "plugins": [],
    "module": {
        "loaders": [
            {"test": /\.js$/, "exclude": /node_modules/, "loaders": ["babel"]},
            {"test": /\.es6/, "exclude": /node_modules/, "loaders": ["babel"]},
            {"test": /\.css$/, "loaders": ["style", "css"]}
        ]
    },
    "resolve": {
        "extensions": ["", ".js", ".jsx", ".es6", "json"]
    }
};
