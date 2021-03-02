import React, {Component} from 'react'
import axios from 'axios'

import PokemonCard from './PokemonCard'

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state={
            url: 'https://pokeapi.co/api/v2/pokemon/?limit=200',
            pokemon: null,
            search: '', 
         }
    }    
    
 
     async componentDidMount() {
         const res = await axios.get(this.state.url)
         this.setState({pokemon: res.data['results']})
     }

    render() {
        return(
            <div>
            {this.state.pokemon ? (
                <div className="row">
                {this.state.pokemon.map(pokemon => (
                    pokemon.name.includes(this.props.search) &&
                    <PokemonCard
                        key={pokemon.name}
                        data={pokemon}
                    />
                ))
                }
                </div>) : null}
            
            </div>
        )
    }
}

export default PokemonList