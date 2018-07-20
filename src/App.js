import React, { Component } from 'react';

import Header from "./components/Header";
import Main from "./components/Main";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    }
  }

  componentDidMount() {
    let number = this.props.number
    fetch(`https://randomuser.me/api/?results=${number}`)
      .then(results => {
        return results.json();
      }).then(data => {
        let names = data.results.map((person) => {
          let title = capital(person.name.title);
          let firstname = capital(person.name.first);
          let lastname = capital(person.name.last);
          let fullname = `${title} ${firstname} ${lastname}`;
          let userpic = person.picture.large;
          let email = person.email;
          let city = capital(person.location.city);
          this.setState((prevState) => ({
            people: [
              ...prevState.people,
              {
                name: fullname,
                picsrc: userpic,
                email,
                city
              }
            ]
          }))

        })

      })

  }

  render() {
    return (
      <div id="card-holder">
        {this.state.people.map((obj, idx) => {
          return (
            <Main class="cards" key={idx}>
              <Header title={obj.name} avatar={obj.picsrc} />
              <Header title={obj.city} subtitle={obj.email} />
            </Main>
          )
        })}
      </div>

    )
  }

}

function capital(word) {
  let caps = word.charAt(0).toUpperCase();
  let restofWord = word.substring(1);
  return `${caps}${restofWord}`
}

export default App;