const fs = require("fs");
const path = require("path");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = {
    plugins: [
        new HtmlCriticalWebpackPlugin({
            base: path.join(path.resolve(__dirname), "dist/"),
            src: "index.html",
            inline: true,
            extract: true,
            dest: "index.html",
            width: 1625,
            height: 773,
            /* Ensure that bundled JS file is called */
            penthouse: {
                blockJSRequests: false,
            },
        }),
    ],
    devServer: {
        https: {
            key: fs.readFileSync("../server.key"),
            cert: fs.readFileSync("../server.cert"),
        },
        proxy: {
            "/api": {
                target: "https://localhost:3000",
            },
        },
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/main.scss";`,
            },
        },
    },
    // publicPath: process.env.NODE_ENV === "production" ? "/vue-chech/" : "/"
};
