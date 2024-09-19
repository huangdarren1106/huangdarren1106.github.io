const axios = require('axios');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Configure Nunjucks
nunjucks.configure('views', { autoescape: true });

// Helper function to format numbers with commas
function numberFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function generateStaticHtml() {
  try {
    const response = await axios.get(
      'https://mytopspotify.io/spotify-top-songs.json'
    );
    const songs = response.data.data;

    const totalSongs = songs.length;

    songs.forEach((song) => {
      song.id = song.spotifyUrl.split('/')[4];
      song.embedUrl = `https://open.spotify.com/embed/track/${song.id}`;
    });

    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    const nextDate = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    const currentYear = new Date().getFullYear();

    const html = nunjucks.render('top-songs.njk', {
      title: `Most Streamed Song On Spotify Today: ${today}`,
      description: `What is the most streamed song on Spotify as of ${today}? Discover the top songs right now that Spotify listeners have been having on repeat.`,
      image: 'https://huangdarren1106.github.io/spotify-top-songs.jpg',
      url: 'https://huangdarren1106.github.io/spotify-top-songs-right-now',
      updated_at: today,
      songs,
      totalSongs,
      year: currentYear,
      next_date: nextDate,
    });

    // Create output folder if it doesn't exist
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Write the HTML to a file
    fs.writeFileSync(
      path.join(outputDir, 'spotify-top-songs-right-now.html'),
      html
    );
    console.log('Static HTML file generated successfully.');
  } catch (error) {
    console.error('Error generating static HTML:', error);
  }
}

generateStaticHtml();
