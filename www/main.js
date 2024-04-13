import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// Wrap document.querySelector in a function so we can call it using $
const $ = cssSelector => document.querySelector(cssSelector);

// Remove diacritics (åäö etc) and kebab case a string
const kebabCase = str => str
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replaceAll(' ', '-')
  .toLowerCase();

// Read content from the markdown file content.md 
// and convert it from markdown to HTML
// and split it into parts - one per h1
const content =
  marked(await (await fetch('content.md')).text())
    .split('<h1>').slice(1).map(part => '<h1>' + part);

// Extract the h1 content as menu items
const menuItems = content.map(x => x.slice(4).split('<')[0]);

// Add initial html for the site
$('body').innerHTML = /*html*/`
<div class="background">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
 </div>
<nav class="menu-container animate__animated animate__fadeInDown">
    <input type="checkbox" aria-label="toggle-menu" />
    <span></span>
    <span></span>
    <span></span>

    <!--Logo-->
    <a href="/index.html" class="menu-logo">
        <img src="https://as1.ftcdn.net/v2/jpg/03/43/04/64/1000_F_343046455_nssjR54iEOnyG1O7Zsi4OhrV317b7fLk.jpg" alt="TEST"/>
      </a>
    
    <!-- menmenu items -->
    <div class="menu">
      <ul>
        
        ${menuItems.map((item, index) => /*html*/`
        <li>
        <a href="/${index === 0 ? '' : kebabCase(item)}">${item}</a>
        </li>
      `).join('')}
      </ul>
      <ul>
        <li>
          <a href="/signup.html">
            Sign-up
          </a>
        </li>
        <li>
          <a href="/login.html">
            Login
          </a>
        </li>
      </ul>
    </div>
  </nav>

<main class="glass-box animate__animated animate__fadeInUp">
<article></article>
</main>
`;

// When we click somewhere - check if the click
// sis on an a tag with an internal link
$('body').addEventListener('click', e => {
  // Check that we have clicked an a tag
  let aTag = e.target.closest('a');
  if (!aTag) { return; }
  // Check that the link is internal (starts with '/')
  let href = aTag.getAttribute('href');
  if (href[0] === '/') { return; }
  if (href.startsWith('#')) {
    // Scroll to the corresponding section
    e.preventDefault();
    let targetId = href.substring(1); // Remove the '#' from the href
    let targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (!href.startsWith('http://') || href.startsWith('https://')) {
    // Öppna länken i en ny flik
    window.open(href, '_blank');
    e.preventDefault();
  }
  // Prevent the default behavior on click on an a tag 
  // (which is a hard page reload)
  e.preventDefault();
  // Instead change the url without reload
  history.pushState(null, '', href);
  showView();
});

// Show a view/"page"
function showView() {
  let route = location.pathname;
  // Find the corresponding menuItem index number to the href
  let index = menuItems.findIndex(x => '/' + kebabCase(x) === route);
  // If not found set the index to 0 (the first item)
  index = index < 0 ? 0 : index;
  // Get the content part corresponding to the menuItem
  let contentPart = content[index];
  // Replace the content in the main element
  $('main article').innerHTML = contentPart;
  // Add the css class active to the correct a tag in nav
  let navTags = [...document.querySelectorAll('nav a')];
  navTags.forEach(element => element.classList.remove('active'));
  navTags[index+1].classList.add('active');
}

// Listen to the back/forward buttons - change view based on url
window.addEventListener('popstate', () => showView());

// Show the first view after hard page load/reload
showView();


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