import React, {Component} from 'react'
import axios from 'axios'
import './PokemonStyle.css'
import {Link} from 'react-router-dom'

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };

class SinglePokemon extends Component {

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: '',
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: [],
        baseExperience: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        genera: '',
        themeColor: '#EF5350',
        evolution: '',
        nextPokemon: '',
        prevPokemon: ''

    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/` 
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        const pokemonInfo = await axios.get(pokemonUrl)

        const name = pokemonInfo.data.name;
        const imageUrl = pokemonInfo.data.sprites.front_default;
        
        let { hp, attack, defense, speed, specialAttack, specialDefense } = ''

        pokemonInfo.data.stats.map(stat => {
            switch(stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                break;
            }
        });

        // convert decimeters to meters
        const height = pokemonInfo.data.height / 10
        console.log(height)

        const weight = pokemonInfo.data.weight / 10

        const types = pokemonInfo.data.types.map(type => type.type.name)

        const abilities = pokemonInfo.data.abilities.map(ability => {
            return ability.ability.name}
            )

        const baseExperience = pokemonInfo.data.base_experience

        const evs = pokemonInfo.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true
            } return false
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
        }).join(',')


        this.setState({
            imageUrl,
            pokemonIndex,
            name, 
            types, 
            height,
            weight,
            stats: {
               hp, 
               attack,
               defense,
               speed,  
               specialAttack,
               specialDefense,
            },
            abilities,
            evs,
            baseExperience,


        })

        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === "en") {
                    description = flavor.flavor_text;
                    return
                }
            })


            let genera = ''
            res.data.genera.some(gen => {
                if (gen.language.name === "en") {
                    genera = gen.genus
                }
            })

            const femaleRate = res.data['gender_rate'];
            const females = 12.5 * femaleRate;
            const males = 12.5 * (8 - femaleRate)

            const catchRate = Math.round(100 / 255) * res.data['capture_rate']

            const eggGroup = res.data['egg_groups'].map(res => {
                return res.name
            }).join(',')

            this.setState({
                description,
                females, 
                males, 
                eggGroup,
                catchRate,
                genera,
               
            })

        })

    }

    handleNext() {
      let next = this.state.pokemonIndex++
      this.setState({nextPokemon: next})
    }

    handlePrevious() {
      let prev = this.state.pokemonIndex--
      this.setState({prevPokemon: prev})
    }


    render() {
        const total = this.state.stats.hp + this.state.stats.attack + this.state.stats.defense + this.state.stats.specialAttack + this.state.stats.specialDefense + this.state.stats.speed
        console.log('INFOOO', this.state, total )
        return (
               
          <div className="card-detail">
            <div className="card">
                <Link to="/" className="link">
                <i class="fas fa-chevron-left"></i> 
                </Link>
            <div className="row">
              <div className="col-12">
                <img src={this.state.imageUrl} className="img-detail"></img>
              </div>
              {/* <div className="col-1">
                <div className="col">
                  <div className="male-icon">
                    <i className="fas fa-mars" style={{display: 'block', marginLeft: '18px', marginTop: '18px',}}></i>
                  </div>
                  <div className="female-icon">
                    <i className="fas fa-venus"></i>
                  </div>
                </div>  */}
              {/* </div> */}
            </div>
            <h2 className="index-title">#{this.state.pokemonIndex}</h2>
            <h2 className="name">{this.state.name}</h2>
            <h2 className="type-title">{this.state.genera}</h2>
            <div className="row">
              <div className="types-badges">
                  {this.state.types.map(type => (
                      <span key={type} className="badges"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'black', textTransform: 'capitalize'
                      }}
                      >{type}</span>
                  ))}
              </div>
            </div>
            <h1 className="subtitles">pokédex entry</h1>
            <h2 className="descriptions">{this.state.description}</h2>
            <h1 className="subtitles">Abilities</h1>
            <div className="row">
              <div className="types-badges">
                  {this.state.abilities.map(ability => (
                      <span key={ability} className="badges-abs"
                      >{ability}</span>
                  ))}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-12" >
                  <h6 className="grid-titles">height</h6>
                  </div>
                  <div className="col-12">
                    <h6 className="grid-subtitles">{this.state.height}m</h6>
                  </div>
                  <div className="col">
                    <h6 className="grid-titles">Weaknesses</h6>
                  </div>
                  <div className="col-12">
                    <div className="grid-subtitles">
                        <span id="weaknesses">2x</span>
                        <span><i className="fas fa-bolt bolt"></i></span>
                        <span><i className="fas fa-fire fire"></i></span>
                        <span><i className="fas fa-snowflake snowflake"></i></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-12">
                    <h6 className="grid-titles">weight</h6>
                  </div>
                  <div className="col-12">
                    <h6 className="grid-subtitles">{this.state.weight}kg</h6>
                  </div>
                  <div className="col-12">
                    <h6 className="grid-titles">Base exp</h6>
                  </div>
                  <div className="col-12">
                    <h6 className="grid-subtitles">{this.state.baseExperience}</h6>
                  </div>
                </div>
            </div>
            </div>
            <h1 className="subtitles">Abilities</h1>
            <div className="row">
                <div className="stats-badges">
                <span className="stats-hp">HP</span>
                <span className="stats-atk">AT</span>
                <span className="stats-df">DF</span>
                <span className="stats-spa">SA</span>
                <span className="stats-spd">SD</span>
                <span className="stats-speed">SP</span>
                <span className="stats-tot">TO</span>
                </div>   
            </div>
            <div className="row">
            <div className="stats-badges">
                <span className="stats-sub">{this.state.stats.hp}</span>
                <span className="stats-sub">{this.state.stats.attack}</span>
                <span className="stats-sub">{this.state.stats.defense}</span>
                <span className="stats-sub">{this.state.stats.specialAttack}</span>
                <span className="stats-sub">{this.state.stats.specialDefense}</span>
                <span className="stats-sub">{this.state.stats.speed}</span>
                <span className="stats-sub stats-sub-tot">{total}</span>
            </div>
            </div>
            {/* <h1 className="subtitles">Evolution</h1>
            <div>
              <Link 
                  onChange={this.handleNext} to={`/${this.state.nextPokemon}`}>
                    NEXT
              </Link>
            </div> */}
            </div>
          </div>
        )
        
    }
}

export default SinglePokemon

