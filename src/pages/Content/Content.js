import React, { Component } from "react";
import axios from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
	path: path.join(__dirname, ".env")
});

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

class Content extends Component {
	state = {
		spotifyArray: [],
		iframeArtist: "",
	};

	// Query for User's Favorite Artists on Spotify
	spotifyAPICall = () => {

		// Get Client Token
		let tokenArray = URL.spleit("#");
		let splitTokenArray = tokenArray[1].split["&"];
		let finalTokenArray = splitTokenArray[0].split("=");
		let client_token = finalTokenArray[1];

		let queryURL = "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50";

		axios.get({
			url: queryURL,
			headers: {
				"Authorization": "Bearer " + client_token
			}
		}).then(response => {
			let data = response.items;

			let favoriteArtists = [];
			
		
			for (let i = 0; i < data.length; i++) {
				favoriteArtists.push({
					artistName: data[i].name,
					spotifyID: data[i].id
				});
			};

			this.setState({
				spotifyArray: favoriteArtists
			});
		});
	};

	componentDidMount = () => {
		this.spotifyAPICall();
		console.log(this.state.spotifyArray);
	};

	render() {
		return (
			<div>
				
			</div>
		)
	}
}

export default Content;