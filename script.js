// ============================================================
// 1. SONG DATA
// ============================================================

const songs = [
  {
    id: 1,
    name: "Dreams",
    artist: "Local Artist",
    img: "images/dreams.jpg",
    genre: "Pop",
    source: "songs/dreams.wav"
  },
  {
    id: 2,
    name: "Night Drive",
    artist: "Local Artist",
    img: "images/night-drive.jpg",
    genre: "Electronic",
    source: "songs/night-drive.wav"
  },
  {
    id: 3,
    name: "Summer",
    artist: "Local Artist",
    img: "images/summer.jpg",
    genre: "Pop",
    source: "songs/summer.wav"
  },
  {
    id: 4,
    name: "Peaceful Mind",
    artist: "Local Artist",
    img: "images/peaceful-mind.jpg",
    genre: "Classical",
    source: "songs/peaceful-mind.wav"
  },
  {
    id: 5,
    name: "Rock Star",
    artist: "Local Artist",
    img: "images/rock-star.jpg",
    genre: "Rock",
    source: "songs/rock-star.wav"
  }
];

// ============================================================
// 2. APPLICATION STATE
// ============================================================

let currentSongIndex = 0;
let selectedGenre = "all";
let selectedPlaylistId = null;

let playlists = [
  {
    id: 1,
    name: "My Favorites",
    songIds: []
  }
];

// ============================================================
// 3. DOM ELEMENTS
// ============================================================

const songsList = document.getElementById("songsList");
const genreFilter = document.getElementById("genreFilter");
const songSearch = document.getElementById("songSearch");

const currentSongImg = document.getElementById("currentSongImg");
const currentSongName = document.getElementById("currentSongName");
const currentSongArtist = document.getElementById("currentSongArtist");
const currentSongGenre = document.getElementById("currentSongGenre");
const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addToPlaylistBtn = document.getElementById("addToPlaylistBtn");
const playlistSelectForAdd = document.getElementById("playlistSelectForAdd");

const playlistsList = document.getElementById("playlistsList");
const playlistSongs = document.getElementById("playlistSongs");
const selectedPlaylistTitle = document.getElementById("selectedPlaylistTitle");

const themeBtn = document.getElementById("themeBtn");

const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistModal = document.getElementById("playlistModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const playlistForm = document.getElementById("playlistForm");
const playlistName = document.getElementById("playlistName");

const playlistSearch = document.getElementById("playlistSearch");

// ============================================================
// 4. THEME
// ============================================================

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");

  if (currentTheme === "light") {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    document.body.setAttribute("data-theme", "light");
    themeBtn.textContent = "🌙 Dark Mode";
  }
}

themeBtn.addEventListener("click", toggleTheme);

// ============================================================
// 5. GENRE FILTER
// ============================================================

function populateGenres() {
  const genres = [...new Set(songs.map(song => song.genre))];

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

genreFilter.addEventListener("change", function () {
  selectedGenre = this.value;
  showSongs();
});

// ============================================================
// 6. SHOW SONGS
// ============================================================

function showSongs() {
  songsList.innerHTML = "";

  const searchText = songSearch.value.toLowerCase().trim();

  const filteredSongs = songs.filter(song => {
    const genreMatches =
      selectedGenre === "all" || song.genre === selectedGenre;

    const searchMatches =
      song.name.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText);

    return genreMatches && searchMatches;
  });

  if (filteredSongs.length === 0) {
    songsList.innerHTML = `<p class="empty">No songs found.</p>`;
    return;
  }

  filteredSongs.forEach(song => {
    const songElement = document.createElement("div");
    songElement.className = "song-item";

    if (songs[currentSongIndex].id === song.id) {
      songElement.classList.add("active");
    }

    songElement.innerHTML = `
      <img src="${song.img}" alt="${song.name}">
      <div class="song-item-info">
        <h3>${song.name}</h3>
        <p>${song.artist}</p>
      </div>
      <small>${song.genre}</small>
    `;

    songElement.addEventListener("click", function () {
      currentSongIndex = songs.findIndex(item => item.id === song.id);
      renderCurrentSong();
    });

    songsList.appendChild(songElement);
  });
}

songSearch.addEventListener("input", showSongs);

// ============================================================
// 7. CURRENT SONG / SONG CARD
// ============================================================

