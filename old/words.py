'''
read in the csv file of words,transcriptions into a hashmap*

*in Python 3.8 and later, hashmap key order is
order of key insertion. written in Python 3.10.12
'''
import csv

csv_path = './words.csv'

# hashmap with key = word, value = transcription (strings)
wordMap = {}
wordsInOrder = []   # in case Will wants to keep the words in order

with open(csv_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)

    # Skip the header row if your CSV has one
    next(csv_reader, None)

    # Populate the dictionary
    for row in csv_reader:
        word = row[0]  # Assuming the word is in the first column
        transcription = row[1]  # Assuming the transcription is in the second column
        wordMap[word] = transcription
        wordsInOrder.append(word)

print(wordMap)

'''
return the next word and its transcription in a tuple
'''
wordsAsKeys = list(wordMap.keys())    # in insertion order Python 3.10

print(wordsAsKeys, " ", type(wordsAsKeys))

wordIndex = 0

def getNextWord():
    global wordIndex

    # if we've reached the last word
    if wordIndex >= len(wordsAsKeys):
        wordIndex = 0   # loop back around to first

    word = wordsAsKeys[wordIndex]
    transcription = wordMap[word]

    wordIndex += 1
    return (word, transcription)

print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')
print(getNextWord(),'\n')

# next: implement random functionality