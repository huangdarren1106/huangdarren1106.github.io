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
      'https://mytopspotify.io/spotify-top-artists.json'
    );
    const artists = response.data.data;

    const totalArtists = artists.length;

    artists.forEach((artist) => {
      artist.id = artist.spotifyUrl.split('/')[4];
      artist.embedUrl = `https://open.spotify.com/embed/artist/${artist.id}`;

      // Preprocess dailyTrend
      if (artist.dailyTrend) {
        artist.dailyTrend = parseFloat(artist.dailyTrend.replace(/,/g, ''));
      }

      // Format listeners
      artist.formattedListeners = numberFormat(artist.listeners);
    });

    // Sort artists by dailyTrend
    const sortedArtists = [...artists].sort(
      (a, b) => b.dailyTrend - a.dailyTrend
    );

    const topArtist = artists[0];
    const embedUrl = topArtist.embedUrl;

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

    // Format dailyTrend for topGainers and topLosers
    const formattedTopGainers = sortedArtists.slice(0, 3).map((artist) => ({
      ...artist,
      formattedDailyTrend: numberFormat(Math.abs(artist.dailyTrend)),
    }));

    const formattedTopLosers = sortedArtists
      .slice(-3)
      .reverse()
      .map((artist) => ({
        ...artist,
        formattedDailyTrend: numberFormat(Math.abs(artist.dailyTrend)),
      }));

    const html = nunjucks.render('top-artists.njk', {
      title: `Number 1 Artist On Spotify & Top Artists: ${today}`,
      description: `Discover the top Spotify artists in ${today}! Explore ${currentYear}’s hottest hits: from the number 1 artist on Spotify to top 10 artists and beyond.`,
      image: 'https://huangdarren1106.github.io/top-spotify-artists.jpg',
      url: 'https://huangdarren1106.github.io/top-spotify-artists',
      updated_at: today,
      artists,
      topArtist,
      embedUrl,
      totalArtists,
      year: currentYear,
      next_date: nextDate,
      topGainers: formattedTopGainers,
      topLosers: formattedTopLosers,
    });

    // Create output folder if it doesn't exist
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Write the HTML to a file
    fs.writeFileSync(path.join(outputDir, 'top-spotify-artists.html'), html);
    console.log('Static HTML file generated successfully.');
  } catch (error) {
    console.error('Error generating static HTML:', error);
  }
}

generateStaticHtml();
