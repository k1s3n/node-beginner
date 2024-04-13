$(document).ready(function() {
    // Fetch content from content.md
    $.ajax({
        url: 'content.md',
        success: function(data) {
            var sections = data.split('# ');
            sections.forEach(function(section) {
                var lines = section.split('\n');
                if (lines.length > 1) {
                    var sectionId = lines[0].trim().toLowerCase().replace(/ /g, '-');
                    var sectionContent = lines.slice(1).join('\n').trim();
                    $('#' + sectionId).html('<h1>' + lines[0].trim() + '</h1>' + '<p>' + sectionContent + '</p>');
                    sectionContent = sectionContent
                    // Convert italicized text using asterisks to HTML <em> tags
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    // Convert double asterisks to HTML <strong> tags for bold text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                }
            });
        }
    });

    // Hide all sections except the Welcome section
    $('main > section').not('#welcome').hide();

    // Check if there is a stored section ID in local storage
    var lastClickedSectionId = localStorage.getItem('lastClickedSectionId');
    if (lastClickedSectionId) {
        // Show the last clicked section
        $(lastClickedSectionId).show();
    } else {
        // Show the Welcome section by default
        $('#welcome').show();
        
    }

    // Add click event listener to all menu links
    $('.menu-link').click(function(event) {
        event.preventDefault();
    
        // Remove 'active' class from all links with class 'menu-link'
        $('.menu-link').removeClass('active');

        // Add 'active' class to the clicked link
        $(this).addClass('active');
        // Hide all sections
        $('main > section').hide();
        
        // Get the href attribute of the clicked link
        var targetId = $(this).attr('href');
        
        // Show the corresponding section
        $(targetId).show();

        // Store the ID of the clicked section in local storage
        localStorage.setItem('lastClickedSectionId', targetId);
    });
});



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




