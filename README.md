
# IPA Transcription Helper
Webapp powered by GPT-4 to help students practice transcribing words to the International Phonetic Alphabet. GPT-4 provides detailed feedback for incorrect transcriptions.

Intended for use in [Will Styler's](https://wstyler.ucsd.edu/) LIGN 101 course. Uses words and transcription answers from Will's IPA exercises.


## Features
### Use custom CSV for words and transcriptions
Instructors can upload their own `words.csv` file containing a list of words and their "correct" transcriptions (according to the IPA rules chosen by the instructor) for students to practice with.

**Requirements for `words.csv`**
- Must be located in the `./public` directory (where the demo `words.csv` file is)
- Two columns, `Word,Transcription`
- Example `/public/words.csv`: 
    ```
    Word,Transcription
    test,tɛst
    face,fejs
    fridge,fɹɪʤ
    ...
    ```

## To Run

1. [Install NodeJS](https://nodejs.org/en/download) on your computer.
> Working on **Version 20.9.0**
2. Add GPT-4 API key to your system Environment Variables. [https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
3. Clone this repository and navigate to its root folder.
4. `node server.js` runs the website at [http://localhost:3000/](http://localhost:3000/)


**Node modules used**
- `npm install []`
    - express
    - body-parser
    - path
    - openai
    - dotenv
    - axios
