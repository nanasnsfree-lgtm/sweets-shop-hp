/* ヘッダーのスクロール制御 */
(function () {
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
})();

/* ハンバーガーメニュー */
(function () {
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('.nav');
  var overlay = document.querySelector('.nav-overlay');
  var links = document.querySelectorAll('.nav-list a');

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('active');
    nav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

/* スムーズスクロール */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header').offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();

/* スクロールアニメーション */
(function () {
  var elements = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ヒーロースライダー */
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var current = 0;
  var interval = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.index));
    });
  });

  setInterval(next, interval);
})();