function renderCurrentSong() {
  const currentSong = songs[currentSongIndex];

  currentSongImg.src = currentSong.img;
  currentSongImg.alt = currentSong.name;
  currentSongName.textContent = currentSong.name;
  currentSongArtist.textContent = currentSong.artist;
  currentSongGenre.textContent = currentSong.genre;

  audioPlayer.src = currentSong.source;
  audioPlayer.load();

  showSongs();
}

// ============================================================
// 8. PLAY / PAUSE
// ============================================================

playBtn.addEventListener("click", function () {
  if (!audioPlayer.src) {
    return;
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸ Pause";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶ Play";
  }
});

audioPlayer.addEventListener("play", function () {
  playBtn.textContent = "⏸ Pause";
});

audioPlayer.addEventListener("pause", function () {
  playBtn.textContent = "▶ Play";
});

// ============================================================
// 9. NEXT SONG
// ============================================================

function playNextSong() {
  currentSongIndex++;

  // Edge case:
  // If we reach the last song, go back to first song.
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  renderCurrentSong();
  audioPlayer.play();
}

nextBtn.addEventListener("click", playNextSong);

// ============================================================
// 10. PREVIOUS SONG
// ============================================================

function playPreviousSong() {
  currentSongIndex--;

  // Edge case:
  // If we go before the first song, go to last song.
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  renderCurrentSong();
  audioPlayer.play();
}

prevBtn.addEventListener("click", playPreviousSong);

// ============================================================
// 11. AUTO PLAY NEXT SONG
// ============================================================

audioPlayer.addEventListener("ended", playNextSong);

// ============================================================
// 12. PLAYLIST SELECT DROPDOWN
// ============================================================

function renderPlaylistSelect() {
  playlistSelectForAdd.innerHTML =
    `<option value="">Select playlist</option>`;

  playlists.forEach(playlist => {
    const option = document.createElement("option");

    option.value = playlist.id;
    option.textContent = playlist.name;

    playlistSelectForAdd.appendChild(option);
  });

  if (selectedPlaylistId !== null) {
    playlistSelectForAdd.value = selectedPlaylistId;
  }
}

// ============================================================
// 13. ADD SONG TO PLAYLIST
// ============================================================

function addToPlaylist() {
  const playlistId = Number(playlistSelectForAdd.value);

  if (!playlistId) {
    alert("Please select a playlist first.");
    return;
  }

  const playlist = playlists.find(item => item.id === playlistId);

  const currentSong = songs[currentSongIndex];

  if (playlist.songIds.includes(currentSong.id)) {
    alert("This song is already in the playlist.");
    return;
  }

  playlist.songIds.push(currentSong.id);

  selectedPlaylistId = playlistId;

  renderPlaylists();
  renderPlaylistSongs();

  alert(`"${currentSong.name}" added to "${playlist.name}"`);
}

addToPlaylistBtn.addEventListener("click", addToPlaylist);

// ============================================================
// 14. CREATE PLAYLIST
// ============================================================

function createPlaylist() {
  const name = playlistName.value.trim();

  if (name === "") {
    return;
  }

  const newPlaylist = {
    id: Date.now(),
    name: name,
    songIds: []
  };

  playlists.push(newPlaylist);

  selectedPlaylistId = newPlaylist.id;

  playlistForm.reset();
  playlistModal.classList.add("hidden");

  renderPlaylistSelect();
  renderPlaylists();
  renderPlaylistSongs();
}

playlistForm.addEventListener("submit", function (event) {
  event.preventDefault();
  createPlaylist();
});

// ============================================================
// 15. PLAYLIST MODAL
// ============================================================

createPlaylistBtn.addEventListener("click", function () {
  playlistModal.classList.remove("hidden");
  playlistName.focus();
});

closeModalBtn.addEventListener("click", function () {
  playlistModal.classList.add("hidden");
});

playlistModal.addEventListener("click", function (event) {
  if (event.target === playlistModal) {
    playlistModal.classList.add("hidden");
  }
});

// ============================================================
// 16. RENDER PLAYLISTS
// ============================================================

