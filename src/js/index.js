function a() {
    console.log("clicked...");
    // document.querySelector(".introduction").scrollIntoView();
}

function fillSidebar() {
    const topics = document.getElementsByClassName("topic");
    // let topic;

    for (let i = 0; i < topics.length; i++) {
        const element = document.createElement("li");
        element.innerText = topics[i].innerText;
        // element.onclick = document.querySelector()
        document.getElementById("toc").appendChild(element);
    }
}

/*
console.log("pain...");
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