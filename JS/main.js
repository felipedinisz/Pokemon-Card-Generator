const btn = document.querySelector("#btn");
const card = document.getElementById("card");
const url = "https://pokeapi.co/api/v2/pokemon/";
const pHeart = document.querySelector(".hp");
const img = document.querySelector("img");
const pokeName = document.querySelector("h2");
const stats = document.querySelector(".stats");
const typesDiv = document.querySelector(".types");
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

let getPokemonData = () => {
  let id = Math.round(Math.random() * 700) + 1;
  const finalUrl = url + id;

  fetch(finalUrl)
  .then(response => response.json())
  .then(data => generateCard(data))
}

const generateCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const colorTheme = typeColor[data.types[0].type.name]
  console.log(colorTheme)

  appendTypes(data.types);
  changeHPImgName(hp, imgSrc, name);
  changeStat(statAttack, statDefense, statSpeed);
  styleCard(colorTheme)
}

const changeHPImgName = (hp, imgSrc, name) => {
  pHeart.innerHTML = `<span>HP</span>
  ${hp}`;

  img.setAttribute("src", imgSrc);
  pokeName.innerHTML = name
}

const changeStat = (Attack, Defense, Speed) => {
  const attack = document.querySelector("#attack");
  const defense = document.querySelector("#defense");
  const speed = document.querySelector("#speed");
  attack.innerHTML = Attack;
  defense.innerHTML = Defense;
  speed.innerHTML = Speed;

}

const appendTypes = (types) => {
  typesDiv.innerHTML = ''
  types.forEach(item => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    typesDiv.appendChild(span);
  });
}

const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
}


btn.addEventListener("click", getPokemonData);
window.addEventListener("load", getPokemonData);
