/* THE LAB — toybox engine. Classic script (no modules) so it loads even from file://.
   Defines window.LabBoot(THREE|null). THREE comes from the CDN import map in lab.html;
   if it fails, 3D cards show their static fallbacks (the 2D name card still runs). */
(function () {
'use strict';

var FACE_N = 7000;

/* ---------- tiny utils ---------- */
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

function download(url, name) {
  var a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
}

/* ---------- drag-to-rotate + wheel/pinch zoom, shared by every 3D toy ---------- */
function makeOrbit(obj, canvas, opts) {
  opts = opts || {};
  var tRX = opts.rx || 0, tRY = opts.ry || 0, cRX = tRX, cRY = tRY;
  var scale = opts.scale || 1, tScale = scale;
  var zMin = opts.zMin || 0.7, zMax = opts.zMax || 1.6;
  var dragging = false, moved = 0, auto = false, autoSpeed = opts.autoSpeed || 0.3;
  var pointers = new Map(), pinchD0 = 0, pinchS0 = 1;
  canvas.style.touchAction = 'none';

  canvas.addEventListener('pointerdown', function (e) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) { dragging = true; moved = 0; }
    else if (pointers.size === 2) {
      var p = Array.from(pointers.values());
      pinchD0 = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); pinchS0 = tScale; dragging = false;
    }
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!pointers.has(e.pointerId)) return;
    var prev = pointers.get(e.pointerId);
    var dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      var p = Array.from(pointers.values());
      var d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      if (pinchD0 > 0) tScale = clamp(pinchS0 * d / pinchD0, zMin, zMax);
      return;
    }
    if (!dragging) return;
    moved += Math.abs(dx) + Math.abs(dy);
    tRY += dx * 0.0085; tRX = clamp(tRX + dy * 0.0085, -1.25, 1.25);
  });
  function end(e) { pointers.delete(e.pointerId); if (pointers.size === 0) dragging = false; }
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('wheel', function (e) {
    e.preventDefault();
    tScale = clamp(tScale * (e.deltaY > 0 ? 0.92 : 1.08), zMin, zMax);
  }, { passive: false });

  return {
    update: function (dt) {
      if (auto && !dragging && pointers.size === 0) tRY += dt * autoSpeed;
      var k = 1 - Math.pow(0.0001, dt); /* frame-rate independent lerp */
      cRX += (tRX - cRX) * k; cRY += (tRY - cRY) * k; scale += (tScale - scale) * k;
      obj.rotation.set(cRX, cRY, 0); obj.scale.setScalar(scale);
    },
    setAuto: function (b) { auto = !!b; },
    wasClick: function () { return moved < 8; },
    rot: function () { return { x: cRX, y: cRY, scale: scale }; }
  };
}

