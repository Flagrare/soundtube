const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/content.ts"],
  bundle: true,
  outfile: "dist/content.js",
  platform: "browser",
  target: ["chrome90"],
  format: "esm",
  loader: {
    ".wasm": "file",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [
    {
      name: "wasm-loader",
      setup(build) {
        build.onResolve({ filter: /\.wasm$/ }, (args) => ({
          path: args.path,
          namespace: "wasm-binary",
        }));
        build.onLoad(
          { filter: /.*/, namespace: "wasm-binary" },
          async (args) => ({
            contents: await require("fs").promises.readFile(args.path),
            loader: "file",
          })
        );
      },
    },
  ],
};

if (process.argv.includes("--watch")) {
  // Watch mode
  esbuild
    .context(buildOptions)
    .then((context) => {
      context.watch();
      console.log("Watching for changes...");
    })
    .catch(() => process.exit(1));
} else {
  // Build mode
  esbuild
    .build(buildOptions)
    .then(() => console.log("Build complete!"))
    .catch(() => process.exit(1));
}
