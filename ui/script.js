function submitTranscription() {
    const transcription = document.getElementById('ipaInput').value;
    fetch('/check_transcription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transcription: transcription })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('feedback').innerText = data.feedback;
    });
}

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
    const input = document.getElementById('ipaInput');
    input.value += symbol;
}

createButtons(ipaSymbols1, 'ipaKeyboard1');
createButtons(ipaSymbols2, 'ipaKeyboard2');
createButtons(ipaSymbols3, 'ipaKeyboard3');

// Example to display a word (this part can be dynamic)
document.getElementById('wordDisplay').innerText = "Example Word";
