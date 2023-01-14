/**
 * Funktionalität zur zufälligen Bildgenerierung mithilfe von Pexels-API.
 * 
 * 2023 Marko Livajusic (marko_livajusic0 <at> protonmail.com) 
 */

/**
 * Funktion, welche die URLs durchgeht und in einem Array speichert.
 * 
 * @param {*} images 
 * @returns Array von URLs (der Bilder).
 */
function getImgURLS(images) {
    let urls = []
    images.map(image => {
        urls.push(image.src.medium)
    })

    return urls;
}

/**
 * Erstellt die Bilder (img) in HTML und fügt sie in das Body ein.
 *  
 * @param {*} urls Array von URLs der Bilder. 
 */
function createImgElements(urls) {
    let image;
    for (let i = 0; i < urls.length; i++) {
        image = document.createElement("img");
        image.src = urls[i];
        image.style = "margin-top:2%;";
        document.body.appendChild(image);
    }

    image.style = "";
}

const KEYWORD = "fractal";

/*
 * Anzahl der Bilder pro Seite sowie die Seitennummer,
 * von der die Bilder gezogen werden, sollen einigermaßen zufällig sein.
*/ 
const AMOUNT = Math.floor(Math.random() * 35) + 10
const PAGE = Math.floor(Math.random() * 4) + 1

fetch(`https://api.pexels.com/v1/search?query=${KEYWORD}&per_page=${AMOUNT}&page=${PAGE}`, {
        headers: {
            // API-Schlüssel. Sollte lieber nicht öffentlich sein!
            Authorization: "563492ad6f9170000100000102b516d3cf6245c1a66e3a166bd573b3",
        }
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        const urls = getImgURLS(data.photos);
        if (urls.length != 0) {
            createImgElements(urls);
        }
    })