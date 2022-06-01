import React from "react";
import "./TenTracks.css";

const TenTracks = props => {

    return(
        <table id= "trackTable">
            <tr>
                <th>Rank</th>
                <th>Track</th>
            </tr>
            <tr>
                <th>1</th>
                <th>{props.tracks[0].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[0].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>2</th>
                <th>{props.tracks[1].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[1].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>3</th>
                <th>{props.tracks[2].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[2].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>4</th>
                <th>{props.tracks[3].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[3].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>5</th>
                <th>{props.tracks[4].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[4].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>6</th>
                <th>{props.tracks[5].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[5].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>7</th>
                <th>{props.tracks[6].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[6].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>8</th>
                <th>{props.tracks[7].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[7].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>9</th>
                <th>{props.tracks[8].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[8].album.images[0].url} />
                </div>
            </tr>
            <tr>
                <th>10</th>
                <th>{props.tracks[9].name}</th>
                <div className="now-playing__img">
                    <img src={props.tracks[9].album.images[0].url} />
                </div>
            </tr>

        </table>
    );
};

export default TenTracks;