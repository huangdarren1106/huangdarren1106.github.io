import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config_example";
import axios from "axios";
import hash from "./hash";
import Player from "./Player";
import TenTracks from "./TenTracks"
import GraphScreen from "./GraphScreen";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
	const [topTracksActivated, setTopTracksActivated] = useState(false);
	const [topArtistsActivated, setTopArtistsActivated] = useState(false);
	const [token, setToken] = useState(null);
	const [topTracks, setTopTracks] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const getTopTracks = (token) => setTopTracksActivated(true);
	
	useEffect(() => {
		let mToken = hash_access_token;
		mToken ? setToken(mToken) : void 0;
	});
	
	return (
		<div>
			<body className="App-body">
				{!token && (
					<a className="btn btn--loginApp-link"
						href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
					>Login to Spotify</a>
				)}
				{token && (<GraphScreen token={token}>)}
			</body>
		</div>
	);
}
