// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const { peerDependencies } = require("../package.json");

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, "..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];

// Reanimated and Worklets can have private dependencies (for example semver 7)
// alongside older hoisted versions. Metro must be able to find those packages.
config.resolver.disableHierarchicalLookup = false;

const sharedPackages = Object.keys(peerDependencies);
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolve = defaultResolveRequest ?? context.resolveRequest;
  const isSharedPackage = sharedPackages.some(
    (name) => moduleName === name || moduleName.startsWith(`${name}/`),
  );

  // Library source lives outside example/. Always use the app's copy of React
  // and native peers, including subpaths, while preserving nested dependencies.
  if (isSharedPackage) {
    return resolve(
      { ...context, originModulePath: path.join(projectRoot, "package.json") },
      moduleName,
      platform,
    );
  }

  return resolve(context, moduleName, platform);
};

module.exports = config;
