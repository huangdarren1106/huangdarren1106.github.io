import React, { useState, useEffect } from "react";
import axios from 'axios';
import { authEndpoint, clientId, redirectUri, scopes } from "./config_example";
import hash from "./hash";
import Player from "./Player";
import TenTracks from "./TenTracks"
import GraphScreen from "./GraphScreen";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topTracksActivated, setTopTracksActivated] = useState(false);
  const [topArtists, setTopArtists] = useState([]);
  const [topArtistsActivated, setTopArtistsActivated] = useState(false);

  const getTopTracks = (token) => {
    /*
    const headers = {
      "Authorization": "Bearer " + token
  };
    axios.get("https://api.spotify.com/v1/me/top/tracks", {headers}).then((response) => {
      console.log(response.data);
      setTopTracks(response.data.items);
      setTopTracksActivated(true);
    })
    */
    setTopTracksActivated(true)
  }



  useEffect(() => {
    var mToken = hash.access_token;
    if (mToken) {
      setToken(mToken);
    }

  })
  return (
    <div>
      
      <body className="App-body">
        {!token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {token && (
          <GraphScreen token={token} />
        )}
      </body>
    </div>
  );

}

