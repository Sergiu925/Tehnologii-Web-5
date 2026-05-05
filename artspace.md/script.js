// 1. MESAJ LA INTRAREA PE SITE
window.onload = function () {
    console.log("Site-ul a fost încărcat!");
};

// 2. BUTON SCROLL TOP
let btnTop = document.createElement("button");
btnTop.innerHTML = "↑";

btnTop.style.position = "fixed";
btnTop.style.bottom = "20px";
btnTop.style.right = "20px";
btnTop.style.padding = "10px 15px";
btnTop.style.fontSize = "18px";
btnTop.style.display = "none";
btnTop.style.border = "none";
btnTop.style.borderRadius = "8px";
btnTop.style.background = "#0b0ba3";
btnTop.style.color = "white";
btnTop.style.cursor = "pointer";

document.body.appendChild(btnTop);

// apare la scroll
window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 200) {
        btnTop.style.display = "block";
    } else {
        btnTop.style.display = "none";
    }
});

// scroll sus
btnTop.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// 3. TOGGLE INFO
function toggleInfo() {
    let box = document.getElementById("info");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }
}

// 4. SISTEM COMANDĂ (POPUP)
let pret = 0;
let numeProdus = "";

function comanda(nume, p) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("produs-nume").innerText = nume;

    pret = p;
    numeProdus = nume;

    // reset
    document.getElementById("total").innerText = "";
    document.getElementById("cantitate").value = "";
}

function calculeaza() {
    let cant = document.getElementById("cantitate").value;

    if (cant <= 0 || cant === "") {
        alert("Introdu o cantitate validă!");
        return;
    }

    let total = cant * pret;

    document.getElementById("total").innerText =
        "Total: " + total + " lei";
}

function inchide() {
    document.getElementById("popup").style.display = "none";
}

// 5. ANIMAȚIE CARDURI
let cards = document.querySelectorAll(".card");

// setare inițială
cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.5s";
});

// animație la scroll
window.addEventListener("scroll", function () {
    cards.forEach(card => {
        let position = card.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

// 6. GALERIE IMAGINI (ZOOM)
let imagini = document.querySelectorAll("img");

imagini.forEach(img => {
    img.style.cursor = "pointer";

    img.addEventListener("click", function () {
        let popup = document.createElement("div");

        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.background = "rgba(0,0,0,0.8)";
        popup.style.display = "flex";
        popup.style.alignItems = "center";
        popup.style.justifyContent = "center";

        let poza = document.createElement("img");
        poza.src = this.src;
        poza.style.maxWidth = "80%";
        poza.style.borderRadius = "10px";

        popup.appendChild(poza);

        popup.onclick = function () {
            popup.remove();
        };

        document.body.appendChild(popup);
    });
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // oprește reload

    let formData = new FormData(this);

    fetch("contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("raspuns").innerHTML = data;
    })
    .catch(error => {
        document.getElementById("raspuns").innerHTML = "Eroare!";
    });
});