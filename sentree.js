function Trie() {
  this.frequency = 0;
  this.children = {};
}

Trie.prototype = {
  addArrayOfWords: function(textArray) {
    this.frequency++;
    if (textArray.length > 0) {
      //get last word of the reversed textArray
      var word = textArray.pop();
      //find if it exists in the object
      (this.children[word] || (this.children[word] = new Trie())).addArrayOfWords(textArray);
    }
  },
  addTextSample: function(text) {
    var addSentence = this.addArrayOfWords.bind(this); // ugly
    //break text blocks into array of sentences
    var sentences = text.match( /[^\.!\?]+[\.!\?(="|')]+(\s|$)/g );
    sentences.forEach(function(sentence){
      sentence = sentence.trim().toLowerCase().replace(/[0-9'!,;-]/g,"");
      // todo: modify addArrayOfWords to take non-reversed array
      addSentence(sentence.split(/\s+/).reverse());
    })  
  },
  findNodeWords: function(textArray) {
    if (textArray.length === 0) {
      //for each child
      var words = this.children;
      return Object.keys(words).sort(function(a,b){
        if ( words[a].frequency < words[b].frequency )
          return 1;
        if ( words[a].frequency > words[b].frequency )
          return -1;
        return 0;
      });
    }
    if (textArray.length > 0) {
      word = textArray[textArray.length-1];
      if (this.children.hasOwnProperty(word)) {
        textArray.splice(-1);
        return this.children[word].findNodeWords(textArray);
      }
    }
  }
};