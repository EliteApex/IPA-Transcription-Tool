
# IPA Transcription Helper
Webapp powered by GPT-4 to help students practice transcribing words to the International Phonetic Alphabet. GPT-4 provides detailed feedback for transcriptions.

Intended for use in [Will Styler's](https://wstyler.ucsd.edu/) LIGN 101 course. Uses words and transcription answers from Will's IPA exercises.

Powered by OpenAI's ChatGPT-4 API. Requires a local GPT-4 API key.

Uses NodeJS.

## To Run

1. [Install NodeJS](https://nodejs.org/en/download).
    > Working on **Version 20.9.0**
2. Add GPT-4 API key to your system Environment Variables. [https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
3. Clone this repository and navigate to its root folder.
4. `node server.js` runs the website at [http://localhost:3000/](http://localhost:3000/)


## Features
### Use custom CSV for words and transcriptions
Instructors can upload their own `words.csv` file containing a list of words and their "correct" transcriptions (according to the IPA rules chosen by the instructor) for students to practice with.

**Requirements for `words.csv`**
- Must be located in the root directory (where the demo `words.csv` file is)
- Two columns, `Word,Transcription`, where the transcriptions have phonemes delimited by spaces
- Example `words.csv`: 
    ```
    Word,Transcription
    test,t ɛ s t
    face,f ej s
    fridge,f ɹ ɪ ʤ
    ...
    ```

### **Node modules used**
- `npm install []`
    - express
    - body-parser
    - path
    - openai
    - dotenv
    - axios
