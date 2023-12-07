# temporary replacement for gpt.py until i can
# get it running
# to test how integration will work with gpt

# returns feedback string i guess
def get_feedback(word, will_transc, student_transc):
    
    if student_transc == will_transc:   # correct
        feedback = "Congratulations! \"" + word + \
            "\" is indeed transcribed as \\" + student_transc + "\\!" + \
            " For this, you get a quarter ($0.25). Enjoy!"
    else:     
        # incorrect: feed into the gpt machine
        feedback = "Oh God! You are a legitimate fool! \\" + student_transc + \
        "\\ is totally incorrect! I as an AI-language model will now " + \
        "not give away the correct answer for you! It's \\" + will_transc + "\\!" + \
        "Hilarious!"

    return feedback
