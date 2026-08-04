"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const trackCards =
    document.querySelectorAll(".track-card");

  let activeAudio = null;
  let activeCard = null;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "--:--";
    }

    const totalSeconds =
      Math.max(0, Math.floor(seconds));

    const minutes =
      Math.floor(totalSeconds / 60);

    const remainingSeconds =
      totalSeconds % 60;

    return (
      `${minutes}:` +
      remainingSeconds
        .toString()
        .padStart(2, "0")
    );
  }

  function updateVolumeBackground(slider) {
    const percentage =
      Number(slider.value) * 100;

    slider.style.background =
      `linear-gradient(
        to right,
        #6526c9 0%,
        #6526c9 ${percentage}%,
        rgba(101, 38, 201, 0.13) ${percentage}%,
        rgba(101, 38, 201, 0.13) 100%
      )`;
  }

  function getVolumeIcon(volume, muted) {
    if (muted || volume === 0) {
      return "🔇";
    }

    if (volume < 0.45) {
      return "🔈";
    }

    if (volume < 0.75) {
      return "🔉";
    }

    return "🔊";
  }

  function setPausedAppearance(card) {
    const icon =
      card.querySelector(".play-icon");

    const button =
      card.querySelector(".play-button");

    const title =
      card.querySelector("h3")
        ?.textContent
        ?.trim() || "track";

    card.classList.remove("is-playing");

    if (icon) {
      icon.textContent = "▶";
    }

    if (button) {
      button.setAttribute(
        "aria-label",
        `Play ${title}`
      );
    }
  }

  function setPlayingAppearance(card) {
    const icon =
      card.querySelector(".play-icon");

    const button =
      card.querySelector(".play-button");

    const title =
      card.querySelector("h3")
        ?.textContent
        ?.trim() || "track";

    card.classList.add("is-playing");

    if (icon) {
      icon.textContent = "❚❚";
    }

    if (button) {
      button.setAttribute(
        "aria-label",
        `Pause ${title}`
      );
    }
  }

  function pauseActiveTrack() {
    if (!activeAudio || !activeCard) {
      return;
    }

    activeAudio.pause();
    setPausedAppearance(activeCard);

    activeAudio = null;
    activeCard = null;
  }

  trackCards.forEach((card) => {
    const audio =
      card.querySelector(".track-audio");

    const playButton =
      card.querySelector(".play-button");

    const progressBar =
      card.querySelector(".progress-bar");

    const progressFill =
      card.querySelector(".progress-fill");

    const progressHandle =
      card.querySelector(".progress-handle");

    const progressBuffer =
      card.querySelector(".progress-buffer");

    const currentTimeText =
      card.querySelector(".current-time");

    const durationText =
      card.querySelector(".duration");

    const volumeSlider =
      card.querySelector(".volume-slider");

    const volumeValue =
      card.querySelector(".volume-value");

    const muteButton =
      card.querySelector(".mute-button");

    const volumeIcon =
      card.querySelector(".volume-icon");

    const coverImage =
      card.querySelector(".album-cover img");

    if (
      !audio ||
      !playButton ||
      !progressBar ||
      !progressFill ||
      !progressHandle ||
      !currentTimeText ||
      !durationText ||
      !volumeSlider ||
      !volumeValue ||
      !muteButton ||
      !volumeIcon
    ) {
      console.error(
        "A track card is missing player elements.",
        card
      );

      return;
    }

    let previousVolume =
      Number(volumeSlider.value) || 0.8;

    audio.volume = previousVolume;

    updateVolumeBackground(volumeSlider);

    audio.addEventListener(
      "contextmenu",
      (event) => {
        event.preventDefault();
      }
    );

    if (coverImage) {
      coverImage.addEventListener(
        "error",
        () => {
          coverImage.remove();
        }
      );

      coverImage.addEventListener(
        "contextmenu",
        (event) => {
          event.preventDefault();
        }
      );
    }

    audio.addEventListener(
      "loadedmetadata",
      () => {
        durationText.textContent =
          formatTime(audio.duration);
      }
    );

    audio.addEventListener(
      "progress",
      () => {
        if (
          !progressBuffer ||
          !audio.duration ||
          audio.buffered.length === 0
        ) {
          return;
        }

        const bufferedEnd =
          audio.buffered.end(
            audio.buffered.length - 1
          );

        const bufferedPercentage =
          (
            bufferedEnd /
            audio.duration
          ) * 100;

        progressBuffer.style.width =
          `${Math.min(100, bufferedPercentage)}%`;
      }
    );

    audio.addEventListener(
      "timeupdate",
      () => {
        const percentage =
          audio.duration > 0
            ? (
                audio.currentTime /
                audio.duration
              ) * 100
            : 0;

        progressFill.style.width =
          `${percentage}%`;

        progressHandle.style.left =
          `${percentage}%`;

        progressBar.setAttribute(
          "aria-valuenow",
          String(Math.round(percentage))
        );

        currentTimeText.textContent =
          formatTime(audio.currentTime);
      }
    );

    audio.addEventListener(
      "ended",
      () => {
        audio.currentTime = 0;

        progressFill.style.width = "0%";
        progressHandle.style.left = "0%";

        currentTimeText.textContent = "0:00";

        setPausedAppearance(card);

        if (activeAudio === audio) {
          activeAudio = null;
          activeCard = null;
        }
      }
    );

    audio.addEventListener(
      "error",
      () => {
        setPausedAppearance(card);

        playButton.disabled = true;

        playButton.setAttribute(
          "aria-label",
          "Audio file unavailable"
        );

        console.error(
          "The audio file could not be loaded:",
          audio.currentSrc
        );
      }
    );

    playButton.addEventListener(
      "click",
      async () => {
        if (!audio.paused) {
          audio.pause();

          setPausedAppearance(card);

          activeAudio = null;
          activeCard = null;

          return;
        }

        if (
          activeAudio &&
          activeAudio !== audio
        ) {
          pauseActiveTrack();
        }

        try {
          await audio.play();

          activeAudio = audio;
          activeCard = card;

          setPlayingAppearance(card);
        } catch (error) {
          console.error(
            "Audio playback failed:",
            error
          );
        }
      }
    );

    volumeSlider.addEventListener(
      "input",
      () => {
        const volume =
          Number(volumeSlider.value);

        audio.volume = volume;
        audio.muted = volume === 0;

        if (volume > 0) {
          previousVolume = volume;
        }

        volumeValue.textContent =
          `${Math.round(volume * 100)}%`;

        volumeIcon.textContent =
          getVolumeIcon(
            volume,
            audio.muted
          );

        updateVolumeBackground(
          volumeSlider
        );
      }
    );

    muteButton.addEventListener(
      "click",
      () => {
        if (
          audio.muted ||
          audio.volume === 0
        ) {
          audio.muted = false;

          const restoredVolume =
            previousVolume > 0
              ? previousVolume
              : 0.8;

          audio.volume = restoredVolume;
          volumeSlider.value =
            String(restoredVolume);
        } else {
          previousVolume =
            audio.volume;

          audio.muted = true;
          volumeSlider.value = "0";
        }

        const visibleVolume =
          audio.muted
            ? 0
            : audio.volume;

        volumeValue.textContent =
          `${Math.round(
            visibleVolume * 100
          )}%`;

        volumeIcon.textContent =
          getVolumeIcon(
            audio.volume,
            audio.muted
          );

        updateVolumeBackground(
          volumeSlider
        );

        const title =
          card.querySelector("h3")
            ?.textContent
            ?.trim() || "track";

        muteButton.setAttribute(
          "aria-label",
          audio.muted
            ? `Unmute ${title}`
            : `Mute ${title}`
        );
      }
    );

    function seekToPercentage(percentage) {
      if (!Number.isFinite(audio.duration)) {
        return;
      }

      const safePercentage =
        Math.min(
          100,
          Math.max(0, percentage)
        );

      audio.currentTime =
        (
          safePercentage /
          100
        ) * audio.duration;
    }

    progressBar.addEventListener(
      "click",
      (event) => {
        const bounds =
          progressBar.getBoundingClientRect();

        const percentage =
          (
            (
              event.clientX -
              bounds.left
            ) /
            bounds.width
          ) * 100;

        seekToPercentage(percentage);
      }
    );

    progressBar.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key !== "ArrowLeft" &&
          event.key !== "ArrowRight"
        ) {
          return;
        }

        event.preventDefault();

        const adjustment =
          event.key === "ArrowRight"
            ? 5
            : -5;

        const currentPercentage =
          audio.duration > 0
            ? (
                audio.currentTime /
                audio.duration
              ) * 100
            : 0;

        seekToPercentage(
          currentPercentage + adjustment
        );
      }
    );
  });
});