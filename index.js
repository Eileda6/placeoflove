// Récupération des éléments
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.querySelector(".close");

// Quand on clique sur une vidéo
document.querySelectorAll(".video-card").forEach(card => {
  const video = card.querySelector(".video-thumb");
  const title = card.querySelector(".video-title");

  video.addEventListener("click", () => {
    modal.style.display = "block";
    modalVideo.src = video.src;
    modalTitle.textContent = title.textContent;
    modalVideo.play();
  });
});

// Bouton fermer
closeBtn.onclick = function() {
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.src = "";
  modalTitle.textContent = "";
}

// Fermer si on clique en dehors
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
    modalTitle.textContent = "";
  }
}
