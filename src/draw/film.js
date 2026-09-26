/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   One rectangle (bottom-left corner fixed at O). Its size changes
   between scenes: 5×3 → 9×6 → 7×4 → 5×4. Unit squares fill it in
   different ways: one by one (counting), row by row, or all at once.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  const W = (t) => track([[0, 5], [38.2, 5], [39.4, 9], [56.2, 9], [57.4, 7], [70.2, 7], [71.4, 5], [92, 5]], t);
  const H = (t) => track([[0, 3], [38.2, 3], [39.4, 6], [56.2, 6], [57.4, 4], [92, 4]], t);
  const dims = (t) => [W(t), H(t)];
  const rest = (w, h) => clamp(1 - (Math.abs(w - Math.round(w)) + Math.abs(h - Math.round(h))) * 25);

  function rect(O, u, w, h) { return [O, [O[0] + w * u, O[1]], [O[0] + w * u, O[1] - h * u], [O[0], O[1] - h * u]]; }
  const outline = (ctx, P, o = {}) => Ink.path(ctx, P.concat([P[0]]), { w: o.w ?? 10, p: o.p ?? 1, seed: o.seed ?? 7, taper: [0.02, 0.02], wob: 0.1, dry: 0.3, bleed: 0.5, alpha: o.alpha ?? 1 });

  /** one unit square: top-left (x, y), side u; k = pop-in 0..1 */
  function unit(ctx, x, y, u, k, o = {}) {
    if (k <= 0) return;
    const s = outBack(clamp(k)) * (u - 6), cx = x + u / 2, cy = y + u / 2;
    ctx.fillStyle = `rgba(${LI.AMBER_RGB},${(o.fill ?? 0.3) * clamp(k * 2)})`;
    ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.5 * clamp(k * 2) * (o.alpha ?? 1)})`;
    ctx.lineWidth = 2; ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
    if (o.label) A.text(ctx, o.label, cx, cy + 2, { size: o.size ?? Math.round(u * 0.5), alpha: clamp(k * 2 - 0.6) * (o.alpha ?? 1) });
  }
  /** fill a w×h rectangle at O with unit squares; vis(i, j, n) → { k, label } (i: column, j: row from top, n: reading order) */
  function tiles(ctx, O, u, w, h, vis) {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const v = vis(i, j, j * w + i); if (!v || v.k <= 0) continue;
      unit(ctx, O[0] + i * u, O[1] - (h - j) * u, u, v.k, v);
    }
  }
  /** faint dot grid */
  function grid(ctx, O, u, a, cols = 11, rows = 8) {
    if (a <= 0) return;
    ctx.fillStyle = `rgba(${LI.INK_RGB},${0.28 * a})`;
    for (let i = -1; i <= cols; i++) for (let j = -1; j <= rows; j++) { ctx.beginPath(); ctx.arc(O[0] + i * u, O[1] - j * u, 2.4, 0, Math.PI * 2); ctx.fill(); }
  }
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    const [w, h] = dims(t);
    KD.look(p, [L.O[0] + w * L.u / 2, L.O[1] - h * L.u / 2]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(24.8, 31.6); pointing(43.0, 47.4); pointing(56.2, 57.6); pointing(70.2, 71.6);
    const puz = seg(t, 39.6, 40.0) * (1 - seg(t, 42.6, 42.9));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; p.lookY -= 0.3; }
    if (t > 11.6 && t < 13.4) { p.brow = -0.4; p.mouth = -0.2; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(16.6, 18.2); joy(32.2, 33.8); joy(49.6, 51.2); joy(64.0, 65.6); joy(80.6, 82.2);
    if (t > 85.0) {
      const j = (t - 85.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 21.0, 21.15), hump(t, 35.0, 35.15), hump(t, 53.0, 53.15), hump(t, 61.0, 61.15), hump(t, 77.0, 77.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { W, H, dims, rest, rect, outline, unit, tiles, grid, T, AMB, nokta, base };
})(window.LI = window.LI || {});
