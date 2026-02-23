(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Testimonials slider
  var testimonials = document.querySelectorAll('.testimonial');
  var prevBtn = document.querySelector('.testimonial-prev');
  var nextBtn = document.querySelector('.testimonial-next');
  var current = 0;

  function showTestimonial(index) {
    if (testimonials.length === 0) return;
    current = (index + testimonials.length) % testimonials.length;
    testimonials.forEach(function (t, i) {
      t.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      showTestimonial(current - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      showTestimonial(current + 1);
    });
  }

  // Mobile menu toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'Close menu' : 'Open menu');
    });
  }

  // Cursor trail — fast, responsive, simple (4 dots with slight lag = trail)
  var trace = document.getElementById('cursor-trace');
  if (trace) {
    var dots = trace.querySelectorAll('.cursor-dot');
    var mx = 0, my = 0;
    var pos = [];
    var i, len = dots.length;
    for (i = 0; i < len; i++) {
      pos.push({ x: 0, y: 0 });
    }
    var raf = null;
    var visible = true;

    function tick() {
      pos[len - 1].x = pos[len - 1].x + (mx - pos[len - 1].x) * 0.4;
      pos[len - 1].y = pos[len - 1].y + (my - pos[len - 1].y) * 0.4;
      for (i = len - 2; i >= 0; i--) {
        pos[i].x = pos[i].x + (pos[i + 1].x - pos[i].x) * 0.4;
        pos[i].y = pos[i].y + (pos[i + 1].y - pos[i].y) * 0.4;
      }
      for (i = 0; i < len; i++) {
        dots[i].style.left = pos[i].x + 'px';
        dots[i].style.top = pos[i].y + 'px';
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) {
        for (i = 0; i < len; i++) {
          pos[i].x = mx;
          pos[i].y = my;
        }
        raf = requestAnimationFrame(tick);
      }
      if (visible) trace.classList.remove('hidden');
    }

    function onLeave() {
      visible = false;
      trace.classList.add('hidden');
    }
    function onEnter() {
      visible = true;
      trace.classList.remove('hidden');
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
  }
})();
