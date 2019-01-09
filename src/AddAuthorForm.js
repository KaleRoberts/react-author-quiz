import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component {
    
    state = {
        name: '',
        imageUrl: '',
        books: [],
        bookTemp: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook = (event) => {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    onFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onFieldChange}
                ></input>
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    onChange={this.onFieldChange}
                ></input>
            </div>
            <div className="AddAuthorForm__input">
                {this.state.books.map((book) => 
                    <p key={book}>{book}</p>
                )}
                <label htmlFor="bookTemp">Books</label>
                <input
                    type="text"
                    name="bookTemp"
                    value={this.state.bookTemp}
                    onChange={this.onFieldChange}
                ></input>
                <input 
                    type="button"
                    value="+"
                    onClick={this.handleAddBook}
                ></input>
            </div>
            <input type="submit" value="Add"></input>
        </form>
        )
    }
}

const AddAuthorForm = ({match, onAddAuthor}) => {
    return (
      <div className="AddAuthorForm">
        <h1> Add Author </h1>
            <AuthorForm onAddAuthor={onAddAuthor}/>
      </div>
    )
  }

  export default AddAuthorForm;