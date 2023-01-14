/**
 * Funktion fürs Scrollen bis zum div "articles"
 */
function scrollToArticles() {
    document.querySelector(".articles").scrollIntoView();
}

/**
 * Funktion für das automatische Ausfüllen der Seitenleiste beim Laden der Webseite.
 * Spricht alle HTML Elemente an, die den Klassennamen "topic" haben,
 * läuft durch diese Elemente durch und erstellt ein neues "li" Element.
 * 
 * Das Ganze soll als eine Inhaltsangabe funktionieren, 
 * da beim Klick des li-Elements zur jeweiligen Textstelle gescrollt wird. 
 */
function fillSidebar() {
    const topics = document.getElementsByClassName("topic");
    for (let i = 0; i < topics.length; i++) {
        const element = document.createElement("li");
        let topic = topics[i].innerText;
        let id = topics[i].id;

        element.innerText = `${topic}`;
        element.style = "margin: 10px 0;";

        element.onmouseover = function () {
            element.style.cssText += "color: white; background-color: #282828";
        }

        element.onmouseleave = function () {
            element.style.cssText += "color: #818181; background-color: #111111;";
        }

        element.onclick = function () {
            document.getElementById(id).scrollIntoView();
        };

        switch (topics[i].nodeName) {
            case "H2":
                element.style = "padding-left: 5px; font-size: 24px;"
                break;
            case "H3":
                element.style = "padding-left: 10px;font-size: 18px; margin: 5px;";
                break;
        }
        document.getElementById("sidebar").appendChild(element);
    }
}


const callback = (entries) => {
    entries.forEach(
        (entry) => {
            if (entry.isIntersecting) {
                entry.target.style.cssText += "animation: fadeIn 2s;";
            } else {
                entry.target.style.animation = "none";
            }
        }
    );

}

let observer = new IntersectionObserver(callback);
let elements = [document.getElementById("introduction"), document.getElementById("articles")];

for (let i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
}