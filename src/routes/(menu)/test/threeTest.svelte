<script lang="ts">
  import { onMount } from "svelte";
  import type { Camera, Light } from "three";
  import {
    AmbientLight,
    BoxGeometry,
    Clock,
    Color,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer,
  } from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
  let runningStatus = $state(false);
  let controls = $state<OrbitControls>();

  onMount(init);

  function createCamera() {
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 20);
    return camera;
  }

  function createControls(camera: Camera, domElement?: HTMLElement | null) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
    return controls;
  }

  function createScene() {
    const scene = new Scene();
    scene.background = new Color("skyblue");
    return scene;
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
    const geometry = new BoxGeometry(3, 3, 3);
    const material = new MeshStandardMaterial({
      map: new TextureLoader().load("/textures/uv-test-bw.png"),
    });
    const cube = new Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    meshs[name] = cube;
    // cube.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4);
    // onLoop(name, () => {
    // 每秒多少度
    // cube.rotation.y += degPerSecond(60);
    //   cube.position.x += reverse(10, meterPerSecond(1));
    // });
  }

  function onLoop(name: string, cb: () => void) {
    // delta 的单位是秒
    loops[name] = cb;
  }

  function createLight1() {
    const name = "light1";
    const position = [-10, 10, -10] as const;
    const light = new PointLight("white", 140);
    light.position.set(...position);
    lights[name] = light;
    return light;
  }

  function createLight2() {
    const light = new AmbientLight("white", 2);
    lights["ambientLight"] = light;
    return light;
  }

  function createLight3() {
    const light = new HemisphereLight(
      "white", // bright sky color
      "darkslategrey", // dim ground color
      2, // intensity
    );
    lights["hemisphereLight"] = light;
    return light;
  }

  function createRenderer() {
    const renderer = new WebGLRenderer({
      antialias: true,
    });

    return renderer;
  }

  /**
   * 渲染
   */
  function render() {
    renderer!.render(scene!, camera!);
  }

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
        controls?.update();
        render();
      });
    } else {
      renderer!.setAnimationLoop(() => {
        controls?.update();
        render();
      });
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
    renderer!.setPixelRatio(globalThis.devicePixelRatio);
  }

  function createSphere() {
    const radius = 4;
    const widthSegments = 16;
    const heightSegments = 16;
    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
    const material = new MeshStandardMaterial();
    const sphere = new Mesh(geometry, material);
    meshs["sphere"] = sphere;
    return sphere;
  }

  /**
   * 初始化
   */
  function init() {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    createLight1();
    createLight3();
    // createCube1();
    createSphere();
    // 挂载灯光和模型
    scene.add(...Object.values(lights), ...Object.values(meshs));
    container.append(renderer.domElement);
    resize();
    controls = createControls(camera, renderer.domElement);
    // 开始运行动画
    startRunning();
  }
</script>

<svelte:window onresize={resize} />
<div class="size-full" bind:this={container} ondblclick={toggleRunning}></div>
