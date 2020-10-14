// used from https://github.com/ReFruity/EzBot/blob/master/util/stringUtil.js

module.exports = {
  isTranscriptionContains: (transcription, words) => {
    var firstWord = [];
    firstWord = transcription.split(" ")[0];
    return words.includes(firstWord) > 0;
  },
};
