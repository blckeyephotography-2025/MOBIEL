/* ========== BACKGROUND SLIDESHOW ========== */

(function bgSlideshow(){
  const slides = Array.from(document.querySelectorAll('.bg-slide'));
  if(!slides.length) return;
  let idx = 0;
  slides[idx].classList.add('show');
  setInterval(()=>{
    slides[idx].classList.remove('show');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('show');
  }, 4500);
})();

/* ========== NAV TOGGLE ========== */
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  const nav = document.getElementById('mainNav');
  const open = document.body.classList.contains('nav-open');
  nav.setAttribute('aria-hidden', open ? 'false' : 'true');
});

/* Close nav when clicking a link (better UX on mobile) */
document.querySelectorAll('.main-nav a').forEach(a=>{
  a.addEventListener('click', ()=> {
    document.body.classList.remove('nav-open');
    document.getElementById('mainNav').setAttribute('aria-hidden','true');
  });
});

/* ========== GALLERY LIGHTBOX ========== */
(function galleryLightbox(){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  // create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="close">&times;</span><img alt="">';
  document.body.appendChild(lightbox);
  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.close');

  grid.querySelectorAll('img').forEach(img=>{
    img.addEventListener('click', ()=> {
      lbImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });
  lbClose.addEventListener('click', ()=> lightbox.style.display = 'none');
  lightbox.addEventListener('click', e => { if(e.target === lightbox) lightbox.style.display = 'none'; });
})();



 /* ========== CALENDAR (VIEW-ONLY WITH TIMES) ========== */
// ================= CALENDAR =================
(function(){
  const calendarGrid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('monthLabel');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');

  const busyDays = {
    "2025-11-07": ["20:00-22:00" ,"18:00-19:00"],
    "2025-11-22": ["11:30-14:30", "20:30-23:30"],
    "2025-11-24": ["19:00-23:00"],
    "2025-11-25": ["17:30-21:30"],
    "2025-11-25": ["19:00-20:00"],
    "2025-11-28": ["10:30-12:30","20:30-23:30"],
    "2025-11-29": ["16:00-22:00", "20:00-24:00"],
    "2025-12-07": ["20:00-23:00 "],
     "2025-12-01": ["10:00-11:00"],
    "2025-12-13": ["20:00-01:00"],
    "2026-01-24": ["20:30-01:30"],
    "2026-01-02": ["17:00-18:00"],
     "2025-11-27": ["20:00-21:00"]
  };
  

  let current = new Date();

  function pad(n){ return n<10?'0'+n:n; }
  function key(y,m,d){ return `${y}-${pad(m)}-${pad(d)}`; }

  function render(){
    calendarGrid.innerHTML = '';
    const y = current.getFullYear(), m = current.getMonth();
    const first = new Date(y,m,1).getDay(); // 0=Sun
    const last = new Date(y,m+1,0).getDate();
    const months = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
    monthLabel.textContent = `${months[m]} ${y}`;

    // Offset voor start dag (maandag = 0)
    const offset = first === 0 ? 6 : first - 1;
    for(let i=0;i<offset;i++){ calendarGrid.appendChild(document.createElement('div')); }

    for(let d=1; d<=last; d++){
      const k = key(y,m+1,d);
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day ' + (busyDays[k]? 'busy':'free');
      dayDiv.innerHTML = `<span class="day-number">${d}</span>`;

      if(busyDays[k]){
        const timesDiv = document.createElement('div');
        timesDiv.className = 'times';
        timesDiv.textContent = busyDays[k].join(', ');
        dayDiv.appendChild(timesDiv);
      }

      calendarGrid.appendChild(dayDiv);
    }
  }

  prevBtn.addEventListener('click', ()=>{
    current.setMonth(current.getMonth()-1);
    render();
  });

  nextBtn.addEventListener('click', ()=>{
    current.setMonth(current.getMonth()+1);
    render();
  });

  render();
})();

const typeShoot = document.getElementById('type_shoot');
const fotoOpties = document.getElementById('foto_opties');
const videoOpties = document.getElementById('video_opties');

typeShoot.addEventListener('change', function(){
  if(this.value === 'foto'){
    fotoOpties.style.display = 'block';
    videoOpties.style.display = 'none';
    videoOpties.value = '';
  } else if(this.value === 'video'){
    videoOpties.style.display = 'block';
    fotoOpties.style.display = 'none';
    fotoOpties.value = '';
  } else {
    fotoOpties.style.display = 'none';
    videoOpties.style.display = 'none';
  }
});
