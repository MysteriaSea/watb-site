async function loadContent() {
  const res = await fetch('/content.json', { cache: 'no-store' });
  const data = await res.json();

  // Hero
  document.getElementById('hero-tag').textContent = data.hero.kingdom_tag;
  document.getElementById('hero-wordmark').textContent = data.hero.wordmark;
  document.getElementById('hero-tagline').textContent = data.hero.tagline;
  document.getElementById('hero-creed').textContent = data.hero.creed;

  // About
  document.getElementById('about-en').textContent = data.about.text_en;
  document.getElementById('about-zh').textContent = data.about.text_zh;

  // Benefits
  const benefitsPanel = document.getElementById('benefits-panel');
  benefitsPanel.innerHTML = data.benefits.map(b => `
    <div class="benefit">
      <div class="icon">${b.icon}</div>
      <div class="txt"><h3>${b.title}</h3><p>${b.text}</p></div>
    </div>
  `).join('') + `<div class="cta-block"><a class="btn filled" href="#">Benefits Gallery</a></div>`;

  // Events
  document.getElementById('events-intro').textContent = data.events.intro;
  document.getElementById('sos-desc').textContent = data.events.state_of_supremacy.desc;
  document.getElementById('sos-records').innerHTML = data.events.state_of_supremacy.records.map(r => `
    <div class="record">
      <div class="date">${r.date}</div>
      <div class="result">${r.result}</div>
    </div>
  `).join('');
  document.getElementById('s4-desc').textContent = data.events.season4.desc;
  document.getElementById('bg-desc').textContent = data.events.blackgold.desc;
  document.getElementById('bg-records').innerHTML = (data.events.blackgold.records || []).map(r => `
    <div class="record"><div class="date">${r.date}</div><div class="result">${r.result}</div></div>
  `).join('');
  document.getElementById('fr-desc').textContent = data.events.frankie.desc;
  document.getElementById('fr-records').innerHTML = (data.events.frankie.records || []).map(r => `
    <div class="record"><div class="date">${r.date}</div><div class="result">${r.result}</div></div>
  `).join('');
  document.getElementById('ad-desc').textContent = data.events.alliance_duel.desc;
  document.getElementById('ad-records').innerHTML = (data.events.alliance_duel.records || []).map(r => `
    <div class="record"><div class="date">${r.date}</div><div class="result">${r.result}</div></div>
  `).join('');

  // Leadership
  document.getElementById('leadership-about').textContent = data.leadership.about;
  document.getElementById('leader-title').textContent = data.leadership.leader_title;
  document.getElementById('leader-name').textContent = data.leadership.leader_name;
  if (data.leadership.leader_photo) {
    document.getElementById('leader-photo').src = data.leadership.leader_photo;
  }

  // Officers / Migration
  document.getElementById('officers-text').textContent = data.officers.text;
  document.getElementById('migration-text').textContent = data.migration.text;

  // Moments gallery
  const momentsGrid = document.getElementById('moments-grid');
  const momentsEmpty = document.getElementById('moments-empty');
  const photos = data.moments.photos || [];
  if (photos.length === 0) {
    momentsEmpty.style.display = 'block';
  } else {
    photos.forEach((p, i) => {
      const div = document.createElement('div');
      div.className = 'item';
      div.dataset.index = i;
      div.innerHTML = `<img src="${p.thumb}" alt="${p.cap || ''}"><div class="cap-overlay">${p.cap || ''}</div>`;
      momentsGrid.appendChild(div);
    });
    setupLightbox(photos);
  }

  // Tabs / lang toggle wiring (safe to run after content is in place)
  wireInteractions();
}

function setupLightbox(photos) {
  const grid = document.getElementById('moments-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lbCap');
  let current = 0;

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    lightboxImg.src = p.full || p.thumb;
    lightboxImg.alt = p.cap || '';
    lbCap.textContent = p.cap || '';
  }

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) { show(parseInt(item.dataset.index, 10)); lightbox.classList.add('open'); }
  });

  function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }

  document.getElementById('closeBtn').addEventListener('click', closeLightbox);
  document.getElementById('prevBtn').addEventListener('click', () => show(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
}

function wireInteractions() {
  document.querySelectorAll('.lang-tab button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-tab button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      document.querySelectorAll('.about p[data-lang]').forEach(p => {
        p.style.display = (p.dataset.lang === lang) ? 'block' : 'none';
      });
    });
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.events .panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
}

loadContent();
