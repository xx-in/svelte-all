<section class="hero" aria-hidden="false">
  <div class="ring" aria-hidden="true"></div>
</section>

<style>
  :root {
    --bg: #fff;
    --ripple-color: rgba(100, 170, 255, 0.12);
    --ripple-accent: rgba(100, 170, 255, 0.2);
    --size: 120vmax; /* 控制波纹最大覆盖范围 */
    --duration: 6s; /* 动画周期 */
    --gap: 2s; /* 多环间隔 */
  }

  * {
    box-sizing: border-box;
  }
  body,
  html {
    height: 100%;
    margin: 0;
    font-family:
      system-ui,
      Segoe UI,
      Roboto,
      "PingFang SC",
      sans-serif;
  }

  .hero {
    height: 100vh;
    display: grid;
    place-items: center;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.02), transparent 20%),
      linear-gradient(180deg, var(--bg), #03051a 60%);
    color: #e6f0ff;
    overflow: hidden;
    position: relative;
  }

  /* 三层环形伪元素，不阻塞 pointer-events */
  .hero::before,
  .hero::after,
  .hero .ring {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--size);
    height: var(--size);
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform, opacity;
    mix-blend-mode: screen;
    box-shadow: 0 0 40px rgba(100, 170, 255, 0.08) inset;
  }

  /* 基础颜色 / 渐变 */
  .hero::before {
    background: radial-gradient(circle at 50% 45%, var(--ripple-accent), transparent 45%);
    animation: ripple1 var(--duration) linear infinite;
    opacity: 0.85;
  }
  .hero::after {
    background: radial-gradient(circle at 55% 55%, var(--ripple-color), transparent 50%);
    animation: ripple2 calc(var(--duration) + var(--gap)) linear infinite;
    opacity: 0.7;
    filter: blur(0.6px);
  }
  .hero .ring {
    background: conic-gradient(
      from 120deg,
      transparent 40%,
      rgba(255, 255, 255, 0.02) 41% 59%,
      transparent 60%
    );
    animation: ripple3 calc(var(--duration) * 1.4) linear infinite;
    opacity: 0.6;
    transform-origin: center;
  }

  @keyframes ripple1 {
    0% {
      transform: translate(-50%, -50%) scale(0.06);
      opacity: 0.95;
    }
    70% {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 0.16;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
  @keyframes ripple2 {
    0% {
      transform: translate(-50%, -50%) scale(0.04);
      opacity: 0.85;
    }
    75% {
      transform: translate(-50%, -50%) scale(0.95);
      opacity: 0.12;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
  @keyframes ripple3 {
    0% {
      transform: translate(-50%, -50%) scale(0.02) rotate(0deg);
      opacity: 0.9;
    }
    60% {
      transform: translate(-50%, -50%) scale(1.02) rotate(20deg);
      opacity: 0.08;
    }
    100% {
      transform: translate(-50%, -50%) scale(1.05) rotate(40deg);
      opacity: 0;
    }
  }

  /* 文案样式 */
  .content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 900px;
  }
  h1 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.6rem, 4vw, 3rem);
    letter-spacing: 0.02em;
  }
  p {
    margin: 0;
    opacity: 0.9;
  }

  /* 无动画偏好兼容 */
  @media (prefers-reduced-motion: reduce) {
    .hero::before,
    .hero::after,
    .hero .ring {
      animation: none;
      opacity: 0.4;
    }
  }
</style>
