import React from "react";
import './searchbarStyles.css'
import pokeballlogo from '../../assets/pokeballlogo.png'

const Searchbar = (props) => {
  const { handleChange } = props;


  return (
    <div className="row wrapper">
      <div className="col-md-10">
      <div className="searchbar-div">
        <input type="text" placeholder="    Search your Pokémon!" onChange={handleChange} className="searchbar"/>
        
      </div>
      </div>
      <div className="col-md-2">
      <div className="logo-container">
      <img src={pokeballlogo} alt="pokeball" className="logo"></img>
      </div>
      </div>
    </div>
  );
};

export default Searchbar;