/* ==================================================================== */
window.LabBoot = function (THREE) {
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MOBILE = window.matchMedia('(max-width: 767px)').matches ||
    (navigator.maxTouchPoints > 0 && Math.min(screen.width, screen.height) < 700);
  var WEBGL = (function () {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  })();
  var HAS3D = !!(THREE && WEBGL);
  var FACE = window.LAB_FACE_DATA || null;
  var FACE_URI = window.LAB_FACE_URI || null;
  var BOOKS = window.LAB_BOOKS || [];

  var api = { THREE: THREE, RM: RM, MOBILE: MOBILE, HAS3D: HAS3D, FACE: FACE, FACE_URI: FACE_URI, BOOKS: BOOKS };

  /* ---------- card registry ---------- */
  var cards = {};   /* id -> {stage, card, handle, active, needs3D, init} */
  var handles = {}; /* id -> handle (debug + snapshot) */
  var renderers = []; /* {r, id, last, dead} */

  function cardErr(id, msg) {
    var c = cards[id]; if (!c) return;
    var p = c.card.querySelector('[data-err]');
    if (p) { p.hidden = false; p.textContent = msg; }
  }
  function showFallback(id, msg) {
    var c = cards[id]; if (!c || c.fbk) return;
    c.fbk = true;
    var f = c.stage.querySelector('.lab-fallback'); if (f) f.hidden = false;
    var btns = c.card.querySelectorAll('.lab-btn, .lab-snap, input[type=range]');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    if (msg) cardErr(id, msg);
  }
  function trackRenderer(r, id) {
    renderers.push({ r: r, id: id, last: performance.now(), dead: false });
    gc();
  }
  function disposeHandle(id) {
    var c = cards[id]; if (!c || !c.handle) return;
    try { c.handle.dispose(); } catch (e) {}
    c.handle.dead = true; c.handle = null; handles[id] = null;
    for (var i = 0; i < renderers.length; i++)
      if (renderers[i].id === id) renderers[i].dead = true;
    renderers = renderers.filter(function (e) { return !e.dead; });
  }
  function gc() {
    var live = renderers.filter(function (e) { return !e.dead; });
    if (live.length <= 6) return;
    live.sort(function (a, b) { return a.last - b.last; });
    for (var i = 0; i < live.length && live.length > 6; i++) {
      if (!cards[live[i].id].active) { disposeHandle(live[i].id); live.splice(i, 1); i--; }
    }
  }
  function touchRenderer(id) {
    for (var i = 0; i < renderers.length; i++)
      if (renderers[i].id === id) renderers[i].last = performance.now();
  }

  function makeRenderer(stage, id) {
    var r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    r.setSize(stage.clientWidth || 300, stage.clientHeight || 200);
    r.domElement.style.display = 'block';
    stage.appendChild(r.domElement);
    r.domElement.addEventListener('webglcontextlost', function (e) {
      e.preventDefault(); disposeHandle(id); showFallback(id, 'Graphics context was lost — static preview shown.');
    });
    trackRenderer(r, id);
    return r;
  }
  window.__labMakeRenderer = makeRenderer; /* shared by the asset initializers below */
  function fitCamera(r, cam, stage) {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  }

  /* ---------- snapshot wiring ---------- */
  document.querySelectorAll('[data-snap]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-snap');
      var h = handles[id];
      if (!h || !h.snapshot) { cardErr(id, 'Snapshot is not available right now.'); return; }
      var url = null;
      try { url = h.snapshot(); } catch (e) { url = null; }
      if (!url) { cardErr(id, 'Snapshot was blocked by this browser.'); return; }
      download(url, 'lab-' + id + '.png');
    });
  });

  /* ---------- asset initializers (defined below) ---------- */
  var INIT = {
    face: initFace, voxel: initVoxel, name: initName, books: initBooks,
    ripple: initRipple, glitch: initGlitch, court: initCourt, rings: initRings
  };
  var NEEDS3D = { face: 1, voxel: 1, name: 0, books: 1, ripple: 1, glitch: 1, court: 1, rings: 1 };

  document.querySelectorAll('.lab-stage').forEach(function (stage) {
    var id = stage.getAttribute('data-asset');
    if (!INIT[id]) return;
    cards[id] = { stage: stage, card: stage.closest('.lab-card'), handle: null, active: false, fbk: false };
  });

  function ensureInit(id) {
    var c = cards[id];
    if (!c || c.handle || c.fbk) return;
    if (NEEDS3D[id] && !HAS3D) {
      showFallback(id, !THREE ? '3D library could not load — static preview shown.' : 'WebGL is unavailable — static preview shown.');
      return;
    }
    if ((id === 'face' || id === 'voxel' || id === 'ripple' || id === 'glitch') && !FACE) {
      showFallback(id, 'Portrait data failed to load — static preview shown.'); return;
    }
    if (id === 'books' && !BOOKS.length) { showFallback(id, 'Book data failed to load — static preview shown.'); return; }
    try {
      var h = INIT[id](c.stage, api, c.card, id);
      if (!h) { showFallback(id); return; }
      h.dead = false; c.handle = h; handles[id] = h;
      if (h.renderer) touchRenderer(id);
    } catch (err) { showFallback(id, 'This toy failed to start — static preview shown.'); }
  }

  /* ---------- one global rAF for every toy ---------- */
  var lastT = performance.now();
  function loop(now) {
    var dt = Math.min((now - lastT) / 1000, 0.05); lastT = now;
    for (var id in cards) {
      var c = cards[id];
      if (c.handle && !c.handle.dead && c.active) {
        try { c.handle.tick(dt, now / 1000); } catch (e) {}
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* ---------- lazy init + visibility gating ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var id = en.target.getAttribute('data-asset');
      var c = cards[id]; if (!c) return;
      if (en.isIntersecting) {
        ensureInit(id);
        if (!c.active && c.handle && !c.handle.dead) {
          c.active = true; touchRenderer(id);
          if (c.handle.setActive) { try { c.handle.setActive(true); } catch (e) {} }
        }
      } else if (c.active) {
        c.active = false;
        if (c.handle && c.handle.setActive) { try { c.handle.setActive(false); } catch (e) {} }
        gc();
      }
    });
  }, { rootMargin: '400px 0px' });
  Object.keys(cards).forEach(function (id) { io.observe(cards[id].stage); });

  /* ---------- debug surface (verification) ---------- */
  window.LabDebug = { cards: cards, handles: handles, api: api, has3d: HAS3D };
};

