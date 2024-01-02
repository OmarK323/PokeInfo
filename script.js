const result = document.querySelectorAll(".result");
document.addEventListener('DOMContentLoaded', load());

const typeColors = {
    Normal: "#A8A878",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Grass: "#78C850",
    Ice: "#98D8D8",
    Fighting: "#C03028",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Flying: "#A890F0",
    Psychic: "#F85888",
    Bug: "#A8B820",
    Rock: "#B8A038",
    Ghost: "#705898",
    Dragon: "#7038F8",
    Dark: "#705848",
    Steel: "#B8B8D0",
    Fairy: "#EE99AC"
  };
  

function fetchtype() {
    const pokename = document.getElementById('pokemon_name').value.toLowerCase();
    const type_1 = document.getElementById('type');
    const type_2= document.getElementById('type2')
    const spriteimg = document.getElementById('sprite');
    const name = document.getElementById('name');


    const stats = {
        hp: document.getElementById("hp"),
        attack: document.getElementById("attack"),
        defense: document.getElementById("defense"),
        spAttack: document.getElementById("spattack"),
        spDefense: document.getElementById("spdefense"),
        speed: document.getElementById("speed")
    };

    const total = document.getElementById("stat_ttl");

    const stats_overlay = {
        HP: document.getElementById("hp_ol"),
        ATK: document.getElementById("attack_ol"),
        DEF: document.getElementById("defense_ol"),
        SP_ATK: document.getElementById("spattack_ol"),
        SP_DEF: document.getElementById("spdefense_ol"),
        SPD: document.getElementById("speed_ol"),
        TTL: document.getElementById("stat_ttl_ol")
     };



    fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
        .then(response => {
            if (!response.ok){
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {

        let type1 = capitalize(data.types[0].type.name);
        let type2 = data.types[1] ? data.types[1].type.name : ''; //blank if none
        type2 = capitalize(type2);
    

        const spriteurl = data.sprites.front_default;

        spriteimg.src = spriteurl;
        spriteimg.style.border = "2px solid black";
        result.forEach(result => {
            result.style.border = "2px solid black";
        });

        type_1.textContent = ` ${type1} `;

        if (type2 == ''){
            type_2.style.border = "none";
            type_2.textContent = "";
            type_1.classList.remove("stats")

        }
        else {
            type_1.classList.add("stats");
            type_2.textContent = `${type2}`;
        }

        name.textContent = capitalize(data.name);

        let color = typeColors[type1];
        spriteimg.style.backgroundColor = color;
        let i = 0;
        let sum = 0;
        for (const key in stats) {
            if (stats.hasOwnProperty(key)){
                const elem = stats[key];
                elem.textContent = data.stats[i].base_stat;
                sum += parseInt(elem.textContent);
                i++;
                elem.style.border = "2px solid black";
            }
        }

        let v = 0;
        for (const key in stats_overlay) {
            if (stats_overlay.hasOwnProperty(key)){
                const elem = stats_overlay[key];
                v++;
                elem.style.border = "2px solid black";
            }
        }
        total.textContent = sum.toString(); 
        total.style.border = "2px solid black";

        stats_overlay.HP.textContent = "HP";
        stats_overlay.ATK.textContent = "ATK";
        stats_overlay.DEF.textContent = "DEF";
        stats_overlay.SP_ATK.textContent = "SP_ATK";
        stats_overlay.SP_DEF.textContent = "SP_DEF";
        stats_overlay.SPD.textContent = "SPD";
        stats_overlay.TTL.textContent = "Total";

    })
    .catch(error => {
        console.error('Fetching Error', error.message);
        type.textContent = 'Couldn\'t find that Pokemon';
        spriteimg.src = '';
        spriteimg.style.border = "none";
        spriteimg.style.backgroundColor = "transparent";
        name.textContent = '';
        result.forEach(result => {
            result.style.border = "none";
        });
        let j = 0 
        for (const key in stats) {
            if (stats.hasOwnProperty(key)){
                const elem = stats[key];
                elem.textContent = "";
                j++;
                elem.style.border = "none";
            }
        }    
        total.textContent = "";
        total.style.border = "none";
        
        stats_overlay.HP.textContent = "";
        stats_overlay.ATK.textContent = "";
        stats_overlay.DEF.textContent = "";
        stats_overlay.SP_ATK.textContent = "";
        stats_overlay.SP_DEF.textContent = "";
        stats_overlay.SPD.textContent = "";
        stats_overlay.TTL.textContent = "";
        let z = 0;
        for (const key in stats_overlay) {
            if (stats_overlay.hasOwnProperty(key)){
                const elem = stats_overlay[key];
                z++;
                elem.style.border = "none";
            }
        }
});
}

function load() {

    const fetcher = document.getElementById('fetch');
    fetcher.addEventListener('click', fetchtype);

}


function capitalize(word) {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
}