function renderPlaylists() {
  playlistsList.innerHTML = "";

  const searchText = playlistSearch.value.toLowerCase().trim();

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchText)
  );

  if (filteredPlaylists.length === 0) {
    playlistsList.innerHTML =
      `<p class="empty">No playlists found.</p>`;
    return;
  }

  filteredPlaylists.forEach(playlist => {
    const playlistElement = document.createElement("div");

    playlistElement.className = "playlist-item";

    if (playlist.id === selectedPlaylistId) {
      playlistElement.classList.add("active");
    }

    playlistElement.innerHTML = `
      <div class="playlist-info">
        <strong>🎵 ${playlist.name}</strong>
        <span>${playlist.songIds.length} song(s)</span>
      </div>

      <button class="delete-playlist" title="Delete playlist">
        🗑
      </button>
    `;

    playlistElement.addEventListener("click", function () {
      selectedPlaylistId = playlist.id;
      playlistSelectForAdd.value = playlist.id;

      renderPlaylists();
      renderPlaylistSongs();
    });

    const deleteButton =
      playlistElement.querySelector(".delete-playlist");

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      deletePlaylist(playlist.id);
    });

    playlistsList.appendChild(playlistElement);
  });
}

// ============================================================
// 17. DELETE PLAYLIST - ADDITIONAL FEATURE
// ============================================================

function deletePlaylist(playlistId) {
  if (playlists.length === 1) {
    alert("You must keep at least one playlist.");
    return;
  }

  const playlist = playlists.find(item => item.id === playlistId);

  const confirmDelete = confirm(
    `Delete playlist "${playlist.name}"?`
  );

  if (!confirmDelete) {
    return;
  }

  playlists = playlists.filter(item => item.id !== playlistId);

  if (selectedPlaylistId === playlistId) {
    selectedPlaylistId = playlists[0].id;
  }

  renderPlaylistSelect();
  renderPlaylists();
  renderPlaylistSongs();
}

// ============================================================
// 18. RENDER SONGS INSIDE SELECTED PLAYLIST
// ============================================================

function renderPlaylistSongs() {
  playlistSongs.innerHTML = "";

  if (selectedPlaylistId === null) {
    selectedPlaylistTitle.textContent = "Select a playlist";
    playlistSongs.innerHTML =
      `<p class="empty">No playlist selected.</p>`;
    return;
  }

  const playlist = playlists.find(
    item => item.id === selectedPlaylistId
  );

  if (!playlist) {
    return;
  }

  selectedPlaylistTitle.textContent =
    `${playlist.name} - Songs`;

  if (playlist.songIds.length === 0) {
    playlistSongs.innerHTML =
      `<p class="empty">No songs in this playlist yet.</p>`;
    return;
  }

  playlist.songIds.forEach(songId => {
    const song = songs.find(item => item.id === songId);

    if (!song) {
      return;
    }

    const songElement = document.createElement("div");
    songElement.className = "playlist-song-item";

    songElement.innerHTML = `
      <img src="${song.img}" alt="${song.name}">

      <div class="info">
        <strong>${song.name}</strong>
        <span>${song.artist}</span>
      </div>

      <button class="remove-song" title="Remove song">
        ✕
      </button>
    `;

    // Clicking the song plays it.
    songElement.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-song")) {
        return;
      }

      currentSongIndex = songs.findIndex(
        item => item.id === song.id
      );

      renderCurrentSong();
      audioPlayer.play();
    });

    const removeButton =
      songElement.querySelector(".remove-song");

    removeButton.addEventListener("click", function (event) {
      event.stopPropagation();
      removeSongFromPlaylist(song.id);
    });

    playlistSongs.appendChild(songElement);
  });
}

// ============================================================
// 19. REMOVE SONG FROM PLAYLIST - ADDITIONAL FEATURE
// ============================================================

function removeSongFromPlaylist(songId) {
  const playlist = playlists.find(
    item => item.id === selectedPlaylistId
  );

  if (!playlist) {
    return;
  }

  playlist.songIds = playlist.songIds.filter(
    id => id !== songId
  );

  renderPlaylists();
  renderPlaylistSongs();
}

// ============================================================
// 20. PLAYLIST SEARCH
// ============================================================

playlistSearch.addEventListener("input", renderPlaylists);

// ============================================================
// 21. INITIAL SETUP
// ============================================================

populateGenres();
renderPlaylistSelect();

selectedPlaylistId = playlists[0].id;

renderPlaylists();
renderPlaylistSongs();
renderCurrentSong();
