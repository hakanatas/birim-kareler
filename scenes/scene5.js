/* SAHNE 5 — ALAN BAĞINTISI (56–70 s)  The side lengths are the columns and rows: area = long side × short side. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      const out = 1 - seg(t, 69.8, 70.2);
      LI.drawMain(ctx, env, t, { la: seg(t, 57.8, 58.4) * out, vis: (i, j, n) => ({ k: seg(t, 57.4 + n * 0.02, 57.8 + n * 0.02) * out }) });
      LI.say(ctx, env, [['7 × 4 = 28 cm²', 58.6, 62.8, t, F().AMB]]);
      LI.say(ctx, env, [['Alan =', 63.0, 70.0, t, { size: 48 }], ['uzun kenar × kısa kenar', 63.6, 70.0, t, Object.assign({ size: 44 }, F().AMB)]]);
    });
  }
  LI.registerScene({ id: 5, start: 56, end: 70, name: 'The area rule', nameTr: 'Alan bağıntısı', concept: 'Area = long side × short side', conceptTr: 'Alan = uzun kenar × kısa kenar', render });
})(window.LI = window.LI || {});
