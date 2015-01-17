# Sentence-Trie
An interactive ordered tree data structure of every possible sentence in a book. 

See [demo](http://teeeg.github.io/sentence-trie/) for the parsed text of [Grimm's Fairy Tales](http://www.gutenberg.org/files/2591/2591-h/2591-h.htm) portrayed as an interactive [prefix trie](http://www.toptal.com/java/the-trie-a-neglected-data-structure). Select any word to view possible next words in a phrase sorted in order of descending frequency.

### Files: 
- /sentree.js : library to parse a sample body of text into a prefix-trie 
- /build/app.js : React.js interface leveraging sentree.js for find operations 

This quick concept was born out of the idea that you could create an interface that would allow a user to quicky compose sentences with minimal touch input. The predictions are based on a body of text (often called a corpus). Any corpus can be used but here I tried it out with the complete text of Grimm's Fairy Tales ... try composing the sentence 'Hanzel and ... ' 

Email or texting could be a valuable application -- or if you wanted to restrict user vocabulary to defined set of words/phrases that still allowed for some permutations
