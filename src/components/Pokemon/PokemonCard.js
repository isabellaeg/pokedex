import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import './PokemonCardStyle.css'

class PokemonCard extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
    }

    componentDidMount() {
        const {name , url} = this.props.data
        console.log(this.props)
        const pokemonIndex = url.split('/')[url.split('/').length - 2]
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    

        this.setState({
            name,
            imageUrl,
            pokemonIndex,
        })
    }

    render() {

        return(
            <div className="col-md-4 col-sm-6 mb-5">
                <Link to={`pokemon/${this.state.pokemonIndex}`} className="link-pok">
                <div className="card">
                    <div>
                        <img src={this.state.imageUrl} alt="img" className="img-small"></img>
                        <h6>Nº{this.state.pokemonIndex}</h6>
                        <div>
                            <h1 className="card-title">{this.state.name}
                            </h1>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </Link>
            </div>
        )
    }
}

export default PokemonCard