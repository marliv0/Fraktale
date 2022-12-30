function getImgURLS(images) {
    let urls = []
    images.map(image => {
        urls.push(image.src.medium)
    })

    return urls;
}

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
const AMOUNT = Math.floor(Math.random() * 80) + 15
const PAGE = Math.floor(Math.random() * 4) + 1

fetch(`https://api.pexels.com/v1/search?query=${KEYWORD}&per_page=${AMOUNT}&page=${PAGE}`, {
        headers: {
            Authorization: "563492ad6f9170000100000102b516d3cf6245c1a66e3a166bd573b3",
            // per_page: 80,
        }
    })
    .then(resp => {
        return resp.json()
    })
    .then(data => {
        console.log(data);
        const urls = getImgURLS(data.photos);
        createImgElements(urls);
    })