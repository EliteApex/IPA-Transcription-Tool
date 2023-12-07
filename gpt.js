require('dotenv').config();
const axios = require('axios');

console.log('KEY: ', process.env.OPENAI_API_KEY);

const getFeedback = async (word, willsTranscription, studentsTranscription) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant of Will Styler, a professor of a linguistics class called LIGN 101. " +
                            "You will be assisting him in giving feedback on students’ transcriptions of certain words on an assignment. " +
                            "You will be provided the word, the correct transcription, and the student’s answer. " +
                            "If the student’s answer matches the correct answer, congratulate them. If not, give them constructive feedback and advice on what aspects of the IPA the student can think about to get their transcription closer to the actual answer. " +
                            "Under no circumstances should you include the direct answer or any IPA symbols from the correct answer in your message to the student. " +
                            "This is against the rules and wouldn’t help the student learn much from the assignment. " +
                            "If the student complicates the answer and gives a transcription outside the scope of the class, tell them which part of their transcription is outside the scope of the class. " +
                            "For instance, if the student used diacritics in the transcription, explain to them that diacritics are outside the scope of the class and try again without them. " +
                            "Remember that you will be talking directly to the student, and limit your response to about 200 words. \n\n" +
                            "Things to make sure before you give the feedback:\n" +
                            "Do not include any IPA characters whatsoever in your response. " +
                            "For instance, do not say something like, “The student's transcription of /gool/ differs from the standard transcription /gul/.”. " +
                            "This is against the rules of the class.\n" +
                            "You will be talking directly to the students, so format your response such that the students understand that you are talking directly to them. \n" +
                            "Highlight the parts of the student’s transcriptions that differs from the correct transcription.\n" +
                            "Remember that the correct transcriptions in this class may or may not be the standard transcriptions. " +
                            "So don't call our correct answers “standard transcriptions”. This can be misleading to the students. Instead, call them 'Will's transcriptions', as these transcriptions are based on Will Styler's dialect.\n" +
                            "Consider the possible reasons of why the student had that answer. If you think it might've been something to do with the student's accent, mention that as a part of your feedback.\n" +
                            "Explain why the student's transcription is wrong. If certain parts of the transcription is wrong, for instance, if a student used 'ʒ' instead of 'z', find words which uses these symbols and show the student the difference between the two symbols. \n\n" +
                            "DO NOT GIVE AWAY THE CORRECT TRANSCRIPTION\n"
                },
                {
                    role: "user",
                    content: `WORD: ${word}\nWill's transcription: ${willsTranscription}\nStudent's transcription: ${studentsTranscription}`
                }
            ],
            temperature: 0.25,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return null;
    }
};

// Main execution
const [,, word, willsTranscription, studentsTranscription] = process.argv;
if (word && willsTranscription && studentsTranscription) {
    getFeedback(word, willsTranscription, studentsTranscription)
        .then(feedback => console.log(feedback))
        .catch(err => console.error('Error in getFeedback:', err));
} else {
    console.log('Please provide the necessary arguments: word, wills transcription, and students transcription');
}
