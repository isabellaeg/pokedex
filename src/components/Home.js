import React, {Component} from 'react'
import PokemonList from './Pokemon/PokemonList'
import axios from 'axios'
import Searchbar from './Searchbar/Searchbar';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state={
            url: 'https://pokeapi.co/api/v2/pokemon/',
            pokemon: null,
            search: ''
         }
    }    
    
     async componentDidMount() {
         const res = await axios.get(this.state.url)
         this.setState({pokemon: res.data['results']})
     }
    

    render() {
        return(
            <div>
            <Searchbar handleChange={(e) => this.setState({search: e.target.value})}/>
            <div className="row">        
                <div className="col">
                    {console.log(this.state.search)}
                <PokemonList search={this.state.search}/>
                </div>
            </div>
            </div>
        )
    }
}

export default Home