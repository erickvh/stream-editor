function getPatternResult(pattern, contentText) {
  const splittedPattern = pattern.split('/');
  const searchPattern = splittedPattern[1];
  const stringToReplace = splittedPattern[2];
  const flag = splittedPattern[3];
  let searchRegexPattern;
  //not flag options implemented case doesn't exist flag
  if (!flag) {
    searchPattern = new RegExp(searchPattern);
  } else {
    switch (flag) {
      case 'e':
        break;
      case 'I':
        searchRegexPattern = new RegExp(searchPattern, 'i');
        break;
      case 'p':
        break;
      case 'g':
        searchRegexPattern = new RegExp(searchPattern, 'g');
        break;
    }
  }
  const resultText = contentText.replace(searchRegexPattern, stringToReplace);
  return resultText;
}

module.exports = {
  getPatternResult,
};
