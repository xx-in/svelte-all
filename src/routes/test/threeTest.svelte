<script lang="ts">
  import { onMount } from "svelte";
  import type { Light } from "three";
  import {
    BoxGeometry,
    Clock,
    Color,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    TextureLoader,
    WebGLRenderer,
  } from "three";

  /**
   * 定义全局变量
   */
  let container: HTMLDivElement;
  let camera = $state<PerspectiveCamera>();
  let scene = $state<Scene>();
  let renderer = $state<WebGLRenderer>();
  let lights = $state<Record<string, Light>>({});
  let meshs = $state<Record<string, Mesh>>({});
  let loops = $state<Record<string, () => void>>({});
  let delta = $state(1000 / 60);
  let seconds = $state(0);

  onMount(init);

  function createCamera() {
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 20);

    return camera;
  }

  function createScene() {
    const scene = new Scene();
    scene.background = new Color("skyblue");
    return scene;
  }

  function createCube(name: string, postion: [number, number, number]) {
    const geometry = new BoxGeometry(...postion);
    const material = new MeshStandardMaterial({
      color: "white",
    });
    const cube = new Mesh(geometry, material);
    cube.position.set(...postion);

    meshs[name] = cube;
    return cube;
  }

  /**
   * 设置每秒多少度
   * @param angle
   */
  function degPerSecond(angle: number) {
    const deg = delta * angle * (Math.PI / 180);
    return deg;
  }

  function reverse(period: number, value: number) {
    if (seconds % (2 * period) > period) {
      return -value;
    } else {
      return value;
    }
  }

  /**
   * 设置每秒多少米
   * @param angle
   */
  function meterPerSecond(meter: number) {
    const frameMeter = meter * delta;
    return frameMeter;
  }

  function createCube1() {
    const name = "cube1";
    const cube = createCube(name, [3, 3, 3]);
    cube.position.set(-7, 0, 0);
    cube.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4);

    cube.material.map = new TextureLoader().load("/textures/uv-test-col.png");
    onLoop(name, () => {
      // 每秒多少度
      cube.rotation.y += degPerSecond(60);
      cube.position.x += reverse(10, meterPerSecond(1));
    });
  }

  function onLoop(name: string, cb: () => void) {
    // delta 的单位是秒
    loops[name] = cb;
  }

  function createCube2() {
    const name = "cube2";
    const cube = createCube(name, [2, 2, 2]);
    cube.position.set(0, 2, 0);
    onLoop(name, () => {
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.02;
    });
  }

  function createLight(name: string, position: [number, number, number]) {
    const light = new PointLight("white", 140);
    light.position.set(...position);
    lights[name] = light;
    return light;
  }

  function createRenderer() {
    const renderer = new WebGLRenderer({
      antialias: false,
    });

    return renderer;
  }

  /**
   * 出时化
   */
  function init() {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    createLight("light1", [10, 0, 0]);
    createLight("light2", [0, 10, 0]);
    createLight("light3", [0, 0, 10]);
    createCube1();
    // createCube2();
    scene.add(...Object.values(lights), ...Object.values(meshs));
    container.append(renderer.domElement);
    resize();
    renderer.render(scene, camera);
    onLoop("camera", () => {
      //   camera!.position.z += meterPerSecond(2);
    });
    // 开始运行动画
    startRunning();
  }

  function render() {
    renderer!.render(scene!, camera!);
  }

  let runningStatus = $state(false);
  /**
   * 监听状态，可以开启动画或者停止动画
   */
  $effect(() => {
    if (runningStatus) {
      const clock = new Clock();
      renderer!.setAnimationLoop(() => {
        delta = clock.getDelta();
        seconds += delta;
        Object.values(loops).forEach((cb) => cb());
        render();
      });
    } else {
      renderer!.setAnimationLoop(null);
    }
  });

  function startRunning() {
    runningStatus = true;
  }
  function toggleRunning() {
    runningStatus = !runningStatus;
  }

  /**
   * 根据窗口大小动态调整
   */
  function resize() {
    camera!.aspect = container.clientWidth / container.clientHeight;
    camera!.updateProjectionMatrix();
    renderer!.setSize(container.clientWidth, container.clientHeight);
    renderer!.setPixelRatio(window.devicePixelRatio);
  }
</script>

<svelte:window onresize={resize} />
<div class="size-full" bind:this={container} ondblclick={toggleRunning}></div>
