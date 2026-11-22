/**
 * Roberto Carlos Correa Junior - Portfolio & Currículo Dev
 * Vanilla JavaScript (Zero Dependencies, Ultra Fast)
 * Features:
 * - Interactive Bot & Automation Simulator (Run & Log Output)
 * - Dynamic Project Categorization Filter
 * - Dark / Light Mode Switcher with localStorage
 * - Accessible Mobile Navigation
 * - Clipboard Quick Copy with Visual Feedback
 * - Print / PDF Resume Trigger
 */

document.addEventListener('DOMContentLoaded', () => {
  initImmersionEffects();
  initBotSimulator();
  initProjectsFilter();
  initThemeToggle();
  initMobileNav();
  initClipboardActions();
  initPrintCurriculum();
  initHeaderScroll();
});

/**
 * 1. Interactive Deploy Pipeline Simulator (AWS + Docker + ProtejaJÁ)
 */
function initBotSimulator() {
  const runBtn = document.getElementById('btn-run-bot');
  const clearBtn = document.getElementById('btn-clear-bot');
  const terminalOutput = document.getElementById('bot-terminal-output');
  if (!runBtn || !terminalOutput) return;

  const logs = [
    { text: '$ docker compose build --no-cache && pytest', tag: 'bl-cmd', delay: 200 },
    { text: '[00:01] 🧪 Executando 20 testes automatizados (unittest) ... 20/20 OK', tag: 'bl-info', delay: 650 },
    { text: '[00:02] 🐳 Imagem Python 3.12-slim + Gunicorn empacotada com sucesso.', tag: 'bl-info', delay: 1200 },
    { text: '[00:03] ☁️ Enviando container para produção na AWS ...', tag: 'bl-warn', delay: 1750 },
    { text: '[00:04] 🌐 Validando Domínio, DNS e certificado HTTPS/SSL ...', tag: 'bl-info', delay: 2300 },
    { text: '[00:05] 🗺️ Base IBGE (5.570 municípios) carregada em memória (<100ms).', tag: 'bl-success', delay: 2850 },
    { text: '[00:06] 🚀 ProtejaJÁ no ar em produção (Lighthouse 98-100 / WCAG AAA).', tag: 'bl-success', delay: 3400 },
    { text: '> STATUS: Deploy na AWS concluído com êxito!', tag: 'bl-tag', delay: 3900 }
  ];

  let isRunning = false;

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span>Publicando...</span>';

    terminalOutput.innerHTML = '';

    logs.forEach((item, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `bot-line ${item.tag}`;
        line.textContent = item.text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        if (index === logs.length - 1) {
          isRunning = false;
          runBtn.disabled = false;
          runBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Simular Novamente</span>';
        }
      }, item.delay);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (isRunning) return;
      terminalOutput.innerHTML = '<div class="bot-line bl-tag">&gt; Terminal pronto. Clique em "Simular Deploy" para ver o fluxo na AWS.</div>';
    });
  }
}

/**
 * 2. Projects Categorization Filter
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectBoxes = document.querySelectorAll('.project-box');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectBoxes.forEach((box) => {
        const category = box.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          box.style.display = 'grid';
          box.style.animation = 'fadeIn 0.3s ease';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. Theme Switcher (Dark / Light)
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    toggleBtn.setAttribute('aria-label', `Alternar para tema ${nextTheme === 'dark' ? 'claro' : 'escuro'}`);
  });
}

/**
 * 4. Accessible Mobile Navigation
 */
function initMobileNav() {
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (!menuBtn || !navLinks) return;

  const links = navLinks.querySelectorAll('a');

  function openMenu() {
    menuBtn.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
  }

  function closeMenu() {
    menuBtn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((l) => l.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

/**
 * 5. Clipboard Quick Copy Action
 */
function initClipboardActions() {
  const clipButtons = document.querySelectorAll('.btn-clip');

  clipButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = 'Copiado! ✓';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2200);
      } catch (err) {
        console.warn('Erro ao copiar para clipboard', err);
      }
    });
  });
}

/**
 * 6. Print / PDF Resume Trigger
 */
function initPrintCurriculum() {
  const printBtns = document.querySelectorAll('.btn-print');
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/**
 * 7. Header Scroll Tracking
 */
function initHeaderScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 8. Immersion Effects (Cursor Spotlight + Smooth Scroll Reveal)
 */
function initImmersionEffects() {
  const hero = document.getElementById('inicio');
  if (hero && window.matchMedia('(pointer: fine)').matches) {
    let rafId = null;
    hero.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
        hero.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        rafId = null;
      });
    }, { passive: true });
  }

  const targets = document.querySelectorAll(
    '.bento-card, .matrix-cell, .project-box, .pillar-box, .contact-card, .section-head'
  );
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el) => {
    el.classList.add('reveal-ready');
    observer.observe(el);
  });
}
