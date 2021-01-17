import React, { Component } from 'react';
import './App.css';

const validators = {
  username: value => {
    if(value.length < 10){ return 'Nazwa musi być dłuższa niż 10 znaków'; }
    if (value.indexOf(' ') === -1) { return 'Nazwa ie może zawierać spacji'; }
    return false;
  },
  email: value => {
     return this.state.email.indexOf('@') !== -1 ? false : 'Brak @ w emailu'; // troche słaba walidacja emaila...
  },
  pass: value => {
    return value.length > 8 ? false : 'Hasło musi mieć 8 znaków';
  },
  accept: value => {
    return value ? false : 'Nie potwierdzona zgoda';
  }
};

class App extends Component {

  state = {
    username: '',
    email: '',
    pass: '',
    accept: false,
    message: '',

    errors: {
      username: '',
      email: '',
      pass: '',
      accept: ''
    }
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value
      })
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if ( this.formValidation() ) {
      this.setState({
        username: '',
        email: '',
        pass: '',
        accept: false,
        message: 'Formularz został wysłany',

        errors: {
          username: '',
          email: '',
          pass: '',
          accept: ''
        }
      })
    }
  }

  formValidation() {
    const errors = {
      username: validators.username(this.state.username),
      email: validators.email(this.state.email),
      pass: validators.pass(this.state.pass),
      accept: validators.accept(this.state.accept)
    };
         
     if( Object.values(errors).filter(v => v ? true : false).length ){
        this.setState({ errors });
        return false;  
     }
     return true;
  }

  timer = null; 

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUpdate() {
    if (this.state.message !== '') {
      this.timer = setTimeout(() => this.setState({
        message: ''
      }), 3000)
    }
  }

  component

  render() {
    return (
      <div className="App">
      { this.state.message ? (
        <h3>{this.state.message}</h3>
      ) : (
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Twoje imie:
          <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
            {this.state.errors.username && <span>{this.state.errors.username}</span>}
          </label>

          <label htmlFor="email">Twój email:
          <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.state.errors.email}</span>}
          </label>

          <label htmlFor="password">Twoje hasło:
          <input type="password" id="password" name="pass" value={this.state.pass} onChange={this.handleChange} />
            {this.state.errors.pass && <span>{this.state.errors.pass}</span>}
          </label>
          <label htmlFor="accept">
            <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} /> Wyrażam zgody wszelakie
          </label>
          {this.state.errors.accept && <span>{this.state.errors.accept}</span>}
          <button>Zapisz się</button>
        </form>
      ) }
      </div>
    );
  }
}

export default App;
