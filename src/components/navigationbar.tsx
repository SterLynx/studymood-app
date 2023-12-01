import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

interface NavBarProps {
  playlists: { name: string; songs: { title: string; url: string; }[] }[];
  handlePlaylistSelect: (playlistIndex: number) => void;
}

const NavBarComponent: React.FC<NavBarProps> = ({ playlists, handlePlaylistSelect }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setLoggedIn(false);
      console.log('User signed out');
      navigate('/'); // Redirect to the home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Navbar className='navbar-style' expand="lg">
      <Navbar.Brand as={Link} to="/">Studymood</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navigation">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>

          {loggedIn ? (
            <Button variant="outline-primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </>
          )}

          
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="playlist-dropdown">
              Playlists
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {playlists.map((playlist, index) => (
                <Dropdown.Item key={index} onClick={() => handlePlaylistSelect(index)}>
                  {playlist.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarComponent;
