var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var WordBox = React.createClass({displayName: 'WordBox',
  selectWord: function() {
    this.props.handleClick(this.props.index);
  },
  render: function(){
    return (
      React.createElement("span", {
        className: "word", 
        onClick: this.selectWord}, 
        this.props.children, 
        React.createElement("span", {className: "word-close"}, "x")
      )
    );
  }
});

var Dictionary = React.createClass({displayName: 'Dictionary',
  render: function() {
    if (this.props.words){
      var wordNodes = this.props.words.map(function(word,index) {
        return (
          React.createElement(WordBox, {
            index: index, 
            key: index, 
            handleClick: this.props.handleClick}, 
            word
          )
        );
      }.bind(this));
      return (
        React.createElement("div", {className: "dictionary", handleClick: this.props.handleClick}, 
          wordNodes
        )
      );
    }
  }
});

var Sentence = React.createClass({displayName: 'Sentence',
  render: function() {
    var words = this.props.words.map(function(word,index){
      return (
        React.createElement(WordBox, {
          index: index, 
          handleClick: this.props.handleClick}, 
          word
        )
      );
    }.bind(this));
    return (
      React.createElement("div", {className: "sentence-container"}, 
        words
      ) 
    );
  }
});

var Balard = React.createClass({displayName: 'Balard',
  getInitialState: function() {
    var trie = new Trie();
    return {
      dictionary: [],
      sentence: [],
      trie: trie
    }
  },
  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: './grimms.txt',
      success: function(data) {
        this.state.trie.addTextSample(data);
        this.refreshDictionary();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  },
  onKeyPress: function(key){
    console.log(key);
  },
  refreshDictionary: function() {
    var sentence = this.state.sentence.slice();
    var trie = this.state.trie;
    var updatedDictionary = trie.findNodeWords(sentence.reverse());
    this.setState({
        dictionary: updatedDictionary,
    });
  },
  addWord: function(index) { 
    var sentence = this.state.sentence;
    sentence.push(this.state.dictionary[index]);
    this.setState({
      sentence: sentence
    });
    this.refreshDictionary();
  },
  removeWord: function(index) {
    var sentence = this.state.sentence;
    sentence.splice(index);
    this.setState({ sentence: sentence });
    this.refreshDictionary();
  },
  render: function() {
    return (
      React.createElement("div", {onKeyPress: this.filterWords}, 
        React.createElement(Sentence, {words: this.state.sentence, handleClick: this.removeWord}), 
        React.createElement(Dictionary, {words: this.state.dictionary, handleClick: this.addWord})
      )
    );
  }
});

React.render(
  React.createElement(Balard, null),
  document.getElementById('hook')
);