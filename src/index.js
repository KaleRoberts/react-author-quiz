import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  },
  {
    name: 'Philip K. Dick',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Philip_k_dick_drawing.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Do Androids Dream of Electric Sheep?', 'The Man in the High Castle', 'Ubik', 'Galactic Pot-Healer']
  }
];

const getTurnData = (authors) => {
  const allBooks = authors.reduce((acc, cur, idx) => {
    return acc.concat(cur.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) => author.books.some((title) => title === answer))
  }
};

const resetState = () => {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  }
}

let state = resetState();

const onAnswerSelected = (answer) => {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
};

// We make these small intermediary components so that we can specify props more easily. Instead of doing this down in the component={} React Route
const App = () => {
  return <AuthorQuiz {...state}
    onAnswerSelected={onAnswerSelected}
    onContinue={() => {
      state = resetState();
      render();
    }}
  />;
}

const AuthorWrapper = withRouter(({history}) => 
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
)

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>    {/*Two routes cannot be direct children of BrowserRouter, thus we use React.Fragment to wrap them together under single parent.*/}
        <Route exact path="/" component={App} />    {/*React.Fragment does not add anything to the DOM*/}
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
}
render();
registerServiceWorker();
