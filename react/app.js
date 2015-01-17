var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var WordBox = React.createClass({
  selectWord: function() {
    this.props.handleClick(this.props.index);
  },
  render: function(){
    return (
      <span 
        className="word" 
        onClick={this.selectWord}>
        {this.props.children}
        <span className="word-close">x</span>
      </span>
    );
  }
});

var Dictionary = React.createClass({
  render: function() {
    if (this.props.words){
      var wordNodes = this.props.words.map(function(word,index) {
        return (
          <WordBox
            index={index} 
            key={index}
            handleClick={this.props.handleClick}>
            {word}
          </WordBox>
        );
      }.bind(this));
      return (
        <div className="dictionary" handleClick={this.props.handleClick}>
          {wordNodes}
        </div>
      );
    }
  }
});

var Sentence = React.createClass({
  render: function() {
    var words = this.props.words.map(function(word,index){
      return (
        <WordBox 
          index={index}
          handleClick={this.props.handleClick}>
          {word}
        </WordBox>
      );
    }.bind(this));
    return (
      <div className="sentence-container">
        {words}
      </div> 
    );
  }
});

var Balard = React.createClass({
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
      <div onKeyPress={this.filterWords}>
        <Sentence words={this.state.sentence} handleClick={this.removeWord} />
        <Dictionary words={this.state.dictionary} handleClick={this.addWord} />
      </div>
    );
  }
});

React.render(
  <Balard />,
  document.getElementById('hook')
);