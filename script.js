const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon => {

    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;


        carousel.scrollLeft += icon.id == "left" ? - firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });

});

const autoSlide = (e) => {
if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

    } 
    return carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;


}

    const dragStart = (e) => {

        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;


    }


    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }

    const dragStop = (e) => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if(!isDragging) return;
        isDragging = false;

        autoSlide();
    }

    const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const images = carousel.querySelectorAll("img");
const span = document.getElementsByClassName("close")[0];

images.forEach(img => {
    img.addEventListener("dblclick", () => {
        modal.style.display = "block"; // Muestra el modal
        modalImg.src = img.src; // Establece la imagen seleccionada en el modal
    });
});

// Cierra el modal cuando se hace clic en la "x"
span.onclick = function() {
  modal.style.display = "none";
}

// Cierra el modal cuando se hace clic fuera de la imagen
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);


    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchend", dragStop);
