/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Intro: tampil minimal INTRO_MIN ms sejak halaman dibuka, lalu panel terbelah
   * dan animasi AOS / hero dimulai.
   */
  const preloader = document.querySelector('#preloader');
  const INTRO_MIN = 1700;
  function finishIntro() {
    document.body.classList.add('intro-exit');
    aosInit();
    if (!preloader) return;
    const logo = preloader.querySelector('.intro-logo');
    const hLogo = document.querySelector('#header .logo img');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let finished = false;
    const done = () => { if (finished) return; finished = true; if (hLogo) hLogo.style.visibility = ''; preloader.remove(); };
    const from = logo ? logo.getBoundingClientRect() : null;
    const to = hLogo ? hLogo.getBoundingClientRect() : null;
    if (reduce || !logo || !logo.animate || !from.width || !to || !to.width) { setTimeout(done, reduce ? 0 : 1000); return; }
    // Logo di tengah terbang mengecil ke posisi logo di header
    hLogo.style.visibility = 'hidden';
    logo.style.transformOrigin = '0 0';
    const fly = logo.animate([
      { transform: 'none' },
      { transform: 'translate(' + (to.left - from.left) + 'px, ' + (to.top - from.top) + 'px) scale(' + (to.width / from.width) + ')' }
    ], { duration: 950, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'forwards' });
    fly.onfinish = done;
    setTimeout(done, 2000);
  }
  window.addEventListener('load', () => {
    if (!preloader) { aosInit(); return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(finishIntro, reduce ? 0 : Math.max(0, INTRO_MIN - performance.now()));
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/*--------------------------------------------------------------
# Kustomisasi Seven Inc (ditambahkan di atas template Arsha)
--------------------------------------------------------------*/
(function() {
  "use strict";

  /* ============================================================
     KONFIGURASI: CUKUP UBAH DI SINI
     ============================================================ */
  const WA_NUMBER = "6285211075541";                          // format: 62 + nomor tanpa 0
  const WA_DEFAULT_MESSAGE = "Halo Seven Inc, saya ingin bertanya mengenai layanan Anda.";
  const INSTAGRAM_URL = "https://www.instagram.com/sevenincjogja/";

  function waLink(message) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
  }

  /**
   * Semua elemen dengan atribut data-wa otomatis menjadi link WhatsApp
   */
  document.querySelectorAll("[data-wa]").forEach(function(el) {
    el.setAttribute("href", waLink(el.getAttribute("data-wa") || WA_DEFAULT_MESSAGE));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /**
   * Panel rincian produk per lini bisnis (tombol "Lihat produk" di kartu layanan)
   */
  const SVC_DATA = {
    konveksi: { tag: "Rumah Konveksi", title: "Konveksi", site: "rumahkonveksi.com",
      intro: "Pengerjaan pakaian di fasilitas produksi sendiri, ditambah brand fashion pria milik Seven Inc.",
      groups: [
        { h: "Jasa konveksi", items: [["Kaos"], ["Seragam"], ["Jaket"], ["PDH"], ["Jas & blazer"]] },
        { h: "Brand fashion pria Seven Inc", items: [
          ["Crows Denim", "Apparel pria bertema anime, termasuk jaket dan blazer."],
          ["Alphawear", "Jas & blazer ukuran S, M, L, XL dengan beragam pilihan bahan kain."],
          ["Grenade Clothing", "Clothing pria dengan pilihan fashion harian."] ] } ] },
    dropship: { tag: "Jagoandropship", title: "Dropshipping Fashion", site: "jagoandropship.com",
      intro: "Platform dropshipping fashion untuk reseller yang ingin berjualan tanpa repot menyiapkan stok.",
      groups: [ { h: "Yang ditawarkan", items: [
        ["Peluang usaha online sebagai dropshipper"], ["Produk fashion untuk dijual ulang"], ["Berjualan tanpa menyiapkan stok sendiri"] ] } ] },
    web: { tag: "Seven Tech", title: "Pembuatan Web", site: "republikweb.net",
      intro: "Pembuatan website dan pengembangan software agar bisnis tampil profesional di dunia digital.",
      groups: [ { h: "Layanan", items: [
        ["Pembuatan website", "Company profile, toko online, dan website bisnis lainnya."],
        ["Aplikasi mobile"], ["Pengembangan software & sistem informasi"] ] } ] },
    paket: { tag: "Ambilpaket", title: "Pengiriman Paket", site: "ambilpaket.com",
      intro: "Jasa pengiriman paket untuk kebutuhan pribadi maupun usaha.",
      groups: [ { h: "Layanan", items: [
        ["Pengiriman paket pribadi"], ["Pengiriman paket usaha"], ["Pengambilan paket untuk mendukung usaha online"] ] } ] },
    titipsini: { tag: "Titipsini", title: "Penitipan Barang", site: "titipsini.com",
      intro: "Jasa penitipan barang agar stok dan ruang usaha Anda lebih tertata.",
      groups: [ { h: "Yang bisa dititipkan", items: [["Barang"], ["Rumah"], ["Kendaraan"]] },
                { h: "Area layanan", items: [["Yogyakarta"], ["Purwodadi"], ["Semarang"]] } ] },
    pengelasan: { tag: "Tukanglas", title: "Jasa Pengelasan", site: "tukanglas.org",
      intro: "Pengerjaan las untuk berbagai kebutuhan konstruksi dan fabrikasi.",
      groups: [ { h: "Pengerjaan", items: [
        ["Las konstruksi"], ["Fabrikasi besi & baja"], ["Contoh: pagar, kanopi, railing"] ] } ] }
  };

  (function initSvcModal() {
    const modal = document.getElementById("svcModal");
    if (!modal) return;
    const $ = function(id) { return document.getElementById(id); };
    let opener = null;
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
    function open(key, btn) {
      const d = SVC_DATA[key]; if (!d) return;
      opener = btn;
      $("svcModalTag").textContent = d.tag;
      $("svcModalTitle").textContent = d.title;
      $("svcModalIntro").textContent = d.intro;
      $("svcModalBody").innerHTML = d.groups.map(function(g) {
        return '<h5>' + esc(g.h) + '</h5><ul>' + g.items.map(function(i) {
          return '<li><div><b>' + esc(i[0]) + '</b>' + (i[1] ? '<span>' + esc(i[1]) + '</span>' : '') + '</div></li>';
        }).join("") + '</ul>';
      }).join("");
      $("svcModalWa").setAttribute("href", waLink("Halo Seven Inc, saya ingin bertanya tentang produk/layanan " + d.title + "."));
      const site = $("svcModalSite"); site.href = "https://" + d.site; site.innerHTML = esc(d.site) + ' <i class="bi bi-arrow-up-right"></i>';
      modal.hidden = false; document.body.classList.add("svc-modal-open");
      modal.querySelector(".svc-modal__close").focus();
    }
    function close() { modal.hidden = true; document.body.classList.remove("svc-modal-open"); if (opener) opener.focus(); }
    document.querySelectorAll(".svc-more").forEach(function(b) { b.addEventListener("click", function() { open(b.getAttribute("data-svc"), b); }); });
    modal.querySelectorAll("[data-close]").forEach(function(el) { el.addEventListener("click", close); });
    document.addEventListener("keydown", function(e) { if (e.key === "Escape" && !modal.hidden) close(); });
  })();

  /**
   * Semua elemen dengan atribut data-ig otomatis menjadi link Instagram
   */
  document.querySelectorAll("[data-ig]").forEach(function(el) {
    el.setAttribute("href", INSTAGRAM_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /**
   * Form kontak: rakit pesan lalu buka WhatsApp
   */
  const waForm = document.getElementById("wa-form");
  if (waForm) {
    waForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const d = new FormData(waForm);
      const text = "Halo Seven Inc, saya ingin konsultasi.\n\n" +
        "Nama: " + d.get("nama") + "\n" +
        "Layanan: " + d.get("layanan") + "\n" +
        "Pesan: " + d.get("pesan");
      const sent = waForm.querySelector(".sent-message");
      if (sent) sent.style.display = "block";
      window.open(waLink(text), "_blank", "noopener");
    });
  }

  /**
   * Angka statistik hero berhitung naik
   */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target, end = +el.dataset.count, start = end > 100 ? end - 40 : 0, t0 = performance.now();
        (function tick(t) {
          const p = Math.min((t - t0) / 1400, 1);
          el.textContent = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function(el) { io.observe(el); });
  }

})();
