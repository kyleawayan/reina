// used from https://github.com/ReFruity/EzBot/blob/master/util/stringUtil.js

module.exports = {
    isTranscriptionContains: (transcription, words) => {
      return words.includes(transcription) > 0
    }
  }