function getPatternResult(pattern, contentText) {
  const splittedPattern = pattern.split('/');
  const searchPattern = splittedPattern[1];
  const stringToReplace = splittedPattern[2];
  const flag = splittedPattern[3];
  const searchRegexPattern = new RegExp(searchPattern);

  resultText = contentText.replace(searchRegexPattern, stringToReplace);
  return resultText;
}

module.exports = {
  getPatternResult,
};
