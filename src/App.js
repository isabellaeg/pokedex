import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import SinglePokemon from './components/Pokemon/SinglePokemon'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navbar} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/pokemon/:pokemonIndex" component={SinglePokemon}/>
          </Switch>
        </div>
      </div>
    )
    
  };
}

export default App;