/* ==================================================================== */
/* A · FACE ASSEMBLY — thousands of particles build his face, then you grab it */
function initFace(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 0, 4.6);
  var group = new THREE.Group(); scene.add(group);

  var src = api.FACE.points;
  var N = api.MOBILE ? 3500 : Math.min(7000, src.length);
  var step = Math.max(1, Math.floor(src.length / N)); N = Math.floor(src.length / step);
  var pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  var target = new Float32Array(N * 3), start = new Float32Array(N * 3);
  var sdir = new Float32Array(N * 3), srad = new Float32Array(N);
  var delay = new Float32Array(N), dur = new Float32Array(N), perp = new Float32Array(N * 3);
  var params = { spread: 1.7, speed: 1, size: api.MOBILE ? 0.024 : 0.02 };
  var S = 1.55; /* face world scale */

  for (var i = 0; i < N; i++) {
    var p = src[i * step];
    target[i * 3] = p[0] * S; target[i * 3 + 1] = p[1] * S; target[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    col[i * 3] = p[2]; col[i * 3 + 1] = p[3]; col[i * 3 + 2] = p[4];
    var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    sdir[i * 3] = Math.sin(ph) * Math.cos(th); sdir[i * 3 + 1] = Math.cos(ph); sdir[i * 3 + 2] = Math.sin(ph) * Math.sin(th);
    srad[i] = 1.4 + Math.random() * 2.4;
    var px = Math.random() - 0.5, py = Math.random() - 0.5, pz = Math.random() - 0.5;
    var pl = Math.hypot(px, py, pz) || 1;
    perp[i * 3] = px / pl; perp[i * 3 + 1] = py / pl; perp[i * 3 + 2] = pz / pl;
  }
  function scatterPos(i, out) {
    out = out || [0, 0, 0];
    var k = srad[i] * params.spread;
    out[0] = sdir[i * 3] * k; out[1] = sdir[i * 3 + 1] * k; out[2] = sdir[i * 3 + 2] * k * 0.8;
    return out;
  }
  var tmp = [0, 0, 0];
  for (var j = 0; j < N; j++) { scatterPos(j, tmp); pos[j * 3] = tmp[0]; pos[j * 3 + 1] = tmp[1]; pos[j * 3 + 2] = tmp[2]; }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  var mat = new THREE.PointsMaterial({ size: params.size, vertexColors: true, sizeAttenuation: true });
  var points = new THREE.Points(geo, mat);
  group.add(points);

  var orbit = makeOrbit(group, r.domElement, { autoSpeed: 0.35, zMin: 0.7, zMax: 1.6 });
  var state = 'scattered', t0 = 0;
  var btnS = card.querySelector('[data-act="scatter"]');
  var btnA = card.querySelector('[data-act="assemble"]');
  function paintButtons() { /* both buttons always live: SCATTER/ASSEMBLE work mid-flight, reversing from current positions */ }
  function fly(toTarget) {
    for (var i = 0; i < N; i++) {
      start[i * 3] = pos[i * 3]; start[i * 3 + 1] = pos[i * 3 + 1]; start[i * 3 + 2] = pos[i * 3 + 2];
      delay[i] = Math.random() * 0.9; dur[i] = 1.1 + Math.random() * 0.9;
    }
    t0 = performance.now() / 1000; state = toTarget ? 'assembling' : 'scattering'; paintButtons();
  }
  if (btnS) btnS.addEventListener('click', function () { fly(false); });
  if (btnA) btnA.addEventListener('click', function () { fly(true); });
  card.querySelectorAll('input[type=range]').forEach(function (el) {
    el.addEventListener('input', function () {
      var k = el.getAttribute('data-param'), v = parseFloat(el.value);
      if (k === 'spread') { params.spread = v; if (state === 'scattered') { for (var i = 0; i < N; i++) { scatterPos(i, tmp); pos[i*3]=tmp[0]; pos[i*3+1]=tmp[1]; pos[i*3+2]=tmp[2]; } geo.attributes.position.needsUpdate = true; } }
      else if (k === 'speed') params.speed = v;
      else if (k === 'size') { params.size = 0.02 * v * (api.MOBILE ? 1.2 : 1); mat.size = params.size; }
    });
  });

  if (api.RM) {
    for (var q = 0; q < N; q++) { pos[q * 3] = target[q * 3]; pos[q * 3 + 1] = target[q * 3 + 1]; pos[q * 3 + 2] = target[q * 3 + 2]; }
    geo.attributes.position.needsUpdate = true; state = 'assembled';
  } else {
    setTimeout(function () { if (state === 'scattered') fly(true); }, 500);
  }
  paintButtons();

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  var tmpV = [0, 0, 0];
  function tick(dt) {
    var now = performance.now() / 1000;
    if (state === 'assembling' || state === 'scattering') {
      var e = (now - t0) * params.speed, done = true;
      var toT = (state === 'assembling');
      for (var i = 0; i < N; i++) {
        var tt = (e - delay[i]) / dur[i], ix = i * 3;
        var ax, ay, az;
        if (tt <= 0) { ax = start[ix]; ay = start[ix + 1]; az = start[ix + 2]; done = false; }
        else if (tt >= 1) {
          if (toT) { ax = target[ix]; ay = target[ix + 1]; az = target[ix + 2]; }
          else { scatterPos(i, tmpV); ax = tmpV[0]; ay = tmpV[1]; az = tmpV[2]; }
        } else {
          done = false;
          var k = easeInOutCubic(tt), sw = Math.sin(k * Math.PI) * 0.35;
          var ex, ey, ez;
          if (toT) { ex = target[ix]; ey = target[ix + 1]; ez = target[ix + 2]; }
          else { scatterPos(i, tmpV); ex = tmpV[0]; ey = tmpV[1]; ez = tmpV[2]; }
          ax = start[ix] + (ex - start[ix]) * k + perp[ix] * sw;
          ay = start[ix + 1] + (ey - start[ix + 1]) * k + perp[ix + 1] * sw;
          az = start[ix + 2] + (ez - start[ix + 2]) * k + perp[ix + 2] * sw;
        }
        pos[ix] = ax; pos[ix + 1] = ay; pos[ix + 2] = az;
      }
      geo.attributes.position.needsUpdate = true;
      if (done) { state = toT ? 'assembled' : 'scattered'; paintButtons(); }
    }
    orbit.setAuto(state === 'assembled' && !api.RM);
    orbit.update(dt);
    r.render(scene, cam);
  }
  return {
    renderer: r, group: group, orbit: orbit,
    tick: tick,
    setActive: function () {},
    getState: function () { return state; },
    doScatter: function () { if (state === 'assembled') fly(false); },
    doAssemble: function () { if (state === 'scattered') fly(true); },
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); geo.dispose(); mat.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

/* ==================================================================== */
/* B · VOXEL HEAD — his face as chunky cubes; click to explode */
function initVoxel(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 0.1, 4.4);
  var group = new THREE.Group(); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  var dl = new THREE.DirectionalLight(0xfff2cc, 1.4); dl.position.set(2.5, 3, 4); scene.add(dl);
  var dl2 = new THREE.DirectionalLight(0xffc400, 0.35); dl2.position.set(-3, -1, 2); scene.add(dl2);

  var cells = api.FACE.voxel, n = cells.length, SC = 1.5;
  var geo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
  var mat = new THREE.MeshLambertMaterial();
  var mesh = new THREE.InstancedMesh(geo, mat, n);
  var dummy = new THREE.Object3D();
  var base = new Float32Array(n * 3), cur = new Float32Array(n * 3), vel = new Float32Array(n * 3);
  var c = new THREE.Color();
  for (var i = 0; i < n; i++) {
    var v = cells[i];
    base[i * 3] = v[0] * SC; base[i * 3 + 1] = v[1] * SC; base[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
    cur[i * 3] = base[i * 3]; cur[i * 3 + 1] = base[i * 3 + 1]; cur[i * 3 + 2] = base[i * 3 + 2];
    dummy.position.set(base[i * 3], base[i * 3 + 1], base[i * 3 + 2]);
    dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, c.setRGB(v[2], v[3], v[4]));
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);

  var orbit = makeOrbit(group, r.domElement, { autoSpeed: 0.3, rx: -0.08 });
  orbit.setAuto(!api.RM);
  var exploding = false;
  function explode() {
    for (var i = 0; i < n; i++) {
      var ix = i * 3;
      var dx = base[ix] + (Math.random() - 0.5) * 0.6, dy = base[ix + 1] + (Math.random() - 0.5) * 0.6, dz = base[ix + 2] + (Math.random() - 0.5) * 0.6;
      var l = Math.hypot(dx, dy, dz) || 1, sp = 2.2 + Math.random() * 3.2;
      vel[ix] = dx / l * sp; vel[ix + 1] = dy / l * sp; vel[ix + 2] = dz / l * sp;
    }
    exploding = true;
  }
  var btn = card.querySelector('[data-act="explode"]');
  if (btn) btn.addEventListener('click', explode);
  r.domElement.addEventListener('pointerup', function () { if (orbit.wasClick()) explode(); });

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  function tick(dt) {
    if (exploding) {
      var maxV = 0, damp = Math.exp(-2.4 * dt), k = 26 * dt;
      for (var i = 0; i < n; i++) {
        var ix = i * 3;
        vel[ix] = (vel[ix] + (base[ix] - cur[ix]) * k) * damp;
        vel[ix + 1] = (vel[ix + 1] + (base[ix + 1] - cur[ix + 1]) * k) * damp;
        vel[ix + 2] = (vel[ix + 2] + (base[ix + 2] - cur[ix + 2]) * k) * damp;
        cur[ix] += vel[ix] * dt; cur[ix + 1] += vel[ix + 1] * dt; cur[ix + 2] += vel[ix + 2] * dt;
        var sp = Math.abs(vel[ix]) + Math.abs(vel[ix + 1]) + Math.abs(vel[ix + 2]);
        if (sp > maxV) maxV = sp;
        dummy.position.set(cur[ix], cur[ix + 1], cur[ix + 2]);
        dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (maxV < 0.02) {
        exploding = false;
        for (var j = 0; j < n; j++) {
          dummy.position.set(base[j * 3], base[j * 3 + 1], base[j * 3 + 2]);
          dummy.updateMatrix(); mesh.setMatrixAt(j, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }
    }
    orbit.update(dt);
    r.render(scene, cam);
  }
  return {
    renderer: r, group: group, orbit: orbit, tick: tick,
    setActive: function () {}, explode: explode,
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); geo.dispose(); mat.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

/* ==================================================================== */
/* C · PARTICLE NAME — "KIMINOU" in gold dust (2D canvas, no three.js needed) */
function initName(stage, api, card) {
  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-label', 'The name Kiminou formed from gold particles. Move your pointer through it.');
  stage.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  if (!ctx) return null;
  var W = 0, H = 0, parts = [], built = false;
  var mx = -9999, my = -9999;

  function build() {
    W = stage.clientWidth || 300; H = stage.clientHeight || 200;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = '100%'; canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var off = document.createElement('canvas');
    var fs = Math.min(W / 4.6, H * 0.52);
    off.width = W; off.height = H;
    var octx = off.getContext('2d');
    octx.fillStyle = '#fff'; octx.textAlign = 'center'; octx.textBaseline = 'middle';
    octx.font = '400 ' + fs + 'px Anton, "Arial Black", sans-serif';
    octx.fillText('KIMINOU', W / 2, H / 2 + fs * 0.04);
    var data = octx.getImageData(0, 0, W, H).data;
    var step = api.MOBILE ? 5 : 4;
    parts = [];
    for (var y = 0; y < H; y += step) for (var x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        parts.push({
          hx: x, hy: y, x: x + (Math.random() - 0.5) * 8, y: y + (Math.random() - 0.5) * 8,
          vx: 0, vy: 0, s: 1 + Math.random() * 1.6, l: 42 + Math.random() * 18
        });
      }
    }
    built = true; draw(0);
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      ctx.fillStyle = 'hsl(45,100%,' + p.l.toFixed(0) + '%)';
      ctx.fillRect(p.x, p.y, p.s, p.s);
    }
  }
  function tick() {
    if (!built) return;
    var R = 110, R2 = R * R;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 0.01) {
        var d = Math.sqrt(d2), f = (1 - d / R) * 2.4;
        p.vx += dx / d * f; p.vy += dy / d * f;
      }
      p.vx += (p.hx - p.x) * 0.055; p.vy += (p.hy - p.y) * 0.055;
      p.vx *= 0.88; p.vy *= 0.88;
      p.x += p.vx; p.y += p.vy;
    }
    draw();
  }
  function setPointer(e) {
    var b = canvas.getBoundingClientRect();
    mx = e.clientX - b.left; my = e.clientY - b.top;
  }
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointermove', setPointer);
  canvas.addEventListener('pointerdown', setPointer);
  canvas.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });

  var started = false;
  function boot() { if (!started) { started = true; build(); } }
  if (document.fonts && document.fonts.ready) {
    var done = false;
    document.fonts.ready.then(function () { if (!done) { done = true; boot(); } });
    setTimeout(function () { if (!done) { done = true; boot(); } }, 1800);
  } else boot();
  var ro = new ResizeObserver(function () { started = false; boot(); });
  ro.observe(stage);

  if (api.RM) { /* static until the user moves through it — tick still runs on pointer, cheap */ }
  return {
    tick: tick, setActive: function () {},
    snapshot: function () { if (!built) build(); draw(); return canvas.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); canvas.remove(); }
  };
}

