import React, { Component} from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import pokemon from '../../assets/pokemon.png'

class Navbar extends Component {
    render() {
        return (
            <div >
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <Link to="/" className="pokedex"><img src={pokemon} alt="pokemon"></img></Link>
                </nav>
            </div>  
        )
    }
}

export default Navbar
 