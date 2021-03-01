const form = document.querySelector(".city-form form");
const input = document.querySelector(".city-form input");

let viewBox = "";
let svg = "";

form.addEventListener("submit", fetchViewBox);

async function fetchViewBox(e) {
  e.preventDefault();
  const inputValue = input.value;

  await fetch(`/getViewBox/${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      viewBox = data[0]["getviewbox"];
    });

  fetchSvg(inputValue);
}

async function fetchSvg(inputValue) {
  await fetch(`/getSvg/${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      svg = data[0]["st_assvg"];
    });

    mountSvg();
}

function mountSvg() {
  const svgTag = document.querySelector(".show-svg svg");
  const pathTag = document.querySelector(".show-svg path");

  svgTag.setAttribute('viewBox', viewBox);
  pathTag.setAttribute('d', svg);
}
