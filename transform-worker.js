"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
/**
 * Copyright 2023-present 650 Industries (Expo). All rights reserved.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const worker = __importStar(require("@expo/metro-config/build/transform-worker/metro-transform-worker"));

async function transform(config, projectRoot, filename, data, options) {
    const environment = options.customTransformOptions?.environment;
    const isClientEnvironment = environment !== 'node' && environment !== 'react-server';

    if (isClientEnvironment &&
        (filename.match(new RegExp(`^app/\\+html(\\.${options.platform})?\\.([tj]sx?|[cm]js)?$`)) ||
        filename.match(/\+api(\.(native|ios|android|web))?\.[tj]sx?$/))) {
        return worker.transform(config, projectRoot, filename, !options.minify
            ? Buffer.from('"> The server-only file was removed from the client JS bundle by Expo CLI."')
            : Buffer.from(''), options);
    }

    if (isClientEnvironment &&
        !filename.match(/\/node_modules\//) &&
        filename.match(/\+api(\.(native|ios|android|web))?\.[tj]sx?$/)) {
        return worker.transform(config, projectRoot, filename, Buffer.from(''), options);
    }

    return worker.transform(config, projectRoot, filename, data, options);
}

exports.transform = transform;
/**
 * A custom Metro transformer that adds support for processing Expo-specific bundler features.
 */
module.exports = {
    ...worker,
    transform,
};
//# sourceMappingURL=transform-worker.js.map