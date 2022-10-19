const body = document.body;
const container = document.getElementById("container");
const cards = document.getElementsByTagName("article");

// ===== Scrolling functionality ===============================================

var scrollPos = 0;

// On mouse wheel scroll...
body.addEventListener('wheel', (e) => {
    // Do the scroll handling
    handleMouseScrolling(e);

    // Also do the parallax image effect handling
    handleImageParallax(e);
});

// Handle image parallax effects
function handleImageParallax(e) {
    // Compute the bounds for the parallax effect
    let leftBound = -1 * (maxWidth() - (100 * vw())),
        rightBound = 0,
        boundWidth = rightBound - leftBound;

    // Compute the percentage of the scroll position within the bounds
    let scrollPct = (scrollPos - leftBound) / boundWidth;

    // Map this down to a parallax effect range
    const percentMax = 10;
    const parallaxLeft = percentMax / 100,
        parallaxRight = (-1 * percentMax) / 100,
        parallaxWidth = parallaxRight - parallaxLeft;

    let parallaxAmt = parallaxLeft + (scrollPct * parallaxWidth);

    // Apply the parallax effect to every image
    for (const card of cards) {
        let img = card.getElementsByTagName("img")[0];
        img.style.transform = `translateX(${parallaxAmt * 100}%)`;
    }
}

// Handle mouse scrolling
function handleMouseScrolling(e) {
    // Transform the scroll positioning based on a scale factor
    let scrollFactor = 1;
    let scrollAmt = scrollFactor * e.deltaY;

    // Translate the container by the scroll amount within bounds
    if (scrollPos - scrollAmt >= 0) {
        scrollPos = 0;
    }
    else if (scrollPos - scrollAmt <= (-1 * (maxWidth() - (100 * vw())))) {
        scrollPos = -1 * (maxWidth() - (100 * vw()));
    }
    else {
        scrollPos -= scrollAmt;
    }

    // scrollPos -= scrollAmt;
    container.style.transform = `translateX(${scrollPos}px)`;
}

// ====== Viewport sizing computations =========================================

// Get the full length of the cards on screen
const maxWidth = () => {
    // Compute the sizing of all cards
    let maxW = cardWidth() * cards.length;

    // Add in padding on each side
    maxW += 2 * 5 * vw();

    // Add in gaps between cards
    maxW += (cards.length - 1) * 2 * vw();

    return maxW;
}

// Get the vw and vh unit size in pixels
const vw = () => {
    return (
        Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        )
        / 100 // Divide to get the vw unit size
    );
};
const vh = () => {
    return (
        Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        )
        / 100 // Divide to get the vh unit size
    );
}

// Calculate the card parameters based on the screen size
const cardWidth = () => {
    // Get the value as a string
    let valStr = window.getComputedStyle(cards[0]).width;

    // Remove the "px" from the string and convert to a number
    let valNum = Number(valStr.slice(0, -2));

    return valNum;
}
const cardHeight = () => {
    // Get the value as a string
    let valStr = window.getComputedStyle(cards[0]).height;

    // Remove the "px" from the string and convert to a number
    let valNum = Number(valStr.slice(0, -2));

    return valNum;
}