import 'chart.js/auto';
import './GraphScreen.css'
import { Pie } from "react-chartjs-2";

import React, { useState, useEffect } from "react";

export default function PiChart({ chartData, artistToGenres }) {
    console.log(artistToGenres)
    return (
        <div>
            <Pie className='pichart'
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Your Top Genres",
                            color: "#000000"
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                color: "#000000",
                                font: {
                                    size: 16

                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    var initialLabel = context.label + ": ";
                                    var artists = [];
                                    artistToGenres.map((artist)=>{
                                        if(artist.genresArr.includes(context.label)){
                                            artists.push(artist.artistName);
                                        }
                                    })
                                    artists.map((artist)=>{
                                        initialLabel = initialLabel + artist  + ", "
                                    });
                                    initialLabel = initialLabel.substring(0, initialLabel.length-2);
                                    return initialLabel;
                                    
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
};
