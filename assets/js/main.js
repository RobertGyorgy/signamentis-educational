// ========================================
// Cards Slider Navigation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const cardsGrids = document.querySelectorAll('.cards-grid--slider');
  
  cardsGrids.forEach(function(grid) {
    const wrapper = grid.closest('.cards-grid-wrapper');
    if (!wrapper) return;
    
    const prevBtn = wrapper.querySelector('.cards-nav-btn--prev');
    const nextBtn = wrapper.querySelector('.cards-nav-btn--next');
    const cards = grid.querySelectorAll('.card');
    
    if (!prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function updateButtons() {
      if (currentIndex === 0) {
        prevBtn.classList.add('cards-nav-btn--disabled');
      } else {
        prevBtn.classList.remove('cards-nav-btn--disabled');
      }
      
      if (currentIndex >= totalCards - 1) {
        nextBtn.classList.add('cards-nav-btn--disabled');
      } else {
        nextBtn.classList.remove('cards-nav-btn--disabled');
      }
    }
    
    function goToCard(index) {
      if (index < 0 || index >= totalCards) return;
      currentIndex = index;
      
      // Slide by container width to ensure exact one-card steps
      const containerWidth = grid.clientWidth;
      const scrollPosition = index * containerWidth;
      
      // Programmatic slide without enabling manual scroll
      grid.scrollLeft = scrollPosition;
      if (grid.scrollTo) {
        grid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
      
      updateButtons();
    }
    
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (currentIndex > 0) {
        goToCard(currentIndex - 1);
      }
    });
    
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (currentIndex < totalCards - 1) {
        goToCard(currentIndex + 1);
      }
    });
    
    // Prevent touch-based horizontal scroll (we only allow button navigation)
    grid.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
    grid.addEventListener('wheel', function(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Initialize
    updateButtons();
  });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        return;
      }
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ========================================
// Highlight Active Nav Link
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav__menu-item');
  
  navItems.forEach(item => {
    const link = item.querySelector('.nav__link');
    if (!link) return;
    
    const linkPath = link.getAttribute('href');
    
    // Remove hash from linkPath for comparison
    const cleanLinkPath = linkPath.split('#')[0];
    const cleanCurrentPath = currentPath.split('#')[0];
    
    // Match exact path or index.html
    if (cleanLinkPath === cleanCurrentPath || 
        (cleanCurrentPath === '/' && cleanLinkPath === 'index.html') ||
        (cleanCurrentPath.endsWith('/') && cleanLinkPath === 'index.html') ||
        (cleanCurrentPath.endsWith('/index.html') && cleanLinkPath === 'index.html')) {
      item.classList.add('nav__menu-item--active');
    }
  });
});

// ========================================
// Lesson Navigation (for future expansion)
// ========================================
// This function can be expanded later to handle lesson navigation
function navigateLesson(direction) {
  // Placeholder for future lesson navigation logic
  console.log('Navigate lesson:', direction);
}

