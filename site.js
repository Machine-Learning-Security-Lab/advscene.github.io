"use strict";

const choices = [...document.querySelectorAll("[data-demo]")];
const screen = document.querySelector("#demo-screen");
const mediaError = document.querySelector("#media-error");
const demos = window.ADVSCENE_DEMOS;

function selectDemo(id) {
  const demo = demos.find((item) => item.id === id);
  if (!demo) throw new Error(`Unknown AdvScene demonstration: ${id}`);

  const previousVideo = screen.querySelector("video");
  if (previousVideo) {
    previousVideo.pause();
    previousVideo.removeAttribute("src");
    previousVideo.load();
  }

  choices.forEach((choice) => {
    choice.setAttribute("aria-pressed", String(choice.dataset.demo === id));
  });
  document.querySelector("#demo-title").textContent = demo.title;
  document.querySelector("#demo-dataset").textContent = demo.dataset;
  document.querySelector("#demo-description").textContent = demo.description;
  const details = document.querySelector("#demo-details");
  details.textContent = demo.details;
  details.hidden = !demo.details;
  mediaError.hidden = true;
  mediaError.textContent = "";
  screen.replaceChildren();

  if (demo.video) {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", demo.title);
    video.src = demo.video;
    if (demo.poster) video.poster = demo.poster;
    if (demo.captions) {
      const track = document.createElement("track");
      track.kind = "captions";
      track.label = "English";
      track.srclang = "en";
      track.src = demo.captions;
      video.append(track);
    }
    video.addEventListener("error", () => {
      const code = video.error ? video.error.code : "unknown";
      mediaError.textContent = `Video could not load (media error ${code}): ${demo.video}`;
      mediaError.hidden = false;
    });
    screen.append(video);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "media-placeholder";
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("width", "58");
    icon.setAttribute("height", "48");
    icon.setAttribute("viewBox", "0 0 58 48");
    icon.setAttribute("fill", "none");
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = '<rect x="9" y="1" width="48" height="36" rx="5" stroke="currentColor" stroke-width="1.5"/><path d="M48 43H6a5 5 0 0 1-5-5V10" stroke="currentColor" stroke-width="1.5"/><path d="m28 13 12 7-12 7V13Z" stroke="currentColor" stroke-width="1.5"/>';
    const title = document.createElement("p");
    title.textContent = demo.placeholder;
    const explanation = document.createElement("span");
    explanation.textContent = "Video pending selection.";
    placeholder.append(icon, title, explanation);
    screen.append(placeholder);
  }
}

if (!Array.isArray(demos) || demos.length === 0) {
  throw new Error("AdvScene demo configuration is missing or empty: content.js");
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => selectDemo(choice.dataset.demo));
});
selectDemo(demos[0].id);

document.querySelector("#copy-citation").addEventListener("click", async () => {
  const citation = document.querySelector("#bibtex");
  const status = document.querySelector("#copy-status");
  try {
    if (!navigator.clipboard || !window.isSecureContext) {
      throw new Error("Clipboard API requires a secure browser context.");
    }
    await navigator.clipboard.writeText(citation.textContent);
    status.textContent = "Citation copied.";
  } catch (error) {
    status.textContent = `${error.message} Select and copy the BibTeX text manually.`;
  }
});
