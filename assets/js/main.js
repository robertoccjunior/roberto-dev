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
  initCircuitSwitcher();
  initBotSimulator();
  initProjectsFilter();
  initThemeToggle();
  initMobileNav();
  initClipboardActions();
  initPrintCurriculum();
  initHeaderScroll();
});

/**
 * 1. Interactive Bot & Automation Simulator
 * Recruiter can click "Executar Bot" to simulate a real Python automation pipeline!
 */
function initBotSimulator() {
  const runBtn = document.getElementById('btn-run-bot');
  const clearBtn = document.getElementById('btn-clear-bot');
  const terminalOutput = document.getElementById('bot-terminal-output');
  if (!runBtn || !terminalOutput) return;

  const logs = [
    { text: '$ docker compose run --rm bot_automation', tag: 'bl-cmd', delay: 200 },
    { text: '[00:01] 🚀 Inicializando container [bot_worker:latest] ... OK', tag: 'bl-info', delay: 600 },
    { text: '[00:02] 🔌 Conectando ao MySQL (port 3306 via Docker Network) ... Conectado!', tag: 'bl-info', delay: 1100 },
    { text: '[00:03] 🌐 Scraping & Coleta de dados via Requests/APIs ...', tag: 'bl-warn', delay: 1700 },
    { text: '[00:04] 🧹 Higienizando payload e validando integridade relacional ...', tag: 'bl-info', delay: 2300 },
    { text: '[00:05] 💾 42 registros inseridos no banco com sucesso (0 falhas).', tag: 'bl-success', delay: 2900 },
    { text: '[00:06] 📢 Disparando Webhook de notificação ... Concluído em 1.2s.', tag: 'bl-success', delay: 3500 },
    { text: '> STATUS: Rotina finalizada com êxito! Pronto para nova execução.', tag: 'bl-tag', delay: 4000 }
  ];

  let isRunning = false;

  runBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span>Executando...</span>';

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
          runBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Rodar Novamente</span>';
        }
      }, item.delay);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (isRunning) return;
      terminalOutput.innerHTML = '<div class="bot-line bl-tag">&gt; Terminal pronto. Clique em "Executar Bot" para iniciar a rotina.</div>';
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
 * 8. Circuit Power Switcher (Interruptor de Trilhas Neon)
 * Liga e desliga em cascata os barramentos de circuito impresso do site
 */
function initCircuitSwitcher() {
  const toggleBtn = document.getElementById('circuit-toggle-btn');
  const statusLabel = document.getElementById('circuit-state-text');
  if (!toggleBtn) return;

  // Carrega preferência anterior ou define ativo por padrão
  const savedPower = localStorage.getItem('circuit-power') || 'active';
  setCircuitState(savedPower === 'active');

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyActive = toggleBtn.classList.contains('active');
    const newState = !isCurrentlyActive;
    setCircuitState(newState);
    localStorage.setItem('circuit-power', newState ? 'active' : 'standby');
  });

  function setCircuitState(isActive) {
    if (isActive) {
      document.documentElement.setAttribute('data-circuit', 'active');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-checked', 'true');
      if (statusLabel) statusLabel.textContent = 'ENERGIZADO';
    } else {
      document.documentElement.setAttribute('data-circuit', 'standby');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-checked', 'false');
      if (statusLabel) statusLabel.textContent = 'STANDBY';
    }
  }
}
