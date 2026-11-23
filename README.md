# Local Music Player

A lightweight web-based music player for playing local audio files, organizing songs by genre, and creating playlists.

## Features

- Play, pause, skip to the next song, or return to the previous song
- Automatically play the next song when the current one ends
- Search songs by title or artist
- Filter songs by genre
- Create, search, select, and delete playlists
- Add or remove songs from playlists
- Switch between dark and light themes
- Responsive layout for desktop and mobile screens

## Project Structure

```text
music-player-project/
├── index.html
├── script.js
├── style.css
├── images/
│   ├── dreams.jpg
│   ├── night-drive.jpg
│   ├── peaceful-mind.jpg
│   ├── rock-star.jpg
│   └── summer.jpg
└── songs/
    ├── dreams.wav
    ├── night-drive.wav
    ├── peaceful-mind.wav
    ├── rock-star.wav
    └── summer.wav
```

## Getting Started

No package installation or build step is required.

1. Clone or download this project.
2. Open a terminal in the project folder.
3. Start a local web server:

   ```bash
   python3 -m http.server 8000
   ```

4. Open [http://localhost:8000](http://localhost:8000) in a browser.

You can also open `index.html` directly, but a local server is recommended for consistent browser audio behavior.

## Usage

1. Select a song from **All Songs**.
2. Use the browser audio controls or the custom play, previous, and next buttons.
3. Use the genre menu and search field to find songs.
4. Select a playlist, or create one with **Create Playlist**.
5. Choose a playlist from the dropdown and click **Add to Playlist**.
6. Open a playlist to play or remove its songs.

## Data Behavior

The song catalog and playlists are managed in memory by `script.js`. The default **My Favorites** playlist is created when the page loads.

Playlists and changes are not saved after the page is refreshed. To make data persistent, integrate browser storage or a backend database.

## Technologies

- HTML5
- CSS3
- JavaScript
- HTML5 Audio
