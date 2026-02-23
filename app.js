/* ============================================
   HealthTwin AI – Application Logic
   ============================================ */

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');
const sections = document.querySelectorAll('.section');

// Scroll detection for navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// Mobile toggle
mobileToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const spans = mobileToggle.querySelectorAll('span');
  if (navLinksContainer.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ===== INTERSECTION OBSERVER (Scroll Animations) =====
const animElements = document.querySelectorAll('.anim-fade-up, .anim-scale-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animElements.forEach(el => observer.observe(el));

// ===== SIMULATOR ENGINE =====
const BASELINE = {
  sleep: 7,
  activity: 45,
  stress: 4,
  sugar: 30,
  screen: 5
};

const sliders = {
  sleep: document.getElementById('sleepSlider'),
  activity: document.getElementById('activitySlider'),
  stress: document.getElementById('stressSlider'),
  sugar: document.getElementById('sugarSlider'),
  screen: document.getElementById('screenSlider')
};

const valDisplays = {
  sleep: document.getElementById('sleepVal'),
  activity: document.getElementById('activityVal'),
  stress: document.getElementById('stressSliderVal'),
  sugar: document.getElementById('sugarVal'),
  screen: document.getElementById('screenVal')
};

// Format slider display values
function formatSliderVal(key, val) {
  const v = parseFloat(val);
  switch (key) {
    case 'sleep': return v + ' hrs';
    case 'activity': return v + ' min';
    case 'stress': return v + ' / 10';
    case 'sugar': return v + ' g';
    case 'screen': return v + ' hrs';
    default: return v;
  }
}

// Simulation model: compute health metrics from slider values
function computeMetrics(sleep, activity, stress, sugar, screen) {
  // Normalize inputs to 0-1 scale (good → 1, bad → 0)
  const sleepNorm = Math.min(Math.max((sleep - 3) / 5, 0), 1);       // 3-8 hrs → 0-1
  const activityNorm = Math.min(activity / 90, 1);                    // 0-90 min → 0-1
  const stressNorm = 1 - (stress / 10);                               // 0-10 → 1-0 (inverted)
  const sugarNorm = 1 - Math.min(sugar / 80, 1);                      // 0-80g → 1-0 (inverted)
  const screenNorm = 1 - Math.min(Math.max((screen - 1) / 12, 0), 1); // 1-13 → 1-0 (inverted)

  // Weighted composite
  const healthScore = Math.round(
    (sleepNorm * 25 + activityNorm * 25 + stressNorm * 20 + sugarNorm * 15 + screenNorm * 15) + 15
  );

  const heartRisk = Math.round(
    Math.max(5, 40 - (activityNorm * 15) - (sleepNorm * 10) - (sugarNorm * 8) + (stress * 1.5))
  );

  const stressLevel = Math.round(
    Math.max(5, (stress * 6) + ((10 - sleep) * 2) + (screen * 1.5) - (activity * 0.15))
  );

  const energyLevel = Math.round(
    Math.min(100, (sleepNorm * 30) + (activityNorm * 25) + (stressNorm * 20) + (sugarNorm * 10) + (screenNorm * 15) + 10)
  );

  return {
    health: Math.min(100, Math.max(10, healthScore)),
    heart: Math.min(80, Math.max(5, heartRisk)),
    stress: Math.min(95, Math.max(5, stressLevel)),
    energy: Math.min(100, Math.max(10, energyLevel))
  };
}

// Baseline metrics
const baselineMetrics = computeMetrics(BASELINE.sleep, BASELINE.activity, BASELINE.stress, BASELINE.sugar, BASELINE.screen);

// Build chart bars
function buildChartBars(chartId, labels, values, maxVal, color) {
  const container = document.getElementById(chartId);
  container.innerHTML = '';
  labels.forEach((label, i) => {
    const group = document.createElement('div');
    group.className = 'chart-bar-group';

    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = '0%';
    bar.style.background = color;

    const labelEl = document.createElement('div');
    labelEl.className = 'chart-bar-label';
    labelEl.textContent = label;

    group.appendChild(bar);
    group.appendChild(labelEl);
    container.appendChild(group);

    // Animate in
    requestAnimationFrame(() => {
      setTimeout(() => {
        bar.style.height = (values[i] / maxVal * 100) + '%';
      }, i * 80);
    });
  });
}

// Generate time-series projected values from a base
function projectValues(baseValue, variance, count, trend) {
  const values = [];
  for (let i = 0; i < count; i++) {
    const drift = trend * i * 0.5;
    const noise = (Math.random() - 0.5) * variance;
    values.push(Math.round(Math.min(100, Math.max(5, baseValue + drift + noise))));
  }
  return values;
}

const timeLabels = ['Now', '1M', '3M', '6M', '1Y', '2Y', '5Y'];

function updateCharts(metrics) {
  // Health Score chart
  const healthTrend = (metrics.health - baselineMetrics.health) * 0.1;
  const healthVals = projectValues(metrics.health, 5, 7, healthTrend);
  buildChartBars('healthScoreChart', timeLabels, healthVals, 100, 'linear-gradient(to top, #10b981, #00d4ff)');

  // Heart Risk chart
  const heartTrend = (metrics.heart - baselineMetrics.heart) * 0.15;
  const heartVals = projectValues(metrics.heart, 4, 7, heartTrend);
  buildChartBars('heartRiskChart', timeLabels, heartVals, 80, 'linear-gradient(to top, #ef4444, #f59e0b)');

  // Stress forecast
  const stressTrend = (metrics.stress - baselineMetrics.stress) * 0.12;
  const stressVals = projectValues(metrics.stress, 6, 7, stressTrend);
  buildChartBars('stressForecastChart', timeLabels, stressVals, 100, 'linear-gradient(to top, #f59e0b, #ef4444)');

  // Energy prediction
  const energyTrend = (metrics.energy - baselineMetrics.energy) * 0.1;
  const energyVals = projectValues(metrics.energy, 4, 7, energyTrend);
  buildChartBars('energyPredictionChart', timeLabels, energyVals, 100, 'linear-gradient(to top, #7c3aed, #00d4ff)');
}

// Update risk change indicators
function updateRiskIndicators(metrics) {
  const fields = [
    { id: 'rciHealth', deltaId: 'rciHealthDelta', val: metrics.health, base: baselineMetrics.health, unit: '%', goodUp: true },
    { id: 'rciHeart', deltaId: 'rciHeartDelta', val: metrics.heart, base: baselineMetrics.heart, unit: '%', goodUp: false },
    { id: 'rciStress', deltaId: 'rciStressDelta', val: metrics.stress, base: baselineMetrics.stress, unit: '%', goodUp: false },
    { id: 'rciEnergy', deltaId: 'rciEnergyDelta', val: metrics.energy, base: baselineMetrics.energy, unit: '%', goodUp: true },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const deltaEl = document.getElementById(f.deltaId);
    el.textContent = f.val + f.unit;

    const diff = f.val - f.base;
    if (diff === 0) {
      deltaEl.textContent = '— Baseline';
      deltaEl.style.color = 'var(--text-muted)';
    } else {
      const isGood = f.goodUp ? diff > 0 : diff < 0;
      deltaEl.textContent = (diff > 0 ? '↑ +' : '↓ ') + diff + f.unit + ' from baseline';
      deltaEl.style.color = isGood ? 'var(--accent-green)' : 'var(--accent-red)';
    }
  });
}

// Update dashboard cards too
function updateDashboardCards(metrics) {
  // Heart risk
  document.getElementById('heartRiskVal').textContent = metrics.heart + '%';
  document.getElementById('heartRiskBar').style.width = metrics.heart + '%';

  // Stress
  document.getElementById('stressVal').textContent = metrics.stress + '%';
  document.getElementById('stressBar').style.width = metrics.stress + '%';

  // Energy
  document.getElementById('energyVal').textContent = metrics.energy + '%';
  document.getElementById('energyBar').style.width = metrics.energy + '%';

  // Score ring
  const circumference = 2 * Math.PI * 52; // ~326.7
  const offset = circumference - (metrics.health / 100) * circumference;
  document.getElementById('scoreRing').style.strokeDashoffset = offset;
  document.getElementById('scoreNumber').textContent = metrics.health;
}

// Main simulation update
function updateSimulation() {
  const sleep = parseFloat(sliders.sleep.value);
  const activity = parseFloat(sliders.activity.value);
  const stress = parseFloat(sliders.stress.value);
  const sugar = parseFloat(sliders.sugar.value);
  const screen = parseFloat(sliders.screen.value);

  // Update slider labels
  valDisplays.sleep.textContent = formatSliderVal('sleep', sleep);
  valDisplays.activity.textContent = formatSliderVal('activity', activity);
  valDisplays.stress.textContent = formatSliderVal('stress', stress);
  valDisplays.sugar.textContent = formatSliderVal('sugar', sugar);
  valDisplays.screen.textContent = formatSliderVal('screen', screen);

  // Compute new metrics
  const metrics = computeMetrics(sleep, activity, stress, sugar, screen);

  // Update all visuals
  updateCharts(metrics);
  updateRiskIndicators(metrics);
  updateDashboardCards(metrics);
}

// Attach slider event listeners
Object.values(sliders).forEach(slider => {
  slider.addEventListener('input', updateSimulation);
});

function resetSliders() {
  sliders.sleep.value = BASELINE.sleep;
  sliders.activity.value = BASELINE.activity;
  sliders.stress.value = BASELINE.stress;
  sliders.sugar.value = BASELINE.sugar;
  sliders.screen.value = BASELINE.screen;
  updateSimulation();
}

// ===== DECISION SIMULATION =====
const decisionScenarios = {
  1: { // Exercise 60 min
    label: 'Exercise 60 min/day',
    current: { heart: 12, stress: 42, energy: 76, score: 87 },
    future: { heart: 7, stress: 28, energy: 92, score: 95 }
  },
  2: { // Reduce sugar 50%
    label: 'Reduce sugar by 50%',
    current: { heart: 12, stress: 42, energy: 76, score: 87 },
    future: { heart: 9, stress: 38, energy: 82, score: 91 }
  },
  3: { // Sleep 8+
    label: 'Sleep 8+ hours',
    current: { heart: 12, stress: 42, energy: 76, score: 87 },
    future: { heart: 10, stress: 22, energy: 89, score: 93 }
  },
  4: { // Cut screen time
    label: 'Cut screen time 50%',
    current: { heart: 12, stress: 42, energy: 76, score: 87 },
    future: { heart: 11, stress: 30, energy: 84, score: 90 }
  }
};

const activeDecisions = new Set();

function toggleDecision(id) {
  const card = document.getElementById('decision' + id);
  const scenario = decisionScenarios[id];

  if (activeDecisions.has(id)) {
    activeDecisions.delete(id);
    card.classList.remove('active');
    // Reset bars to equal height
    animateDecisionBars(id, scenario.current, scenario.current);
  } else {
    activeDecisions.add(id);
    card.classList.add('active');
    // Animate bars to show difference
    animateDecisionBars(id, scenario.current, scenario.future);
  }
}

function animateDecisionBars(id, current, future) {
  const prefix = 'd' + id;
  const metrics = ['heart', 'stress', 'energy', 'score'];
  const maxVals = { heart: 50, stress: 100, energy: 100, score: 100 };

  metrics.forEach(m => {
    const currentBar = document.getElementById(`${prefix}-${m}-current`);
    const futureBar = document.getElementById(`${prefix}-${m}-future`);
    if (currentBar && futureBar) {
      currentBar.style.height = (current[m] / maxVals[m] * 100) + '%';
      futureBar.style.height = (future[m] / maxVals[m] * 100) + '%';
    }
  });
}

// Initialize decision bars
function initDecisionBars() {
  Object.keys(decisionScenarios).forEach(id => {
    const s = decisionScenarios[id];
    animateDecisionBars(id, s.current, s.current);
  });
}

// ===== TIMELINE DRAG SCROLL =====
const timelineContainer = document.getElementById('timelineContainer');
let isTimelineDragging = false;
let timelineStartX = 0;
let timelineScrollLeft = 0;

timelineContainer.addEventListener('mousedown', (e) => {
  isTimelineDragging = true;
  timelineStartX = e.pageX - timelineContainer.offsetLeft;
  timelineScrollLeft = timelineContainer.scrollLeft;
  timelineContainer.style.cursor = 'grabbing';
});

timelineContainer.addEventListener('mouseleave', () => {
  isTimelineDragging = false;
  timelineContainer.style.cursor = 'grab';
});

timelineContainer.addEventListener('mouseup', () => {
  isTimelineDragging = false;
  timelineContainer.style.cursor = 'grab';
});

timelineContainer.addEventListener('mousemove', (e) => {
  if (!isTimelineDragging) return;
  e.preventDefault();
  const x = e.pageX - timelineContainer.offsetLeft;
  const walk = (x - timelineStartX) * 2;
  timelineContainer.scrollLeft = timelineScrollLeft - walk;
});

// Touch support
timelineContainer.addEventListener('touchstart', (e) => {
  timelineStartX = e.touches[0].pageX - timelineContainer.offsetLeft;
  timelineScrollLeft = timelineContainer.scrollLeft;
});

timelineContainer.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - timelineContainer.offsetLeft;
  const walk = (x - timelineStartX) * 2;
  timelineContainer.scrollLeft = timelineScrollLeft - walk;
});

