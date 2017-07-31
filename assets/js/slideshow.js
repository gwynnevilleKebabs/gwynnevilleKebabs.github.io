var slideIndex = 0;
var timer = setInterval(increment, 4500);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function increment(){
  showDivs(slideIndex += 1);
}

function showDivs(n) {
  var slides = document.getElementsByClassName("slideshow-slide");

  if (n > slides.length-1){
    slideIndex = 0;
  }else if (n < 0){
    slideIndex = slides.length-1;
  }


  for (var i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }

  slides[slideIndex].style.display = "block";  
}