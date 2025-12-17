const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Allow Metro to resolve files from the parent directory (for shared data)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;




