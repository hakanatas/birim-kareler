/* SAHNE 6 — METREKARE (70–84 s)  For big places the unit square is 1 m²: a classroom floor 5 m × 4 m = 20 m². */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  LI.drawM2 = function (ctx, env, t, o = {}) {
    return LI.drawMain(ctx, env, t, { unit: 'm', la: seg(t, 71.6, 72.2), vis: (i, j, n) => ({ k: seg(t, 71.4 + n * 0.03, 71.8 + n * 0.03), label: n === 0 ? '1 m²' : '', size: 20, fill: n === 0 ? 0.55 : 0.3 }) });
  };
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.drawM2(ctx, env, t);
      LI.say(ctx, env, [['sınıfın tabanı', 76.8, 84.4, t, { size: 46 }], ['5 × 4 = 20 m²', 77.4, 84.4, t, Object.assign({ size: 64 }, F().AMB)]]);
    });
  }
  LI.registerScene({ id: 6, start: 70, end: 84, name: 'Square metres', nameTr: 'Metrekare', concept: '1 m² unit squares', conceptTr: '1 m²’lik birim kareler', render });
})(window.LI = window.LI || {});
