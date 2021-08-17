// postprocess.js
"use strict";

require("loud-rejection/register");

const path = require("path");
const { postProcess } = require("../scripts/utils");

const buildDirectory = path.join(__dirname, "build");

postProcess(buildDirectory);
