function scrollToArticles() {
    document.querySelector(".articles").scrollIntoView();
}

function fillSidebar() {
    const topics = document.getElementsByClassName("topic");
    let topic;

    for (let i = 1; i < topics.length + 1; i++) {
        const element = document.createElement("li");
        topic = topics[i].innerText;


        element.innerText = `${i}. ${topic}`;
        element.onclick = function () {
            document.getElementById(element.innerText).scrollIntoView();
        };

        switch (topics[i].nodeName) {
            /*
            case "H1":
                element.style = "font-size: 24px;";
                break;
            case "H2":
                element.style = "font-size: 22px;";
                break;
                */
            case "H3":
                element.style = "padding-left: 25px;font-size: 18px;";
                element.innerText = `${topic}`;
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