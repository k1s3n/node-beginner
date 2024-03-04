document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("a.active");
  
    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        if (link.classList.contains("active")) {
          event.preventDefault(); // Förhindra standardbeteendet för länken (att följa länken) om den redan är aktiv
          console.log('försökt att trycka på knappen');
        } else {
          // Ta bort eventuell tidigare markerad länk
          document.querySelector(".menu-container a.active").classList.remove("active");
          
          // Markera den klickade länken
          link.classList.add("active");
        }
      });
    });
  });