/* ==================================================================== */
/* D · BOOK TOWER — all ten real covers as 3D books */
function initBooks(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(36, W / H, 0.1, 60);
  cam.position.set(0, 0.7, 7.2); cam.lookAt(0, 0, 0);
  var group = new THREE.Group(); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 0.95));
  var dl = new THREE.DirectionalLight(0xfff2cc, 1.1); dl.position.set(3, 4, 5); scene.add(dl);

  var caption = card.querySelector('[data-caption]');
  var loader = new THREE.TextureLoader();
  var books = [], selected = null;
  var spineMat = new THREE.MeshLambertMaterial({ color: 0x1a1c0e });
  var edgeMat = new THREE.MeshLambertMaterial({ color: 0x2a2d16 });
  api.BOOKS.forEach(function (b, i) {
    var tex = loader.load(b.cover);
    tex.colorSpace = THREE.SRGBColorSpace;
    var coverMat = new THREE.MeshLambertMaterial({ map: tex });
    var geo = new THREE.BoxGeometry(1.35, 2.0, 0.16);
    var mesh = new THREE.Mesh(geo, [spineMat, spineMat, edgeMat, edgeMat, coverMat, coverMat]);
    var off = i - (api.BOOKS.length - 1) / 2;
    mesh.position.set(off * 0.78, 0, Math.abs(off) * 0.3 - 0.4);
    mesh.rotation.y = off * -0.13;
    mesh.userData = { book: b, baseZ: mesh.position.z, baseY: 0, lift: 0, idx: i };
    group.add(mesh); books.push(mesh);
  });
  /* gold base line */
  var baseGeo = new THREE.BoxGeometry(9.4, 0.05, 0.7);
  var baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshBasicMaterial({ color: 0xffc400 }));
  baseMesh.position.y = -1.08; group.add(baseMesh);

  var orbit = makeOrbit(group, r.domElement, { autoSpeed: 0.22, rx: 0.06, zMin: 0.75, zMax: 1.5 });
  orbit.setAuto(!api.RM);

  var ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  function pick(e) {
    var b = r.domElement.getBoundingClientRect();
    ptr.x = ((e.clientX - b.left) / b.width) * 2 - 1;
    ptr.y = -((e.clientY - b.top) / b.height) * 2 + 1;
    ray.setFromCamera(ptr, cam);
    var hits = ray.intersectObjects(books);
    return hits.length ? hits[0].object : null;
  }
  function select(mesh) {
    selected = mesh;
    if (caption) caption.textContent = mesh ? ('0' + (mesh.userData.idx + 1)).slice(-2) + ' — ' + mesh.userData.book.title.toUpperCase() : '';
  }
  r.domElement.addEventListener('pointerup', function (e) {
    if (!orbit.wasClick()) return;
    var m = pick(e);
    select(m === selected ? null : m);
  });
  r.domElement.addEventListener('dblclick', function (e) {
    var m = pick(e);
    if (m && m.userData.book.url) window.open(m.userData.book.url, '_blank', 'noopener');
  });

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  function tick(dt) {
    var k = 1 - Math.pow(0.0001, dt);
    books.forEach(function (m) {
      var want = (m === selected) ? 1 : 0;
      m.userData.lift += (want - m.userData.lift) * k;
      m.position.z = m.userData.baseZ + m.userData.lift * 1.5;
      m.position.y = m.userData.baseY + m.userData.lift * 0.25;
    });
    orbit.update(dt);
    r.render(scene, cam);
  }
  return {
    renderer: r, group: group, orbit: orbit, tick: tick,
    setActive: function () {}, select: select, books: books,
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () {
      ro.disconnect();
      books.forEach(function (m) { m.geometry.dispose(); m.material.forEach(function (mm) { if (mm.map) mm.map.dispose(); mm.dispose(); }); });
      baseGeo.dispose(); r.dispose(); r.domElement.remove();
    }
  };
}

