// Select elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const fileUpload = document.getElementById("fileUpload");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const album = document.getElementById("album"); // New element for album

// Preloaded playlist with album info
let playlist = [
  { name: "Song 1", url: "songs/Kanmoodi Thirakumbothu.mp3", artist: "Vijay", album: "Album A" },
  { name: "Song 2", url: "songs/Vaadi Vaadi.mp3", artist: "Vijay", album: "Album B" },
  { name: "Song 3", url: "songs/Vennilavu Saaral.mp3", artist: "Sivakarthikeyan", album: "Album C" },
];

let currentSongIndex = 0;

// Load a song
function loadSong(song) {
  audio.src = song.url;
  title.textContent = song.name;
  artist.textContent = song.artist;
  album.textContent = song.album; // Display album info
}

// Play song
function playSong() {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

// Pause song
function pauseSong() {
  audio.pause();
  playBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

// Next / Previous
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  playSong();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek when slider changes
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
audio.volume = volumeSlider.value;
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Upload songs
fileUpload.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);

  const uploadedSongs = files.map(file => ({
    name: file.name,
    url: URL.createObjectURL(file),
    artist: "Local File",
    album: "Local Album" // Default album for uploaded songs
  }));

  // Append uploaded songs to playlist
  playlist = playlist.concat(uploadedSongs);

  if (uploadedSongs.length > 0) {
    currentSongIndex = playlist.length - uploadedSongs.length; // start with first uploaded
    loadSong(playlist[currentSongIndex]);
  }
});

// Event listeners
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Auto next song after current ends
audio.addEventListener("ended", nextSong);

// Load first song
loadSong(playlist[currentSongIndex]);
