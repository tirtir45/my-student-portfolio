/* ─────────────────────────────────────────────
   CUSTOM HEART CURSOR WITH SPARKLE TRAIL
   ───────────────────────────────────────────── */
// Build heart cursor using SVG
const dot = document.createElement('div');
dot.className = 'cursor-dot';
dot.innerHTML = `<svg class="cursor-heart-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#c45c6a"/>
</svg>`;
const ring = document.createElement('div');
ring.className = 'cursor-ring';
document.body.append(dot, ring);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let lastSparkle = 0;

const SPARKLE_COLORS = ['#e8a8b0','#d4808a','#f2cdd1','#c45c6a','#faeaec'];
const PETAL_SIZES    = [5, 7, 6, 8, 5];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';

  // Throttle sparkles to every ~40ms for performance
  const now = Date.now();
  if (now - lastSparkle > 40) {
    spawnSparkle(mouseX, mouseY);
    lastSparkle = now;
  }
});

// Ring follows with a smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on hoverable elements
document.querySelectorAll('a, button, .certif-card, .project-card, .intern-card, .cell')
  .forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

function spawnSparkle(x, y) {
  const s     = document.createElement('div');
  const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  const size  = PETAL_SIZES[Math.floor(Math.random() * PETAL_SIZES.length)];
  const angle = Math.random() * Math.PI * 2;
  const dist  = 18 + Math.random() * 22;
  const dx    = Math.cos(angle) * dist;
  const dy    = Math.sin(angle) * dist;

  s.className = 'cursor-sparkle';
  s.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/>
  </svg>`;
  s.style.cssText = `
    left: ${x}px;
    top:  ${y}px;
    filter: drop-shadow(0 0 ${size * 0.6}px ${color});
    --dx: ${dx}px;
    --dy: ${dy}px;
  `;
  document.body.appendChild(s);
  s.addEventListener('animationend', () => s.remove());
}


/* ─────────────────────────────────────────────
   TYPEWRITER EFFECT ON HERO HEADING
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Target the first h2 inside .about-me .text
  const heading = document.querySelector('.about-me .text h2');
  if (!heading) return;

  // Save the original full text (strip any child elements, keep text)
  const fullText = heading.innerText;

  // Clear the heading and set up for typewriter
  heading.innerHTML = '';

  const textNode = document.createElement('span');
  const cursor   = document.createElement('span');
  cursor.className = 'typewriter-cursor';

  heading.appendChild(textNode);
  heading.appendChild(cursor);

  let i = 0;
  const speed = 55; // ms per character

  function type() {
    if (i < fullText.length) {
      textNode.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        cursor.style.transition = 'opacity .5s';
        cursor.style.opacity    = '0';
        setTimeout(() => cursor.remove(), 500);
      }, 2000);
    }
  }

  setTimeout(type, 600);
});