/* ==================================================================== */
/* E · RIPPLE PORTRAIT — touch the face, ripples roll through it */
function initRipple(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 0, 4.2);

  var tex = new THREE.TextureLoader().load(api.FACE_URI);
  tex.colorSpace = THREE.SRGBColorSpace;
  var ripples = [];
  for (var i = 0; i < 8; i++) ripples.push(new THREE.Vector4(0.5, 0.5, -100, 0));
  var mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, time: { value: 0 }, rip: { value: ripples } },
    transparent: true,
    vertexShader: [
      'uniform float time; uniform vec4 rip[8]; varying vec2 vUv;',
      'void main(){ vUv = uv; vec3 p = position; float z = 0.0;',
      ' for(int i=0;i<8;i++){ vec4 R = rip[i];',
      '  float age = time - R.z;',
      '  if(R.w > 0.001 && age > 0.0 && age < 6.0){',
      '   float d = distance(uv, R.xy);',
      '   z += sin(d*42.0 - age*11.0) * exp(-d*4.5) * exp(-age*1.8) * R.w; } }',
      ' p.z += z * 0.4; gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0); }'
    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D map; varying vec2 vUv;',
      'void main(){ vec4 c = texture2D(map, vUv); if(c.a < 0.15) discard; gl_FragColor = c; }'
    ].join('\n')
  });
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.9, 56, 56), mat);
  scene.add(plane);

  var ri = 0, clock = 0;
  function splash(clientX, clientY) {
    var b = r.domElement.getBoundingClientRect();
    var u = (clientX - b.left) / b.width, v = 1 - (clientY - b.top) / b.height;
    ripples[ri].set(u, v, clock, 0.9); ri = (ri + 1) % 8;
  }
  r.domElement.addEventListener('pointerdown', function (e) { splash(e.clientX, e.clientY); });
  r.domElement.addEventListener('pointermove', function (e) { if (e.buttons) splash(e.clientX, e.clientY); });

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  return {
    renderer: r, tick: function (dt) { clock += dt; mat.uniforms.time.value = clock; r.render(scene, cam); },
    setActive: function () {}, splash: splash,
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); plane.geometry.dispose(); mat.dispose(); tex.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

