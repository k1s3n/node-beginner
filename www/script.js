document.addEventListener("DOMContentLoaded", function() {
    // Hitta linjerna
    var line1 = document.querySelector(".line1");
    var line2 = document.querySelector(".line2");
  
    // Använd en timeout för att starta animationen för linje 2 efter en viss fördröjning
    setTimeout(function() {
      line2.style.animationDelay = "2s"; // Fördröjning för linje 2
      line2.style.animationDuration = "2s"; // Varaktighet för linje 2
    }, 2000); // Vänta 2 sekunder innan linje 2 börjar animera
  });
  

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

