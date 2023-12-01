import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarComponent from './components/navigationbar';
import MusicPlayer from './components/MusicPlayer2';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { playlists } from './songData'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import About from './components/about'
import QuoteAPI from './components/Quotes';

const App: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>(
    'https://wallpapers.com/images/featured/lo-fi-mvqzjym6ie17firw.jpg'
  );
  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0].songs);
  const [quoteCategory, setQuoteCategory] = useState('happiness'); // Default quote category

  const handlePlaylistSelect = (playlistIndex: number) => {
    setCurrentPlaylist(playlists[playlistIndex].songs);

    
    switch (playlistIndex) {
      //Breakcore
      case 0:
        setBackgroundImage('https://cdn.discordapp.com/attachments/300021809531715606/1179318368935874600/download.jpg?ex=657958d1&is=6566e3d1&hm=138d580a211700a25361dfdfdfcd8aa5ce59e0a3eb3a25b534b4a553bf4548dd&');
        setQuoteCategory('computers'); 
        break;
      //Lo-Fi
      case 1:
        setBackgroundImage('https://cdn.discordapp.com/attachments/386697318461734912/1179293519819583528/lofi-digital-anthro-hd-wallpaper-89a078dd31ca7dbb360718bf6031660d.jpg?ex=657941ad&is=6566ccad&hm=be98e6ffa03e3aef00c79811d61810d0e6f75b6c3e27a4b16713ccf59e2dea16&');
        setQuoteCategory('dreams'); 
        break;
      //Ultrakill OST
      case 2:
        setBackgroundImage('https://media.discordapp.net/attachments/300021809531715606/1179319904063725629/1075225.png?ex=65795a3f&is=6566e53f&hm=e18a27504b5cc544037ad4b5a3337a57b8d3aa8711a18acf84adbfcace05834b&=&format=webp&quality=lossless&width=1248&height=702');
        setQuoteCategory('anger'); 
        break;
      // More playlists go here
      default:
        setBackgroundImage('https://wallpapers.com/images/featured/lo-fi-mvqzjym6ie17firw.jpg');
        setQuoteCategory('happiness'); 
        break;
    }
  };

return (
  <Router>
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <NavBarComponent playlists={playlists} handlePlaylistSelect={handlePlaylistSelect} />
      <Routes>
        <Route path="/" Component={() => <MusicPlayer playlist={currentPlaylist} />} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/about" Component={About} />
      </Routes>
    </div>
    <div>
      <QuoteAPI category={quoteCategory} />
      </div>
  </Router>
);
};

export default App;