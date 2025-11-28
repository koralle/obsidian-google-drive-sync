declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    npm_package_version: `${number}.${number}.${number}`;
  }
}
