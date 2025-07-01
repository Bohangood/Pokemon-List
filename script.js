const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let offset = 0;
const limit = 10;

const section = document.querySelector("#section");
const btn = document.querySelector("#next");
const sentinel = document.querySelector("#sentinel")
const loading = document.querySelector("#loader");
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const loadData = async() => {
    try {
        loading.classList.remove("hidden");

        const responce = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
        if (!responce.ok){
            throw new Error ("Chyba v HTTP" + responce.status)
        }

        const data = await responce.json();
        // console.log(data.results)

        const pokemons = data.results;

            // openModal
        const modal = document.querySelector("#modal");
        const modalClose = document.querySelector(".close-modal");
        const modalBody = document.querySelector("#modal-body");

        modalClose.addEventListener("click", () => {
            modal.classList.add("hidden");
        });

        for (const pokemon of pokemons) {
            const detailRes = await fetch(pokemon.url);
            const detailData = await detailRes.json();
            // console.log(detailData);
        
            const div = document.createElement("div");
            div.classList.add("card");
    
            

            // <button class="btn" id="btn-">More info</button>;
            div.innerHTML = `
            <h2>${capitalize(detailData.name)}</h2>
            <img class="foto" src="${detailData.sprites.front_default}" alt="${detailData.name}">
            <div class="secDetail hidden"></div>
            `

            section.append(div);

                        // Create modal open and modal close

                    // console.log(modalOpen);
                    const modalOpen = div.querySelector(".foto");
                    modalOpen.addEventListener("click",() =>{
                        const type = detailData.types.map(t => t.type.name).join(", ");
                        const abilities = detailData.abilities.map(a => a.ability.name).join(", ");

                        modalBody.innerHTML = `
                            <h2>${detailData.name}</h2>
                            <img src="${detailData.sprites.front_default}" alt="${detailData.name}">
                            <p><strong>Type:</strong> ${type}</p>
                            <p><strong>Abilities:</strong> ${abilities}</p>
                            <p><strong>Weight:</strong> ${detailData.weight}</p>
                            <p><strong>Height:</strong> ${detailData.height}</p>
                            `;
                            modal.classList.remove("hidden");
                        });
                    

            // const infoBtn = document.querySelector(".btn");

            // infoBtn.addEventListener("click",() => {
            //     const divDetail = div.querySelector(".secDetail");

            //     if (!divDetail.classList.contains("hidden")){
            //         divDetail.classList.add("hidden");
            //         btnMore.textContent = "More info";
            //     } else{

                    
            //         const type = detailData.types.map(t => t.type.name).join(", ");
            //         const abilites = detailData.abilites.map(a => a.type.name).join(", ");
                
            //         divDetail.innerHTML = `
            //         <p>Type: ${type}</p>
            //         <p>Skill: ${abilites}</p>
            //         <p>Weigth${detailData.weigth}</p>
            //         <p>Height: ${detailData.height}</p>
            //         `;

            //         divDetail.classList.remove("hidden");
            //         btnMore.textContent = "Men info";

            //     }
            // })
        }

    } catch (error) {
        console.error(error)
    } finally {
        loading.classList.add("hidden");
      }
}

btn.addEventListener("click", () => {
    offset += limit;
    loadData()
})



// const observer = new IntersectionObserver((entries) => {
//     console.log(entries);

//     entries.forEach(entry => {
//         if (entry.isIntersecting){
//             offset += limit;
//             loadData()
//         }
//     });
// }, {
//     rootMargin: "200px"
// })

// observer.observe(sentinel);


loadData();

