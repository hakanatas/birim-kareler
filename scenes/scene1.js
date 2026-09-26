/* SAHNE 1 — İÇİ NE KADAR? (0–10 s)  Nokta draws a 5 × 3 rectangle. How do we measure the inside? */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  /** the main rectangle. o.vis: tile visibility fn; o.la: side label alpha; o.unit: 'cm' | 'm' */
  LI.drawMain = function (ctx, env, t, o = {}) {
    const L = KD.L(env), u = L.u, [w, h] = F().dims(t);
    const a = t < 17 ? 1 - seg(t, 10.0, 10.5) : seg(t, 24.0, 24.5);
    if (a <= 0) return { a, w, h, L };
    F().grid(ctx, L.O, u, Math.min(seg(t, 3.0, 3.6), a));
    const P = F().rect(L.O, u, w, h), W = Math.round(w), Hh = Math.round(h), r = F().rest(w, h);
    if (o.vis && r > 0.99) F().tiles(ctx, [L.O[0], L.O[1]], u, W, Hh, (i, j, n) => { const v = o.vis(i, j, n, W, Hh); return v && Object.assign(v, { alpha: a }); });
    F().outline(ctx, P, { p: seg(t, 3.3, 5.4), alpha: a });
    const ln = seg(t, 5.6, 6.3) * a;
    [['A', -30, 36], ['B', 30, 36], ['C', 30, -30], ['D', -30, -30]].forEach(([s, dx, dy], i) => F().T(ctx, s, P[i][0] + dx, P[i][1] + dy, { size: 40, alpha: ln, font: 'italic 40px "LI Brush", cursive' }));
    const la = (o.la ?? 0) * r * a, un = o.unit || 'cm';
    if (la > 0) {
      F().T(ctx, `${W} ${un}`, L.O[0] + w * u / 2, L.O[1] + 50, { alpha: la, size: 44 });
      F().T(ctx, `${Hh} ${un}`, L.O[0] + w * u + 70, L.O[1] - h * u / 2, { alpha: la, size: 44 });
    }
    return { a, w, h, L, P };
  };
  /** text lines at the formula spot */
  LI.say = function (ctx, env, lines) {
    const Fp = KD.L(env).F;
    lines.forEach(([s, t0, t1, t, o], i) => F().T(ctx, s, Fp[0], Fp[1] + i * 72, Object.assign({ size: 52, p: LI.E.seg(t, t0, t0 + 0.9), alpha: 1 - LI.E.seg(t, t1 - 0.5, t1), halo: true }, o || {})));
  };
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.drawMain(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'How big inside?', nameTr: 'İçi ne kadar?', concept: 'Area: the inside of a shape', conceptTr: 'Alan: şeklin içi', render });
})(window.LI = window.LI || {});
