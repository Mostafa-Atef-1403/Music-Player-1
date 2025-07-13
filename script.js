const allSongs = [
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
        cover: "https://img.freepik.com/free-photo/digital-art-style-mental-health-day-awareness-illustration_23-2151813368.jpg?ga=GA1.1.910341930.1722894715&semt=ais_hybrid"
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
        cover: "https://img.freepik.com/free-photo/children-playing-street-watercolor_23-2151712998.jpg?ga=GA1.1.910341930.1722894715"
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
        cover: "https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825737.jpg?ga=GA1.1.910341930.1722894715&semt=ais_hybrid"
    },
    {
        id: 4,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
        cover: "https://img.freepik.com/free-photo/watercolor-car-painting-illustration_23-2151706292.jpg?ga=GA1.1.910341930.1722894715"
    }
];

const img = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prev = document.getElementById('previous'),
    next = document.getElementById('next'),
    play = document.getElementById('play'),
    bg = document.getElementById('bg-img');

const music = new Audio();
let musicIndex = 0;
let isPlaying = false;

function playMusic(){
    isPlaying = true;
    play.classList.replace("fa-play", "fa-pause");
    play.setAttribute("title", "Pause")
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    play.classList.replace("fa-pause", "fa-play");
    play.setAttribute("title", "Play")
    music.pause(); 
}

function togglePlay(){
    if(isPlaying){
        pauseMusic(); 
    } else {
        playMusic(); 
    }
}

function loadMusic(song){
    music.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
    img.src = song.cover;
    bg.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + allSongs.length) % allSongs.length; 
    loadMusic(allSongs[musicIndex]); 
    playMusic();    
}

function updateBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = time => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${Math.floor(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${Math.floor(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function clickBar(e){
    const width = playerProgress.clientWidth;
    const click = e.offsetX;
    music.currentTime = (click / width) * music.duration;
}

loadMusic(allSongs[musicIndex]);

// Attach event listeners 
play.addEventListener('click', togglePlay);
next.addEventListener('click', () => changeMusic(1)); 
prev.addEventListener('click', () => changeMusic(-1)); 

// Update progress bar
music.addEventListener('timeupdate', updateBar);
playerProgress.addEventListener('click', clickBar);
