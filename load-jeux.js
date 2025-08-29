fetch("liens.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("links-container");
    data.forEach(item => {
      const titre = item.titre || item.nom || "Jeu sans nom";
      const description = item.description || "Pas de description disponible";
      
      const card = document.createElement("div");
      card.classList.add("link-card");
      card.innerHTML = `
        <h2>${titre}</h2>
        <p>${description}</p>
        <a href="${item.url}" target="_blank">👉 Jouer</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Erreur de chargement des liens :", err));
