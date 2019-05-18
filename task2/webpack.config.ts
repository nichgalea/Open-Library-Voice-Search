import { Configuration } from "webpack";
import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolve, join } from "path";

const basePath = resolve(__dirname, "src");

const config: Configuration = {
  target: "web",
  entry: join(basePath, "index.ts"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".scss"],
    mainFiles: ["index"],
    plugins: [new TsConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              camelCase: "dashes"
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: "raw-loader"
      }
    ]
  },
  devServer: { port: 9000 },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(basePath, "index.html")
    })
  ]
};

export default config;
