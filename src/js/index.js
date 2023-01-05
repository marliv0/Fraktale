function scrollToArticles() {
    document.querySelector(".articles").scrollIntoView();
}

function fillSidebar() {
    const topics = document.getElementsByClassName("topic");
    for (let i = 1; i < topics.length + 1; i++) {
        const element = document.createElement("li");
        let topic = topics[i].innerText;
        let id = topics[i].id;

        element.innerText = `${topic}`;
        element.style="margin: 10px 0;";
        
        element.onmouseover = function() {
            element.style.cssText += "color: white;background-color:#282828";
        }

        element.onmouseleave = function() {
            element.style.cssText += "color: #818181;background-color:#111111;";
        }

        element.onclick = function () {
            document.getElementById(id).scrollIntoView();
        };
        
        switch (topics[i].nodeName) {
            case "H3":
                element.style = "padding-left: 10px;font-size: 18px; margin: 5px;";
                break;
        }
        document.getElementById("sidebar").appendChild(element);
    }
}

/*
const text = document.getElementById("foo");

const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            text.style = "visibility: visible; animation: fadeIn ease 3s;";
        }
    });
};

// Create the IntersectionObserver
const observer = new IntersectionObserver(callback, {rootMargin: "10000px 0px 10000px 0px"});
observer.observe(text);*/