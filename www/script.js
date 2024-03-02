document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("header a");
  
    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        if (link.classList.contains("active")) {
          event.preventDefault(); // Förhindra standardbeteendet för länken (att följa länken) om den redan är aktiv
          console.log('försökt att trycka på knappen');
        } else {
          // Ta bort eventuell tidigare markerad länk
          document.querySelector("header a.active").classList.remove("active");
          
          // Markera den klickade länken
          link.classList.add("active");
        }
      });
    });
  });