import { pid } from "process";
import React, { useState, useEffect } from "react";
import PiChart from './PiChart.js'
import './GraphScreen.css'
export default function GraphScreen({ token }) {



    //const [topArtists, setTopArtists] = useState([]);
    const [artistToGenres, setArtistToGenres] = useState([]);
    const [dataObj, setDataObj] = useState({});
    const axios = require("axios");
    const cheerio = require("cheerio");
    const pretty = require("pretty");
    const fs = require("fs");
    const [piData, setPiData] = useState({})
    const [isMounted, setIsMounted] = useState(false);

    const indexOfMax = (arr) => {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }
    useEffect(() => {
        var topArtists = [];
        const getTopArtists = async (token) => {
            const headers = {
                "Authorization": "Bearer " + token
            };
            await axios.get("https://api.spotify.com/v1/me/top/artists", { headers }).then((response) => {
                //setTopArtists(response.data.items);
                topArtists = response.data.items;
                //setTopArtistsActivated(true);

            })
            const currArtistsToGenres = topArtists.map((artist, index)=>{
                const artistName = artist.name;
                const imageURL = artist.images[0].url;
                const genresArr = artist.genres;
                return {
                    artistName: artistName,
                    genresArr: genresArr
                }
            })
            setArtistToGenres(currArtistsToGenres);
            const unorganizedGenres = topArtists.map((artist, index) => {
                const genreArr = artist.genres;
                return genreArr;
            })
            const allGenres = [].concat(...unorganizedGenres)
            //sort frequency
            var frequency = {};
            allGenres.map((genre) => {
                frequency[genre] = 0;
            })
            allGenres.map((genre) => {
                frequency[genre] = frequency[genre] + 1;
            })
            var keys = Object.keys(frequency);
            var vals = Object.values(frequency);
            var a = 0;
            var finalArr = [];
            while (a != 20 && keys.length != 0) {
                var currIndex = indexOfMax(vals);
                finalArr.push(keys[currIndex]);
                keys.splice(currIndex, 1);
                vals.splice(currIndex, 1);
                a++;
            }
            var finalObj = {};
            finalArr.map((genre) => {
                finalObj[genre] = frequency[genre];
            })
            setDataObj(finalObj)
            const sum = Object.values(finalObj).reduce((partialSum, a) => partialSum + a, 0);
            console.log(sum)
            var currPiData = {
                labels: Object.keys(finalObj),
                datasets: [
                    {
                        label: "Your Top Genres",
                        data: Object.values(finalObj).map((value)=>{
                            return Math.round((value/sum) * 100)/100;
                            //return num + "%"
                        }),
                        backgroundColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'],
                        borderColor: "white",
                        radius: "100%"
                    }
                ]
            }
            setPiData(currPiData);
            setIsMounted(true);
        }
        getTopArtists(token);
    }, [])


    if (!isMounted)
        return (
            <div className="GraphScreen">
                <header className="App-header">
                    mounting
                </header>

            </div>
        )
    return (
            <body className="GraphScreen">


                <PiChart chartData={piData} artistToGenres={artistToGenres} />
                <table>
                    {}
                </table>
            </body>
    );
};