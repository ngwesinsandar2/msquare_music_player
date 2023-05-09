const playListContainerTag = document.getElementsByClassName("playListContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const durationAndCurrentTimeTag = document.getElementsByClassName("durationAndCurrentTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];


const tracks = [
    {trackId: "music/Bloom Into You Ending  hectopascal.mp3", title: "Bloom Into You - Hectopascal"},
    {trackId: "music/Happy Sugar Life OP ハピシュガアニメ.mp3", title: "Happy Sugar Life OP ハピシュガアニメ"},
    {trackId: "music/majiko  心做し LIVE.mp3", title: "majiko - 心做し"},
    {trackId: "music/millennium parade  U.mp3", title: "millennium parade U"},
    {trackId: "music/Snow ManSecret Touch.mp3", title: "Snow ManSecret Touch"},
    {trackId: "music/Tonikaku Kawaii Opening Song FullKoi no Utaby Yunomi.mp3", title: "Tonikaku Kawaii Opening Song FullKoi no Utaby Yunomi"},
    {trackId: "music/美波カワキヲアメクMV.mp3", title: "美波カワキヲアメクMV"},
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackClass");
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        trackPlay();
    });
    const songTitle = (i + 1).toString() + ". " + tracks[i].title;
    trackTag.append(songTitle);
    playListContainerTag.append(trackTag);
};

let duration = 0;
let durationText = "00:00 / 00:00";
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = updateDurationAndCurrentTime(duration);
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = updateDurationAndCurrentTime(currentTime);
    const plus = currentTimeText + " / " + durationText;
    durationAndCurrentTimeTag.textContent = plus;
    updateCurrentProgress(currentTime);
});

const updateDurationAndCurrentTime = (totalTime) => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    const minText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minText + ":" + secText;
};

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500 / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth + "px";
};

let currentPlayingIndex = 0;
let isPlaying = false;

playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
        const songToPlay = tracks[currentPlayingIndex].trackId;
        audioTag.src = songToPlay;
        audioTag.play();
        updatePlayAndPause();
    } else {
        audioTag.play();
        updatePlayAndPause();
    };
});

pauseButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    audioTag.pause();
    isPlaying = false;
    updatePlayAndPause();
});

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    };
    currentPlayingIndex -= 1;
    trackPlay();
});

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === tracks.length - 1) {
        return;
    };
    currentPlayingIndex += 1;
    trackPlay();
});

const trackPlay = () => {
    const songToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPause();
};

const updatePlayAndPause = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    };
};