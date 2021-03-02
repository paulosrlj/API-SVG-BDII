const form = document.querySelector(".city-form form");
const input = document.querySelector(".city-form input");

let viewBox = "";
let svg = "";
let population = 0;

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
    .then(async (data) => {
      svg = [data[0]["estado"], data[0]["nome"], data[0]["area"], data[0]["st_assvg"]];
      await fetchPopulation(data[0]["codigo"]);
    });
}

async function fetchPopulation(cod_city) {
  await fetch(`/getPopulation/${cod_city}`)
  .then(res => res.json())
  .then(data => {
    population = data.pop()["populacao"];
  })

  mountSvg();
}

function mountSvg() {
  const svgTag = document.querySelector(".show-svg svg");
  const pathTag = document.querySelector(".show-svg path");

  const tr1 = document.querySelector('.first');
  const tr2 = document.querySelector('.sec');
  const tr3 = document.querySelector('.terc');
  const tr4 = document.querySelector('.four');

  tr1.innerHTML = svg[0];
  tr2.innerHTML = svg[1];
  tr3.innerHTML = population;
  tr4.innerHTML = svg[2];

  svgTag.setAttribute('viewBox', viewBox);
  pathTag.setAttribute('d', svg[3]);
}