/* ==================================================================== */
/* F · GLITCH PORTRAIT — RGB split + slice tears on demand */
function initGlitch(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 0, 4.2);

  var tex = new THREE.TextureLoader().load(api.FACE_URI);
  tex.colorSpace = THREE.SRGBColorSpace;
  var mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, time: { value: 0 }, amt: { value: 0 } },
    transparent: true,
    vertexShader: [
      'varying vec2 vUv;',
      'void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }'
    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D map; uniform float time; uniform float amt; varying vec2 vUv;',
      'float rnd(float n){ return fract(sin(n)*43758.5453); }',
      'void main(){',
      ' vec2 uv = vUv;',
      ' float band = floor(uv.y*26.0);',
      ' float shift = (rnd(band + floor(time*9.0)) - 0.5) * 0.32 * amt;',
      ' float tear = step(0.93, rnd(band*7.0 + floor(time*5.0))) * amt;',
      ' uv.x += shift + tear * 0.18 * sign(rnd(band*3.0) - 0.5);',
      ' vec4 c;',
      ' c.r = texture2D(map, vec2(uv.x + 0.014*amt, uv.y)).r;',
      ' c.g = texture2D(map, uv).g;',
      ' c.b = texture2D(map, vec2(uv.x - 0.014*amt, uv.y)).b;',
      ' c.a = texture2D(map, uv).a;',
      ' c.rgb *= 1.0 - 0.14*amt*step(0.5, fract(uv.y*110.0));',
      ' if(c.a < 0.15) discard;',
      ' gl_FragColor = c; }'
    ].join('\n')
  });
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 2.9), mat);
  scene.add(plane);

  function glitch() { mat.uniforms.amt.value = 1; }
  var btn = card.querySelector('[data-act="glitch"]');
  if (btn) btn.addEventListener('click', glitch);
  r.domElement.addEventListener('pointerdown', glitch);

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  var clock = 0;
  return {
    renderer: r, tick: function (dt) {
      clock += dt; mat.uniforms.time.value = clock;
      var a = mat.uniforms.amt.value;
      if (a > 0.003) mat.uniforms.amt.value = a * Math.pow(0.02, dt); else mat.uniforms.amt.value = 0;
      r.render(scene, cam);
    },
    setActive: function () {}, glitch: glitch,
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); plane.geometry.dispose(); mat.dispose(); tex.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

