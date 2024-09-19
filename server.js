const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Serve static files from the 'output' directory
app.use(express.static(path.join(__dirname, 'output')));

// Function to regenerate HTML
const regenerateHtml = () => {
  exec('node top-artists.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(stdout);
  });

  exec('node top-songs.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
};

// Initial HTML generation
regenerateHtml();

// Watch for changes in 'top-artists.njk'
const watcher = chokidar.watch(
  path.join(__dirname, 'views', 'top-artists.njk'),
  path.join(__dirname, 'views', 'top-songs.njk')
);

watcher.on('change', () => {
  console.log('Detected change in files. Regenerating HTML...');
  console.log('Detected change in top-songs.njk. Regenerating HTML...');
  regenerateHtml();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
