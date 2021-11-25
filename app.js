//  :::::::::::::::::::::::::::::::: DOM ::::::::::::::::::::::::::::::
// const touches =[...document.querySelectorAll('.button')];
// const listekeycode = touches.map(touche => touche.dataset.key); 
// const ecran = document.querySelector('.ecran');

// document.addEventListener('keydown', (e) =>{
//     const valeur = e.keyCode.toString();
//     calculer(valeur)

// })

// document.addEventListener('click', (e) =>{
//     const valeur = e.target.dataset.key;
//     calculer(valeur)

// })

// const calculer = (valeur) => {
//     if (listekeycode.includes(valeur)){
//         switch(valeur){
//             case '8':
//                 ecran.textContent ="";
//                 break;
//             case '13':
//                 const calcul = eval(ecran.textContent);
//                 ecran.textContent = calcul;
//                 break;
//             default:
//             const indexkeycode = listekeycode.indexOf(valeur);
//             const touche = touches[indexkeycode];
//             ecran.textContent += touche.innerHTML;
//         }
//     }
// }

// window.addEventListener('error', (e) => {
//     alert('Ach katkharbe9 ??')
// })




const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");


let precedent = 0;
let affichage = "";
let operation = null;
// let memoire; // On initialise la mémoire

window.onload = () => {
    let touches = document.querySelectorAll("button"); // On écoute les clics sur les touches
    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }
    document.addEventListener("keydown", gererTouches); // les touches du clavier
    
    // Récupération de la mémoire depuis le stockage local
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireElt.style.display = "initial";
}

function gererTouches(event){
    let touche;

    //liste les touches autorisées
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];

    // vérification de l'évènement "keydown"
    if(event.type === "keydown"){
        if(listeTouches.includes(event.key)){ // comparer la touche appuyée aux touches autorisées
            event.preventDefault();
            touche = event.key; // stocker la touche choisie dans la variable touche
        }
    }else{
        touche = this.innerText;
    }

    if(parseFloat(touche) >= 0 || touche === "."){
        // A vérifier, pas plusieurs . dans la chaîne
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString(); // met à jour la valeur d'affichage et on affiche sur l'écran
        ecranElt.innerText = affichage;
    }else{
        switch(touche){
            // Touche C remove all
            case "C":
            case "Escape":
                precedent = 0;
                affichage = "";
                operation = null
                ecranElt.innerText = 0;
                break;
            // Calculs
            case "+":
            case "-":
            case "*":
            case "/":
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                // met à jour l'écran
                ecranElt.innerText = precedent;
                // stocker l'opération
                operation = touche;
                // réinitialise la variable d'affichage
                affichage = "";
                break;
            case "=":
            case "Enter":
                //calculer la valeur résultat de l'étape précédente
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                // met à jour l'écran
                ecranElt.innerText = precedent;
                //stocker le résultat dans la variable d'affichage
                affichage = precedent;
                //réinitialise précédent
                precedent = 0;
                break;
        }
    }
}

/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns number
 */
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}