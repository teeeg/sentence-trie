# sentence-trie
An interactive ordered tree data structure of every possible sentence in a book. 

See (_DEMO_)[http://www.github.io/sentence-trie/] for the parsed text of (Grimm's Fairy Tales)[http://www.gutenberg.org/files/2591/2591-h/2591-h.htm] portrayed as an interactive (prefix trie)[http://www.toptal.com/java/the-trie-a-neglected-data-structure]. Select any word to view possible next words in a phrase sorted in order of descending frequency.

files: 
- sentree.js : library to parse a sample body of text. 
- build/app.js : React.js interface leveraging sentree.js for find operations. 

This project was born out of the idea that you could create an interface that would allow a user to quicky compose sentences with minimal input based on previous phrase constructs (often called a corpus). Email or texting could be a valuable application -- or if you wanted to restrict vocabulary to defined set of possibilities that still allowed for permutations.