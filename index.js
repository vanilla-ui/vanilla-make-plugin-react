import webpack from "./webpack";

export default {
  webpack,
  entry: {
    client: require.resolve("./entry/client"),
    server: require.resolve("./entry/server"),
  },
};
