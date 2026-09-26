/* SAHNE 7 — KAPANIŞ (84–92 s)  One sentence to remember; Nokta celebrates. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.drawM2(ctx, env, t);
      LI.say(ctx, env, [['Alan =', 84.4, 99, t, { size: 48 }], ['uzun kenar × kısa kenar', 84.8, 99, t, Object.assign({ size: 44 }, F().AMB)]]);
    });
    const k = seg(t, 85.4, 87.4);
    if (k > 0 && t < 91) {
      const n = F().nokta(t, env), C = [n.x, n.y - 170];
      [30, 60, 90, 120, 150].forEach((d, i) => {
        const r = 150 + 30 * Math.sin(t * 2 + i);
        A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
      });
    }
  }
  LI.registerScene({ id: 7, start: 84, end: 92, name: 'Remember', nameTr: 'Aklında kalsın', concept: 'Area = number of unit squares', conceptTr: 'Alan = birim kare sayısı', render });
})(window.LI = window.LI || {});