// ===== ANIMATED COUNTERS (Score Ring) =====
function animateScoreRing() {
  const circumference = 2 * Math.PI * 52;
  const ring = document.getElementById('scoreRing');
  const scoreEl = document.getElementById('scoreNumber');
  const targetScore = 87;
  const targetOffset = circumference - (targetScore / 100) * circumference;

  // Start from empty
  ring.style.strokeDashoffset = circumference;
  let currentScore = 0;

  const duration = 1500;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    const currentOffset = circumference - (eased * (circumference - targetOffset));
    ring.style.strokeDashoffset = currentOffset;
    scoreEl.textContent = Math.round(eased * targetScore);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// ===== METRIC GLOW ON CHANGE =====
let prevMetrics = { ...baselineMetrics };

function highlightChangedMetrics(metrics) {
  const items = document.querySelectorAll('.risk-change-item');
  const keys = ['health', 'heart', 'stress', 'energy'];
  keys.forEach((key, i) => {
    if (items[i]) {
      if (metrics[key] !== prevMetrics[key]) {
        items[i].classList.add('changed');
        setTimeout(() => items[i].classList.remove('changed'), 1200);
      }
    }
  });
  prevMetrics = { ...metrics };
}

// Patch updateSimulation to add glow
const _origUpdateSim = updateSimulation;
updateSimulation = function () {
  const sleep = parseFloat(sliders.sleep.value);
  const activity = parseFloat(sliders.activity.value);
  const stress = parseFloat(sliders.stress.value);
  const sugar = parseFloat(sliders.sugar.value);
  const screen = parseFloat(sliders.screen.value);

  valDisplays.sleep.textContent = formatSliderVal('sleep', sleep);
  valDisplays.activity.textContent = formatSliderVal('activity', activity);
  valDisplays.stress.textContent = formatSliderVal('stress', stress);
  valDisplays.sugar.textContent = formatSliderVal('sugar', sugar);
  valDisplays.screen.textContent = formatSliderVal('screen', screen);

  const metrics = computeMetrics(sleep, activity, stress, sugar, screen);
  updateCharts(metrics);
  updateRiskIndicators(metrics);
  updateDashboardCards(metrics);
  highlightChangedMetrics(metrics);
  updateAvatarGlow(metrics.health);
};

// ===== DYNAMIC AVATAR GLOW =====
function updateAvatarGlow(healthScore) {
  const glowEl = document.querySelector('.avatar-glow');
  if (!glowEl) return;
  let color;
  if (healthScore >= 80) color = 'rgba(0,212,255,0.2)';
  else if (healthScore >= 60) color = 'rgba(245,158,11,0.2)';
  else color = 'rgba(239,68,68,0.25)';
  glowEl.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
}

// ===== FLOATING PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 40;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.5 ? 190 : 270
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== PAGE TRANSITION =====
function initPageTransition() {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;
  setTimeout(() => {
    overlay.classList.add('hide');
    setTimeout(() => overlay.style.display = 'none', 600);
  }, 400);
}

// ===== ONBOARDING POPUP =====
function initOnboarding() {
  try {
    const user = JSON.parse(localStorage.getItem('healthtwin_user'));
    if (user && user.firstLogin) {
      const overlay = document.getElementById('onboardingOverlay');
      if (overlay) {
        setTimeout(() => overlay.classList.add('active'), 800);
        user.firstLogin = false;
        localStorage.setItem('healthtwin_user', JSON.stringify(user));
      }
    }
  } catch (e) { }
}

function closeOnboarding() {
  const overlay = document.getElementById('onboardingOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// ===== FLOATING AI ASSISTANT =====
function toggleAiChat() {
  const tooltip = document.getElementById('aiFabTooltip');
  if (tooltip) {
    tooltip.classList.toggle('show');
    if (tooltip.classList.contains('show')) {
      tooltip.textContent = '🧠 AI: Based on your data, try improving sleep for best results!';
      setTimeout(() => tooltip.classList.remove('show'), 5000);
    }
  }
}

// Show AI tooltip briefly on page load
function initAiFab() {
  const tooltip = document.getElementById('aiFabTooltip');
  if (tooltip) {
    setTimeout(() => {
      tooltip.classList.add('show');
      setTimeout(() => tooltip.classList.remove('show'), 4000);
    }, 3000);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  // Page transition
  initPageTransition();

  // Particles
  initParticles();

  // Initial simulation
  updateSimulation();

  // Init decision bars
  initDecisionBars();

  // Animate score ring when dashboard comes into view
  const dashboardSection = document.getElementById('dashboard');
  const dashObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateScoreRing();
        dashObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  dashObserver.observe(dashboardSection);

  // Set timeline cursor
  timelineContainer.style.cursor = 'grab';

  // Trigger initial nav state
  updateActiveNav();

  // Onboarding
  initOnboarding();

  // AI FAB
  initAiFab();
});
