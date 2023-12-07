/** Static js file */

/* Transcription Functionality */

// display word to transcribe
// param: string word
function displayWord(word){
    document.getElementById('wordDisplay').innerText = "Transcribe \"" + word + "\"";
}

// display feedback from gpt
// param: string feedback
function displayFeedback(feedback){
    var feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = "GPT's feedback: " + feedback;
    feedbackElement.style.display = 'block'; // Make the feedback box visible
}

// store current word and answer
var currWord = '';
var currWillTransc = '';

// hardcorded correct response
var correctFeedback = 'Great job! Your transcription matches perfectly with Will\'s. ' +
'It seems like you have a solid understanding of the IPA symbols and their corresponding sounds. Keep up the good work!';

var button = document.querySelector('button');
var feedbackElement = document.getElementById('feedback');
var metaFeedbackElement = document.getElementById('metaFeedback');

var gotCorrect = false; // track whether to move onto the next word

// get the initial word
fetch('/next-word')
  .then(response => response.json())
  .then(data => {

    currWord = data[0];
    currWillTransc = data[1];

    console.log('New Word:', currWord);
    console.log('New Transcription:', currWillTransc);
    displayWord(currWord); // oh boy! new word!
  })
  .catch(error => {
    console.error('Error fetching the next word:', error);
  });


// SUBMIT or NEXT WORD button clicked (or ENTER pressed)
document.getElementById('textForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var textInput = document.getElementById('textInput');
    var formData = new URLSearchParams();
    formData.append('textInput', textInput.value);

    fetch('/submit-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // ******UPON SUBMIT: Crucial content******
        console.log("DATA: ", data);

        // move onto next word
        if (gotCorrect){
            // reset everything
            button.classList.remove('button-green');
            button.textContent = 'Submit';
            gotCorrect = false;
            textInput.value = '';             // clear input box
            metaFeedbackElement.style.display = 'none';

            // get the next word
            fetch('/next-word')
                .then(response => response.json())
                .then(data => {
                    // store next word
                    currWord = data[0];
                    currWillTransc = data[1];

                    console.log('New Word:', currWord);
                    console.log('New Transcription:', currWillTransc);

                    // display the word ("Transcribe <word>")
                    displayWord(currWord);
                    // make feedback box invisible
                    feedbackElement.style.display = 'none';
                })
                .catch(error => {
                    console.error('Error fetching the next word:', error);
                });            
        }   
        else {  // submitted text
            // if correct, set correct, display hardcoded message
            if (data === currWillTransc) {

                displayFeedback(''); // Display feedback after delay
                metaFeedbackElement.style.display = 'none';
                feedbackElement.classList.add('loading');

                // Set a timeout to delay the correct feedback display (more satisfying?)
                setTimeout(() => {
                    console.log("CORRECT");
                    feedbackElement.classList.remove('loading'); // Stop loading animation
                    gotCorrect = true;
                    console.log('Feedback:', correctFeedback);
                    displayFeedback(correctFeedback);

                    // Change metafeedback
                    metaFeedbackElement.style.display = 'block';
                    metaFeedbackElement.style.color = '#32de84';
                    metaFeedbackElement.innerText = 'Great work!';

                    // Change button message + color
                    button.classList.add('button-green');
                    button.textContent = 'Next Word!';

                }, 3000); // 3 seconds delay
            }
            else {
                console.log("INCORRECT")
                console.log(currWord, currWillTransc, data); // Debugging line
                metaFeedbackElement.style.display = 'none';
                displayFeedback(''); // Update and show the feedback
                textInput.value = '';             // clear input box
                feedbackElement.classList.add('loading');

                // get feedback
                fetch('/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        word: currWord,
                        willsTranscription: currWillTransc,
                        studentsTranscription: data
                    })
                })
                .then(response => response.json())
                .then(data => {
                    feedbackElement.classList.remove('loading');
                    console.log('Feedback:', data.feedback);
                    displayFeedback(data.feedback); // display feedback

                    // Change metafeedback
                    metaFeedbackElement.style.display = 'block';
                    metaFeedbackElement.style.color = '#e48484';
                    metaFeedbackElement.innerHTML = 'Not quite; your transcription was not the same as Will\'s.'+
                    '<br>GPT may erroneously say it was right. Try again!';
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    
            }
        }
    });

   
});


/* IPA Keyboard */

const ipaSymbols1 = [
    "ɓ", "ʙ", "β", "ɕ", "ç", "ɗ", "ɖ", "ð", "ʤ", "ɟ", "ʄ", "ɡ", "ɠ", "ɢ", "ʛ",
    "ɦ", "ɧ", "ħ", "ʜ", "ʝ", "ɭ", "ɬ", "ɫ", "ɮ", "ʟ", "ʎ", "ɱ", "ɰ",
    "ŋ", "ɳ", "ɲ", "ɴ", "ɸ", "ɹ", "ɻ", "ɺ", "ɾ", "ɽ", "ʀ", "ʁ",
    "ʂ", "ʃ", "θ", "ʈ", "ʧ", "ʋ", "ɣ", "ʍ", "χ", "ʑ", "ʐ", "ʒ"
];

const ipaSymbols2 = [
    "ɑ", "ɐ", "ɒ", "æ", "ə", "ɘ", "ɵ", "ɚ", "ɛ", "ɜ", "ɝ", "ɞ",
    "ɨ", "ɪ", "ɔ", "ø", "œ", "ɶ", "ɥ", "ʌ", "ʊ", "ʉ", "ɯ", "ɤ", "ʏ"
];

// Add the remaining symbols to this array
const ipaSymbols3 = ["ˈ", "ˌ", "ː", "ˑ",  "˘", ".", "‖", "‿"];

function createButtons(symbols, keyboardId) {
    const keyboard = document.getElementById(keyboardId);
    symbols.forEach(symbol => {
        const button = document.createElement('button');
        button.textContent = symbol;
        button.onclick = () => insertSymbol(symbol);
        keyboard.appendChild(button);
    });
}

function insertSymbol(symbol) {
    const input = document.getElementById('textInput');
    input.value += symbol;
    input.focus();
}

createButtons(ipaSymbols1, 'ipaKeyboard1');
createButtons(ipaSymbols2, 'ipaKeyboard2');
createButtons(ipaSymbols3, 'ipaKeyboard3');