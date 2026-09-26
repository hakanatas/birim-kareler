/* SAHNE 3 — SAYALIM (24–38 s)  Cover the 5 × 3 rectangle one unit square at a time: 15 cm². */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const out = 1 - seg(t, 37.7, 38.1);
      LI.drawMain(ctx, env, t, { vis: (i, j, n) => ({ k: seg(t, 25.0 + n * 0.42, 25.3 + n * 0.42) * out, label: String(n + 1) }) });
      LI.say(ctx, env, [['15 birim kare', 32.0, 38.0, t], ['A(ABCD) = 15 cm²', 33.2, 38.0, t, F().AMB]]);
    });
  }
  LI.registerScene({ id: 3, start: 24, end: 38, name: 'Count them', nameTr: 'Sayalım', concept: '15 unit squares = 15 cm²', conceptTr: '15 birim kare = 15 cm²', render });
})(window.LI = window.LI || {});
