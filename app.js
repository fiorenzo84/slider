///////////////////////////////////////////// SLIDER (avec image unsplash) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//----------------------------- variables ------------------------------\\
const slide = document.querySelector("#slide");
let searchQuery = "random";
//let pageIndex = 1;
let pageIndex = "random";
const tabImgs = [];
const nextImage = document.querySelector("#suivant");
const prevImage = document.querySelector("#precedent");

//-------------- récupération des images méthode fetch--------------------\\
async function fetchData() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=kS4CPqAkCBjIlnugywdzPHZJrH87lUdk7qRZR7cBvyc`
    );

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    const tabObjImgs = data.results;

    tabObjImgs.forEach((obj) => {
      const allImgs = obj.urls.small;
      tabImgs.push(allImgs);
    });

    slider(1);
    slider(-1);
  } catch (error) {
    errorMsg.textContent = `${error}`;
  }
}
fetchData();

let index = 0;
//-------------- fonction  pour défilement des index images dans le slider  --------------------\\
function slider(direction) {
  index = index + direction;
  // avec condition if
  if (index < 0) index = tabImgs.length - 1;
  if (index > tabImgs.length - 1) index = 0;

  // avec opérateur ternaire
  // index < 0 ? (index = tabImgs.length - 1) : null;
  // index > tabImgs.length - 1 ? (index = 0) : null;

  slide.src = tabImgs[index];
}
