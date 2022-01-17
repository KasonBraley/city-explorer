const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = {
    entry: {
        app: "./src/index.jsx",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Production",
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [{ loader: "html-loader" }],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
}
