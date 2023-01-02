function a() {
    console.log("clicked...");
    document.querySelector(".articles").scrollIntoView();
}

function scrollTo(id) {
    // document.querySelector(`.${id}`).scrollIntoView();
    console.log("scroll to: ", id);
}

function fillSidebar() {
    const topics = document.getElementsByClassName("topic");
    let topic;

    for (let i = 0; i < topics.length; i++) {
        const element = document.createElement("li");
        topic = topics[i].innerText;

        element.innerText = topic;
        element.onclick = function () {
                document.getElementById(element.innerText).scrollIntoView();
        };
        document.getElementById("toc").appendChild(element);
    }
}

/*
const text = document.getElementById("pls");

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