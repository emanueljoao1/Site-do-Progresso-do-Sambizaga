(() => {
    const section = document.querySelector(".mantos-section");

    if (!section) return;

    const track = section.querySelector(".mantos-track");
    const cards = [...section.querySelectorAll(".manto-card")];
    const prev = section.querySelector(".manto-arrow.prev");
    const next = section.querySelector(".manto-arrow.next");
    const dotsContainer = section.querySelector(".mantos-dots");
    const tabs = [...section.querySelectorAll(".manto-tab")];

    let index = 0;

    function visibleCards() {
        if (window.innerWidth <= 650) return 1;
        if (window.innerWidth <= 1000) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCards());
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement("button");
            dot.className = "mantos-dot";
            dot.setAttribute("aria-label", `Ir para grupo ${i + 1}`);

            dot.addEventListener("click", () => {
                index = i;
                update();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function update() {
        index = Math.min(index, maxIndex());

        const card = cards[0];
        if (!card) return;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const distance = card.getBoundingClientRect().width + gap;

        track.style.transform = `translateX(-${index * distance}px)`;

        const dots = [...dotsContainer.children];

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        prev.disabled = index === 0;
        next.disabled = index === maxIndex();
    }

    prev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    next.addEventListener("click", () => {
        if (index < maxIndex()) {
            index++;
            update();
        }
    });

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            // Reinicia a posição ao selecionar uma aba.
            index = 0;
            update();
        });
    });

    window.addEventListener("resize", () => {
        createDots();
        update();
    });

    createDots();
    update();
})();




const track = document.getElementById('logosTrack');

if (track && !track.dataset.cloned) {
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = 'true';
}