/* ==================================================================== */
/* G · GOLD COURT — half-court line drawing in light + gold dust halo */
function initCourt(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 2.6, 4.6); cam.lookAt(0, 0, 0);
  var group = new THREE.Group(); scene.add(group);

  var pts = [];
  function seg(ax, az, bx, bz) { pts.push(ax, 0.02, az, bx, 0.02, bz); }
  function rect(x0, z0, x1, z1) { seg(x0,z0,x1,z0); seg(x1,z0,x1,z1); seg(x1,z1,x0,z1); seg(x0,z1,x0,z0); }
  function circle(cx, cz, rad, n) {
    n = n || 40;
    for (var i = 0; i < n; i++) {
      var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2;
      seg(cx + Math.cos(a0) * rad, cz + Math.sin(a0) * rad, cx + Math.cos(a1) * rad, cz + Math.sin(a1) * rad);
    }
  }
  function arc(cx, cz, rad, a0, a1, n) {
    n = n || 28;
    for (var i = 0; i < n; i++) {
      var t0 = a0 + (a1 - a0) * i / n, t1 = a0 + (a1 - a0) * (i + 1) / n;
      seg(cx + Math.cos(t0) * rad, cz + Math.sin(t0) * rad, cx + Math.cos(t1) * rad, cz + Math.sin(t1) * rad);
    }
  }
  rect(-2.4, -1.7, 2.4, 1.7);            /* boundary */
  seg(-2.4, 0, 2.4, 0);                   /* half line */
  circle(0, 0, 0.42);                     /* center circle */
  [1, -1].forEach(function (s) {
    rect(-0.55, s * 1.7, 0.55, s * 0.75); /* key */
    circle(0, s * 0.75, 0.32, 28);        /* free-throw circle */
    arc(0, s * 1.5, 2.05, Math.PI - 1.15, Math.PI + 1.15); /* three-point arc */
    seg(1.87, s * 0.66, 1.87, s * 1.7); seg(-1.87, s * 0.66, -1.87, s * 1.7); /* corner lines */
    seg(-0.35, s * 1.7, 0.35, s * 1.7);   /* baseline tick under hoop */
  });
  var lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
  group.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xffc400, transparent: true, opacity: 0.95 })));

  /* gold dust halo */
  var hn = api.MOBILE ? 250 : 500, hp = new Float32Array(hn * 3);
  for (var i = 0; i < hn; i++) {
    var a = Math.random() * Math.PI * 2, rad = 2.7 + Math.random() * 1.1;
    hp[i * 3] = Math.cos(a) * rad; hp[i * 3 + 1] = Math.random() * 2.2 - 0.4; hp[i * 3 + 2] = Math.sin(a) * rad;
  }
  var hg = new THREE.BufferGeometry();
  hg.setAttribute('position', new THREE.BufferAttribute(hp, 3));
  var halo = new THREE.Points(hg, new THREE.PointsMaterial({ color: 0xffc400, size: 0.035, transparent: true, opacity: 0.75 }));
  group.add(halo);

  var orbit = makeOrbit(group, r.domElement, { autoSpeed: 0.25, rx: 0.12 });
  orbit.setAuto(!api.RM);

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  return {
    renderer: r, group: group, orbit: orbit,
    tick: function (dt) { if (!api.RM) halo.rotation.y += dt * 0.35; orbit.update(dt); r.render(scene, cam); },
    setActive: function () {},
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); lg.dispose(); hg.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

