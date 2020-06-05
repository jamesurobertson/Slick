import React from "react";
import Navbar from "./Navbar";
import SearchBar from './SearchBar'
import MainContent from './MainContent'

function App({ store }) {
  return (
    <div className='root-container'>
      <SearchBar />
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
