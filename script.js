/* YK Apps: progressive enhancement. No dependencies, cookies or network calls. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('#main-nav');
  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    };
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu(); menuButton.focus();
      }
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.site-header')) closeMenu();
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);
  }

  // Real store links are optional. No destination is fabricated when missing.
  document.querySelectorAll('[data-app-store]').forEach(link => {
    const value = window.YK_SITE_CONFIG?.apps?.[link.dataset.appStore]?.appStoreUrl;
    if (typeof value !== 'string' || !value) return;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'apps.apple.com') return;
      link.href = url.href;
      link.hidden = false;
    } catch (_) { /* Leave an invalid or unfinished URL unpublished. */ }
  });

  async function copyText(text) {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text); return true;
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { /* Manual fallback below. */ }
      ta.remove(); return ok;
    }
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const original = button.innerHTML;
      const success = await copyText(button.dataset.copy);
      button.textContent = success ? 'Email copied' : button.dataset.copy;
      const status = document.querySelector('#copy-status');
      if (status) status.textContent = success ? 'Email address copied to clipboard.' : 'Select and copy the email address above.';
      setTimeout(() => { button.innerHTML = original; }, 2500);
    });
  });

  const form = document.querySelector('[data-support-form]');
  if (form) {
    form.hidden = false;
    const status = document.querySelector('#form-status');
    const copyDraft = document.querySelector('[data-copy-draft]');
    let draft = '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const app = String(values.get('app') || 'YK Apps');
      const topic = String(values.get('topic') || 'App help');
      const device = String(values.get('device') || 'Not specified').trim();
      const message = String(values.get('message') || '').trim();
      const subject = `${app}: ${topic}`;
      draft = `App: ${app}\nTopic: ${topic}\nDevice / software version: ${device}\n\n${message}`;
      const mailto = `mailto:support@ykapps.ist?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;
      status.textContent = 'Your email app will open with a draft. Send it there. Nothing has been sent from this website.';
      copyDraft.hidden = false;
      // A mailto draft is not a submitted support ticket.
      window.location.href = mailto;
    });
    copyDraft.addEventListener('click', async () => {
      const success = await copyText(draft);
      status.textContent = success ? 'Draft copied. Paste it into an email to support@ykapps.ist.' : 'Copy your message from the form and email support@ykapps.ist.';
    });
  }

  // A real, local-only lettering demo, not a font generator or screenshot.
  const canvas = document.querySelector('#drawingCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  document.querySelectorAll('[data-drawing-controls]').forEach(el => { el.hidden = false; });
  const status = document.querySelector('#pad-status');
  const undo = document.querySelector('[data-undo]');
  let strokes = [], active = null, selectedColor = '#12251D', ratio = 1;
  const logicalWidth = 640, logicalHeight = 400;
  let pointerId = null;
  function drawStroke(stroke) {
    if (!stroke || !stroke.points.length) return;
    ctx.strokeStyle = stroke.color; ctx.fillStyle = stroke.color;
    ctx.lineWidth = stroke.width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const pts = stroke.points;
    if (pts.length === 1) {
      ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, stroke.width / 2, 0, Math.PI * 2); ctx.fill(); return;
    }
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i + 1].x) / 2, (pts[i].y + pts[i + 1].y) / 2);
    }
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y); ctx.stroke();
  }
  function redraw() {
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.setTransform(canvas.width / logicalWidth,0,0,canvas.height / logicalHeight,0,0);
    strokes.forEach(drawStroke); drawStroke(active);
    undo.disabled = !strokes.length;
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect(); ratio = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio)); redraw();
  }
  function point(e) {
    const r = canvas.getBoundingClientRect();
    return { x: Math.max(0, Math.min(logicalWidth, (e.clientX-r.left)/r.width*logicalWidth)), y: Math.max(0, Math.min(logicalHeight, (e.clientY-r.top)/r.height*logicalHeight)) };
  }
  canvas.addEventListener('pointerdown', e => {
    if (active || (e.pointerType === 'mouse' && e.button !== 0)) return;
    e.preventDefault(); pointerId = e.pointerId; canvas.setPointerCapture(pointerId);
    active = { color: selectedColor, width: 7, points: [point(e)] }; redraw();
  });
  canvas.addEventListener('pointermove', e => {
    if (!active || e.pointerId !== pointerId) return;
    e.preventDefault();
    const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [e];
    (events.length ? events : [e]).forEach(ev => active.points.push(point(ev))); redraw();
  });
  function finish(e) {
    if (!active || e.pointerId !== pointerId) return;
    strokes.push(active); active = null; pointerId = null;
    if (strokes.length > 150) strokes.shift();
    redraw(); status.textContent = 'Your drawing stays in this browser tab.';
  }
  canvas.addEventListener('pointerup', finish);
  canvas.addEventListener('pointercancel', finish);
  canvas.addEventListener('lostpointercapture', finish);
  document.querySelectorAll('[data-pen-color]').forEach(button => {
    button.addEventListener('click', () => {
      selectedColor = button.dataset.penColor;
      document.querySelectorAll('[data-pen-color]').forEach(b => b.setAttribute('aria-pressed', String(b===button)));
    });
  });
  undo.addEventListener('click', () => { strokes.pop(); redraw(); status.textContent = 'Last stroke removed.'; });
  document.querySelector('[data-clear]').addEventListener('click', () => { strokes = []; active = null; redraw(); status.textContent = 'Sketchpad cleared.'; });
  document.querySelector('[data-sample]').addEventListener('click', () => {
    strokes = [
      {color:selectedColor,width:7,points:[{x:211,y:326},{x:237,y:232},{x:283,y:119},{x:343,y:64},{x:362,y:173},{x:386,y:261},{x:417,y:322}]},
      {color:selectedColor,width:7,points:[{x:251,y:236},{x:307,y:225},{x:369,y:218},{x:411,y:225}]}
    ]; redraw(); status.textContent = 'Sample A drawn. Add a stroke or save the sketch.';
  });
  document.querySelector('[data-save-sketch]').addEventListener('click', () => {
    if (!strokes.length) { status.textContent = 'Draw something first, or use the sample A.'; return; }
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1280; exportCanvas.height = 800;
    const context = exportCanvas.getContext('2d');
    context.fillStyle = '#FCFFF8'; context.fillRect(0,0,1280,800);
    context.drawImage(canvas,0,0,1280,800);
    exportCanvas.toBlob(blob => {
      if (!blob) { status.textContent = 'The sketch could not be saved. Please try again.'; return; }
      const url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = 'my-lettering-sketch.png'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      status.textContent = 'Sketch saved as a PNG image, not a font file.';
    }, 'image/png');
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(canvas.parentElement);
  else window.addEventListener('resize', resize);
  resize();
})();