/* ==================================================================== */
/* H · ORBIT RINGS — trophy-gold basketball with three tilted rings */
function initRings(stage, api, card, id) {
  var THREE = api.THREE;
  var r = window.__labMakeRenderer(stage, id);
  var W = stage.clientWidth || 300, H = stage.clientHeight || 200;
  var scene = new THREE.Scene();
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
  cam.position.set(0, 0.4, 5.2); cam.lookAt(0, 0, 0);
  var group = new THREE.Group(); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  var dl = new THREE.DirectionalLight(0xfff2cc, 1.5); dl.position.set(3, 4, 5); scene.add(dl);

  /* procedural basketball texture — gold leather, ink seams */
  var bc = document.createElement('canvas'); bc.width = 512; bc.height = 256;
  var b = bc.getContext('2d');
  b.fillStyle = '#c9920a'; b.fillRect(0, 0, 512, 256);
  var grd = b.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, 'rgba(255,255,255,0.16)'); grd.addColorStop(0.5, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(0,0,0,0.28)');
  b.fillStyle = grd; b.fillRect(0, 0, 512, 256);
  b.strokeStyle = '#101400'; b.lineWidth = 7;
  b.beginPath(); b.moveTo(256, 0); b.lineTo(256, 256); b.stroke();       /* vertical seam */
  b.beginPath(); b.moveTo(0, 128); b.lineTo(512, 128); b.stroke();       /* horizontal seam */
  b.beginPath(); b.arc(128, 128, 150, -0.7, 0.7); b.stroke();           /* left curve */
  b.beginPath(); b.arc(384, 128, 150, Math.PI - 0.7, Math.PI + 0.7); b.stroke(); /* right curve */
  var ballTex = new THREE.CanvasTexture(bc); ballTex.colorSpace = THREE.SRGBColorSpace;
  var ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 48, 32),
    new THREE.MeshStandardMaterial({ map: ballTex, roughness: 0.5, metalness: 0.25 })
  );
  group.add(ball);
  var ringMat = new THREE.MeshBasicMaterial({ color: 0xffc400, transparent: true, opacity: 0.9 });
  var rings = [];
  [[1.15, 0.2, 0.45], [0.45, 0.5, 1.2], [-0.5, 1.0, 0.3]].forEach(function (e, i) {
    var ring = new THREE.Mesh(new THREE.TorusGeometry(1.5 + i * 0.14, 0.022, 12, 110), ringMat);
    ring.rotation.set(e[0], e[1], e[2]); group.add(ring); rings.push(ring);
  });

  var orbit = makeOrbit(group, r.domElement, { autoSpeed: 0.4 });
  orbit.setAuto(!api.RM);

  var ro = new ResizeObserver(function () {
    var w = stage.clientWidth || 300, h = stage.clientHeight || 200;
    r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix();
  });
  ro.observe(stage);

  return {
    renderer: r, group: group, orbit: orbit,
    tick: function (dt) {
      if (!api.RM) { ball.rotation.y += dt * 0.5; rings[0].rotation.z += dt * 0.22; rings[2].rotation.z -= dt * 0.15; }
      orbit.update(dt); r.render(scene, cam);
    },
    setActive: function () {},
    snapshot: function () { return r.domElement.toDataURL('image/png'); },
    dispose: function () { ro.disconnect(); ballTex.dispose(); r.dispose(); r.domElement.remove(); }
  };
}

})();
