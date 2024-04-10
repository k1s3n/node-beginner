$(document).ready(function() {
  var nav = $('.menu-container');
  var main = $('main');
  var navOffset = nav.offset().top;
  var scrollThreshold = 100; // Adjust this value according to your needs

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    // Check if the user has scrolled beyond the threshold
    if (scrollTop > scrollThreshold) {
      // Add the 'fixed' class to make the menu container sticky
      nav.addClass('sticky');
      // Remove top margin when menu container becomes sticky
      nav.css('margin-top', '0');
      var parentWidth = nav.parent().width();
            var navWidth = nav.outerWidth();
            var leftOffset = (parentWidth - navWidth) / 2;
            nav.css('left', leftOffset + 'px');
            
    } else {
      // Remove the 'fixed' class if the user scrolls back above the threshold
      nav.removeClass('sticky');
      // Restore top margin when menu container is not sticky
      nav.css('margin-top', ''); // Reset margin to default
      nav.css('left', '');
    }
  });
});





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



