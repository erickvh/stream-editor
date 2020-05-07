const fs = require('fs').promises;

const regexForPattern = /^s\/[a-zA-Z. ]+\/[a-zA-Z. ]+\/[g|p]?$/;

function isAValidPattern(pattern) {
  if (!regexForPattern.test(pattern)) {
    console.log(`pattern not valid ${pattern}`);
    return process.exit();
  }
}

function isAValidPath(filepath) {
  if (typeof filepath !== 'string') {
    console.log("it's not a valid path");
    return process.exit();
  }
}

async function isAAccesibleFile(absolutePath) {
  try {
    const data = await fs.access(absolutePath);
  } catch (e) {
    console.log(
      "File doesn't exists or user doesn't have permissions to access to it"
    );
    return process.exit();
  }
}

module.exports = {
  isAValidPath,
  isAValidPattern,
  isAAccesibleFile,
};
