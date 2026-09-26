/* SAHNE 4 — SIRA SIRA (38–56 s)  A bigger rectangle: 9 in a row, 6 rows → 9 × 6 = 54. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const out = 1 - seg(t, 55.8, 56.2);
      const r = LI.drawMain(ctx, env, t, { la: seg(t, 47.6, 48.2) * out, vis: (i, j) => ({ k: seg(t, 43.0 + j * 0.55 + i * 0.05, 43.3 + j * 0.55 + i * 0.05) * out, label: j === 0 ? String(i + 1) : '' }) });
      const L = r.L, u = L.u;
      if (t > 43.2 && F().rest(r.w, r.h) > 0.99) for (let j = 0; j < 6; j++) {
        const k = seg(t, 43.2 + j * 0.55, 43.6 + j * 0.55) * out;
        F().T(ctx, String(j + 1), L.O[0] - 44, L.O[1] - (6 - j) * u + u / 2, Object.assign({ size: 40, alpha: k }, F().AMB));
      }
      if (F().rest(r.w, r.h) > 0.99) F().T(ctx, 'bir sırada 9 kare · 6 sıra', L.O[0] + 4.5 * u, L.O[1] - 6 * u - 44, { size: 44, p: seg(t, 45.0, 46.0), alpha: out, halo: true });
      LI.say(ctx, env, [['9 × 6 = 54', 49.2, 56.0, t, Object.assign({ size: 72 }, F().AMB)], ['A(ABCD) = 54 cm²', 50.6, 56.0, t]]);
    });
  }
  LI.registerScene({ id: 4, start: 38, end: 56, name: 'Row by row', nameTr: 'Sıra sıra', concept: '9 in a row × 6 rows = 54', conceptTr: '9 kare × 6 sıra = 54', render });
})(window.LI = window.LI || {});
