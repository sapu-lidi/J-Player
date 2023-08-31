        const home = document.getElementById('home')
        const list = document.getElementById('list')
        const lyric = document.getElementById('lyric')
        const iconLyric = document.getElementById('iconLyric')
        const iconMode = document.getElementById('iconMode')
        const iconFullScreen = document.getElementById('iconFullScreen')
        
        // localstorage
        let playMode = localStorage.getItem("playMode");


        // let isRandom =

        let typePlay = true
        let listState = false
        let lyricState = false
        let fullState = false

        function btnList() {
            if(listState == false) {
                listState = true
                list.style.display = 'inline'
                home.style.display = 'none'
                lyric.style.display = 'none'
                
            } else {
                listState = false
                home.style.display = 'inline'
                list.style.display = 'none'
                lyric.style.display = 'none'
            }
        }

        function btnLyric() {
            if(lyricState == false) {
                lyricState = true
                lyric.style.display = 'inline'
                home.style.display = 'none'
                list.style.display = 'none'
                iconLyric.innerHTML = "<i class='fa-solid fa-house'></i>"
            } 
            else {
                lyricState = false
                home.style.display = 'inline'
                list.style.display = 'none'
                lyric.style.display = 'none'
                iconLyric.innerHTML = "<i class='fa-solid fa-music'></i>"
            }
        }

        function full() {
            if (fullState == false) {
                fullState = true
                document.body.requestFullscreen()
                iconFullScreen.innerHTML = "<i class='fa-solid fa-compress'></i>"
            } else  if (fullState == true)  {
                fullState = false
                document.exitFullscreen();
                iconFullScreen.innerHTML = "<i class='fa-solid fa-expand'></i>"
            }
        }

        function btnMode() {
            if (typePlay == true) {
                typePlay = false
                iconMode.innerHTML = '<i class="icon fa-solid fa-shuffle"></i>'
                localStorage.setItem("playMode", "random");
                console.log("mode random")
            } else {
                typePlay = true
                iconMode.innerHTML = '<i  class="icon fa-solid fa-rotate-right"></i>'
                localStorage.removeItem("playMode");
                console.log("mode loop")

            }

            checkRandom()

        }

        function checkRandom() {
        if (playMode) {
            console.log('ada')
        } else {
            console.log('tidak ada')
        }
        }

            if (playMode) {
                iconMode.innerHTML = '<i  class="icon fa-solid fa-shuffle"></i>'
                typePlay = false
            } else {
                iconMode.innerHTML = '<i  class="icon fa-solid fa-rotate-right"></i>'
                typePlay = true
            }
