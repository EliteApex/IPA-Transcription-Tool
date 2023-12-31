const fs = require('fs');
const csv = require('csv-parser');

const csvPath = './words.csv';
const wordMap = {};
const wordsInOrder = [];

// read in the csv (words.csv)
// words.csv should have two columns, Word and Transcription
// callback function runs when readCSV complete.
(function readCSV() {
  console.log("Reading words.csv");
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
      const word = row['Word']; // Replace with your actual column header
      const transcription = row['Transcription']; // Replace with your actual column header
      wordMap[word] = transcription;
      wordsInOrder.push(word);
    });
})();


let wordIndex = 0;
function getNextWord() {
    if (wordIndex >= wordsInOrder.length) {
        wordIndex = 0; // Loop back around to first
    }
    const word = wordsInOrder[wordIndex];
    const transcription = wordMap[word];
    wordIndex++;
    return [word, transcription]; // Return as a tuple equivalent (array)
}

module.exports = getNextWord;
