
# IPA Transcription Helper
Webapp powered by GPT-4 to help Linguistics 101 students practice transcribing words to the International Phonetic Alphabet.


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
2. Go to the repo folder and run `npm install`
3. Add GPT-4 API key to your system Environment Variables. [https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
4. `node server.js` runs the website at [http://localhost:3000/](http://localhost:3000/)

