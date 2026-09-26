/* SAHNE 2 — BİRİM SEÇELİM (10–24 s)  Circles leave gaps; squares cover without gaps. The unit square: 1 cm². */
(function (LI) {
  'use strict';
  const { seg, outBack } = LI.E;
  const A = LI.Ang, KD = LI.KD, F = () => LI.Film, Ink = LI.Ink;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function mark(ctx, X, ok, k) {
    if (k <= 0) return;
    const pts = ok ? [[X[0] - 22, X[1]], [X[0] - 6, X[1] + 18], [X[0] + 26, X[1] - 20]] : null;
    if (ok) Ink.path(ctx, pts, { w: 9, p: k, color: LI.AMBER_RGB, seed: 33 });
    else { Ink.path(ctx, [[X[0] - 20, X[1] - 20], [X[0] + 20, X[1] + 20]], { w: 9, p: seg(k, 0, 0.5), color: LI.AMBER_RGB, seed: 34 }); Ink.path(ctx, [[X[0] + 20, X[1] - 20], [X[0] - 20, X[1] + 20]], { w: 9, p: seg(k, 0.5, 1), color: LI.AMBER_RGB, seed: 35 }); }
  }
  function render(ctx, lt, env, t) {
    F().base(ctx, env, t, camera(t, env), () => {
      LI.drawMain(ctx, env, t);
      const L = KD.L(env), u = L.u, out = 1 - seg(t, 19.8, 20.4);
      if (out > 0 && t > 10.3) {
        [L.O1, L.O2].forEach((O, s) => {
          const P = F().rect(O, u, 4, 3);
          F().outline(ctx, P, { w: 7, p: seg(t, 10.4 + s * 0.3, 11.0 + s * 0.3), alpha: out, seed: 20 + s });
          for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
            const n = j * 4 + i;
            if (s === 0) {
              const k = seg(t, 11.0 + n * 0.14, 11.3 + n * 0.14) * out; if (k <= 0) continue;
              const cx = O[0] + i * u + u / 2, cy = O[1] - (3 - j) * u + u / 2, r = outBack(k) * (u / 2 - 2);
              ctx.fillStyle = `rgba(${LI.AMBER_RGB},${0.3 * out})`; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
              ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.5 * out})`; ctx.lineWidth = 2; ctx.stroke();
            } else F().unit(ctx, O[0] + i * u, O[1] - (3 - j) * u, u, seg(t, 14.2 + n * 0.14, 14.5 + n * 0.14) * out, { alpha: out });
          }
          mark(ctx, [O[0] + 2 * u, O[1] + 60], s === 1, seg(t, s ? 16.2 : 13.2, s ? 16.8 : 13.8) * out);
        });
      }
      // the unit square, big
      const k = seg(t, 20.4, 21.0) * (1 - seg(t, 23.6, 24.0));
      if (k > 0) {
        const U = u * 3, C = env.V ? [0, -300] : [120, -10], x = C[0] - U / 2, y = C[1] - U / 2;
        F().unit(ctx, x, y, U, k, { label: '1 cm²', size: 58 });
        F().T(ctx, '1 cm', C[0], y + U + 40, { size: 44, alpha: k });
        F().T(ctx, '1 cm', x + U + 64, C[1], { size: 44, alpha: k });
      }
    });
  }
  LI.registerScene({ id: 2, start: 10, end: 24, name: 'Choose a unit', nameTr: 'Birim seçelim', concept: 'Squares cover without gaps', conceptTr: 'Kareler boşluksuz kaplar', render });
})(window.LI = window.LI || {});
