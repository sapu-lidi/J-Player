


let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector("#art");
let track_title = document.querySelector(".title");
let track_artist = document.querySelector(".artist");
let track_album = document.querySelector(".album");
let track_genre = document.querySelector(".genre");
let track_year = document.querySelector(".year");
let myList = document.getElementById('myList')
let myLyric = document.getElementById('myLyric')

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let curr_track = document.getElementById('source');

// Specify globally used values

let track_play = localStorage.getItem("track_play");
let track_index = localStorage.getItem("track_index");
let track_last = localStorage.getItem("track_last");
let volume_saved = localStorage.getItem("volume_saved");


if (!track_play || !track_index) {
    track_play = localStorage.setItem("track_play", 1)
    track_index = localStorage.setItem("track_index", 0)
} 




let isPlaying = false;
let updateTimer;
let volume_default = 20;
let btnMenuState = false
let btnLyricState = false
let subPath = ''

function loadTrack(track_index) {
        clearInterval(updateTimer);
        resetValues();
        readTags();
        curr_track.src = subPath+track_list[parseInt(track_index)].path.replace("./", "");
        curr_track.load();
        now_playing.textContent =
            (parseInt(track_index) + 1) + " OF " + track_list.length;
        updateTimer = setInterval(seekUpdate, 1000);
        curr_track.addEventListener("ended", nextTrack);
    }
    
    function resetValues() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
    }
    
    function playTrack() {
        // document.li.style.color = "salmon"
        let p_elements = Array.from(document.getElementsByTagName('li'));
            for (var i=0; i < p_elements.length; i++) {
                p_elements[i].style.background="#efefef";
                p_elements[i].style.color="black";
            }
        // random_bg_color();
        now_playing.textContent = track_play + " OF " + track_list.length;
        curr_track.play();
        isPlaying = true;
        readTags();
        playpause_btn.innerHTML = '<i class="icon-play-pause fa-solid fa-pause fa-2xl"></i>';
        document.getElementById("art").classList.add('spinning')
        document.getElementById(track_index).style.background = "black"
        document.getElementById(track_index).style.color = "white"
        document.getElementById(track_index).style.borderRadius = "8px"

    }

    function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="icon-play-pause fa-solid fa-play fa-2xl"></i>';
        document.getElementById("art").classList.remove('spinning')
    }
    
    function nextTrack() {

        if (typePlay) {
            // bukan random
            // console.log('bukan random')
            // track_play = track_index + 1
            if (parseInt(track_play) == track_list.length) {
                track_play = 1
                track_index = 0
            } else {
                track_index++
                track_play = track_index + 1
            }
        } else {
            // console.log('random')
            randomPlay()
        }

        localStorage.setItem("track_play", track_play)
        localStorage.setItem("track_index", track_index)
        track_play = track_play
        track_index = track_index
        
        curr_track.src = subPath+track_list[parseInt(track_index)].path.replace("./", "")
        playTrack()

            
        
    }
    
    function prevTrack() {

        if (typePlay) {
            if (parseInt(track_index) == 0) {
                track_play = track_list.length
                track_index = track_play - 1
            } else {
                track_index--
                track_play = track_index + 1
            }
        } else {
            randomPlay()
        }
value
        localStorage.setItem("track_play", track_play)
        localStorage.setItem("track_index", track_index)
        track_play = track_play
        track_index = track_index
        
        curr_track.src = subPath+track_list[parseInt(track_index)].path.replace("./", "")
        playTrack()
    }

    function seekTo() {
        seekto = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seekto;
        document.querySelector('').style.width = seekto+'%'
        }
        
    function setVolume() {
        curr_track.volume = volume_slider.value / 100;
        localStorage.setItem("volume_saved", curr_track.volume)

    }
        
    function seekUpdate() {
        let seekPosition = 0;
            
        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
        
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            // Display the updated duration
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    function randomPlay() {
        track_index = Math.floor(Math.random() * track_list.length);
        track_play = track_index + 1
        localStorage.setItem("track_play", track_play)
        localStorage.setItem("track_index", track_index)
        track_play = track_play
        track_index = track_index
        console.log('random')
        document.getElementById(track_last).style.color = "#444"

    }



    function readTags() {
        track_title.textContent = ' '+track_list[parseInt(track_index)].title+' ';
        track_artist.textContent = ' '+track_list[parseInt(track_index)].artist+' ';
        track_album.textContent = track_list[parseInt(track_index)].album;
        // track_genre.textContent = ' '+track_list[parseInt(track_index)].genre+' ';
        // track_year.textContent = ' '+track_list[parseInt(track_index)].year+' ';
        art.src = subPath+track_list[parseInt(track_index)].picture
        // art.style.backgroundImage = "url('"+subPath+track_list[parseInt(track_index)].picture+"');"

        if (track_list[parseInt(track_index)].lyric !== '') {
            myLyric.textContent = track_list[parseInt(track_index)].lyric
            } else {
                myLyric.textContent = 'Lyric not found!'
        }

    }

    function volume(set) {
        let setVol = set/100;
        curr_track.volume = setVol;
        volume_slider.value = set
    }

    function play(set) {
        var data = parseInt(set.getAttribute("data-id"))+1
        track_index = parseInt(set.getAttribute("data-id"))
        track_play = data
        curr_track.src = subPath+track_list[parseInt(track_index)].path.replace("./", "")
        localStorage.setItem("track_play", track_play)
        localStorage.setItem("track_index", track_index)
        track_play = track_play
        track_index = track_index
        playTrack()

        const mediaQuery = window.matchMedia('(max-width: 720px)')
        // Check if the media query is true
        if (mediaQuery.matches) {
        // Then trigger an alert
        // alert('Media Query Matched!')
        list.style.display ='none'
        home.style.display ='inline'
        }
        
    }

     const mediaQuery = window.matchMedia('(min-width: 720px)')
        // Check if the media query is true
        if (mediaQuery.matches) {
            if (volume_saved == null) {
                volume(volume_default)
            } else {
                volume(parseInt(volume_saved*100))

            }
        } else {
            volume(100)
        }
    loadTrack(track_index);

    // ======================================
