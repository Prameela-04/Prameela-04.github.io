document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistEl = document.getElementById('playlist');
    const songTitleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('artist');
    const albumArtEl = document.getElementById('album-art');

    const songs = [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be"
        },
        {
            title: "Save Your Tears",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02c591d5a14fed7b1be3cc500d"
        },
        {
            title: "Stay",
            artist: "The Kid LAROI, Justin Bieber",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be"
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02c591d5a14fed7b1be3cc500d"
        }
    ];

    let currentSongIndex = 0;

    function loadSong(song) {
        songTitleEl.textContent = song.title;
        artistEl.textContent = song.artist;
        albumArtEl.src = song.cover;
        audio.src = song.src;

        const playlistItems = playlistEl.querySelectorAll('li');
        playlistItems.forEach((item, index) => {
            item.classList.remove('playing');
            if (index === currentSongIndex) {
                item.classList.add('playing');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    function playSong() {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        document.querySelector('.music-player').classList.add('playing');
    }

    function pauseSong() {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.music-player').classList.remove('playing');
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        if (!isNaN(duration)) {
            durationEl.textContent = formatTime(duration);
        }
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function populatePlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(songs[currentSongIndex]);
                playSong();
            });
            playlistEl.appendChild(li);
        });
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = document.querySelector('.music-player').classList.contains('playing');
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });

    populatePlaylist();
    loadSong(songs[currentSongIndex]);
    audio.volume = volumeSlider.value;
});
