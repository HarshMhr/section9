const Hamm =document.querySelector('.ham');
const Listt =document.querySelector('.list_of_vid');
const Vidmar=document.querySelector(".container");

Hamm.addEventListener('click',()=>{
    Hamm.classList.toggle('active');
    Listt.classList.toggle('active');
    Vidmar.classList.toggle("active");
});

// ------------------------------------------------------

var a=document.querySelectorAll(".zoom ").length;
            var vid_list=["https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/001%20Section%20Overview.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/002%20if%20Statement.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/004%20if%20else%20Statement.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/006%20Nested%20if%20Statements.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/008%20switch-case%20Statement.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/010%20Conditional%20Operator.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/011%20Looping.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/012%20for%20Loop.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/014%20range-based%20for%20Loop.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/016%20while%20Loop.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/018%20do%20while%20Loop.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/020%20continue%20and%20break.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/021%20Infinite%20Loops.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/022%20Nested%20Loops.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/024%20Section%20Challenge.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/025%20Section%20Challenge%20-%20Solution%20Part%201.mp4", "https://archive.org/download/006-nested-if-statements/09%20-%20Controlling%20Program%20Flow/026%20Section%20Challenge%20-%20Solution%20Part%202.mp4"];
for (var i=0; i<a;i++){
    document.querySelectorAll(".zoom")[i].addEventListener("click",
        function (){

            var vidIndex= Array.from(document.querySelectorAll(".zoom")).indexOf(this);
            let source = document.getElementById("videoSource");   
            let video = document.getElementById("myVideo");
            source.src = vid_list[vidIndex];
            video.load();
            
        });
}










// -------------------------------------------------



const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
pipBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));








