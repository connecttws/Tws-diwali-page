"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Flame, Sparkles, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

export type DiyaFinish = "gold" | "brass" | "terracotta";

interface ThreeDiyaHeroProps {
  onPickDiyaClick?: () => void;
}

export function ThreeDiyaHero({ onPickDiyaClick }: ThreeDiyaHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<DiyaFinish>("gold");
  const [viewPreset, setViewPreset] = useState<"front" | "macro" | "top">("front");
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  const finishRef = useRef<DiyaFinish>(finish);
  const viewPresetRef = useRef<"front" | "macro" | "top">(viewPreset);
  const isVisibleRef = useRef<boolean>(true);

  finishRef.current = finish;
  viewPresetRef.current = viewPreset;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return true;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const getDimensions = () => {
      const width = container.clientWidth || 550;
      const height = container.clientHeight || 400;
      return { width, height };
    };

    const { width: initialWidth, height: initialHeight } = getDimensions();

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfbf8f1, 0.07);

    const camera = new THREE.PerspectiveCamera(38, initialWidth / initialHeight, 0.1, 40);
    camera.position.set(0, 2.7, 5.2);

    // 2. High-performance Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.maxWidth = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig for White & Gold Aesthetic
    const keyLight = new THREE.DirectionalLight(0xfff7e6, 2.5);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xfffbf0, 0xe8dfc8, 1.2);
    scene.add(hemiLight);

    const flamePointLight = new THREE.PointLight(0xff8c1a, 2.4, 5, 1.2);
    flamePointLight.position.set(0.65, 1.2, 0);
    scene.add(flamePointLight);

    // 5. Procedural Textures (White Marble & Gold Mandala Thali)
    const rangoliCanvas = document.createElement("canvas");
    rangoliCanvas.width = 512;
    rangoliCanvas.height = 512;
    const rCtx = rangoliCanvas.getContext("2d");
    if (rCtx) {
      rCtx.fillStyle = "#FCFAF5";
      rCtx.fillRect(0, 0, 512, 512);

      rCtx.strokeStyle = "#D4A017";
      rCtx.lineWidth = 5;
      rCtx.beginPath();
      rCtx.arc(256, 256, 240, 0, Math.PI * 2);
      rCtx.stroke();

      rCtx.strokeStyle = "rgba(197, 145, 20, 0.5)";
      rCtx.lineWidth = 2;
      rCtx.beginPath();
      rCtx.arc(256, 256, 226, 0, Math.PI * 2);
      rCtx.stroke();

      const petals = 16;
      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        const x = 256 + Math.cos(angle) * 175;
        const y = 256 + Math.sin(angle) * 175;
        rCtx.save();
        rCtx.translate(x, y);
        rCtx.rotate(angle + Math.PI / 2);
        rCtx.strokeStyle = "#D4A017";
        rCtx.lineWidth = 3;
        rCtx.beginPath();
        rCtx.ellipse(0, 0, 24, 65, 0, 0, Math.PI * 2);
        rCtx.stroke();
        rCtx.restore();
      }

      rCtx.fillStyle = "rgba(212, 160, 23, 0.2)";
      rCtx.beginPath();
      rCtx.arc(256, 256, 60, 0, Math.PI * 2);
      rCtx.fill();

      rCtx.strokeStyle = "#C59114";
      rCtx.lineWidth = 2;
      rCtx.stroke();
    }
    const rangoliTexture = new THREE.CanvasTexture(rangoliCanvas);
    rangoliTexture.colorSpace = THREE.SRGBColorSpace;

    // Procedural Contact Shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(90, 65, 10, 0.35)");
      grad.addColorStop(0.5, "rgba(90, 65, 10, 0.12)");
      grad.addColorStop(1, "rgba(90, 65, 10, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    // 6. Materials
    const diyaMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb841,
      metalness: 0.96,
      roughness: 0.14,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe885,
      metalness: 0.98,
      roughness: 0.1,
    });

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0xc99b24,
      metalness: 0.9,
      roughness: 0.22,
    });

    const oilMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a3406,
      metalness: 0.2,
      roughness: 0.05,
    });

    const wickMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2612,
      roughness: 0.9,
      metalness: 0.05,
    });

    const flameCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const flameHaloMat = new THREE.MeshBasicMaterial({
      color: 0xff9926,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    const plateMaterial = new THREE.MeshStandardMaterial({
      map: rangoliTexture,
      metalness: 0.4,
      roughness: 0.35,
    });

    // 7. Composite Procedural Diya Model
    const diyaRootGroup = new THREE.Group();

    // Part 1: White & Gold Lotus Plate
    const plateGeo = new THREE.CylinderGeometry(2.5, 2.4, 0.07, 36);
    const plateMesh = new THREE.Mesh(plateGeo, plateMaterial);
    plateMesh.position.y = 0.035;
    diyaRootGroup.add(plateMesh);

    // Part 2: Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(4.8, 4.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    diyaRootGroup.add(shadowMesh);

    // Diya Prop Subgroup
    const diyaProp = new THREE.Group();
    diyaProp.position.y = 0.07;

    // Part 3: Pedestal Base
    const baseGeo = new THREE.CylinderGeometry(0.72, 0.9, 0.25, 28);
    const baseMesh = new THREE.Mesh(baseGeo, baseMaterial);
    baseMesh.position.y = 0.125;
    diyaProp.add(baseMesh);

    const baseRingGeo = new THREE.TorusGeometry(0.88, 0.055, 12, 32);
    const baseRingMesh = new THREE.Mesh(baseRingGeo, rimMaterial);
    baseRingMesh.rotation.x = Math.PI / 2;
    baseRingMesh.position.y = 0.07;
    diyaProp.add(baseRingMesh);

    // Part 4: Main Curved Oil Bowl
    const lathePoints: THREE.Vector2[] = [];
    lathePoints.push(new THREE.Vector2(0.28, 0.25));
    lathePoints.push(new THREE.Vector2(0.6, 0.32));
    lathePoints.push(new THREE.Vector2(1.1, 0.5));
    lathePoints.push(new THREE.Vector2(1.4, 0.7));
    lathePoints.push(new THREE.Vector2(1.52, 0.92));
    lathePoints.push(new THREE.Vector2(1.46, 0.98));
    lathePoints.push(new THREE.Vector2(1.3, 0.95));
    lathePoints.push(new THREE.Vector2(1.1, 0.8));
    lathePoints.push(new THREE.Vector2(0.6, 0.6));
    lathePoints.push(new THREE.Vector2(0.1, 0.52));
    lathePoints.push(new THREE.Vector2(0.0, 0.52));

    const latheGeo = new THREE.LatheGeometry(lathePoints, 32);
    const latheMesh = new THREE.Mesh(latheGeo, diyaMaterial);
    diyaProp.add(latheMesh);

    // Part 5: Decorative Rim
    const rimGeo = new THREE.TorusGeometry(1.46, 0.06, 12, 36);
    const rimMesh = new THREE.Mesh(rimGeo, rimMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.96;
    diyaProp.add(rimMesh);

    // Part 6: Pooled Oil Disc
    const oilGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.02, 24);
    const oilMesh = new THREE.Mesh(oilGeo, oilMaterial);
    oilMesh.position.y = 0.78;
    diyaProp.add(oilMesh);

    // Part 7: Spout & Wick
    const wickCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 0.75, 0),
      new THREE.Vector3(0.42, 0.88, 0),
      new THREE.Vector3(0.62, 1.05, 0),
    ]);
    const wickGeo = new THREE.TubeGeometry(wickCurve, 14, 0.04, 6, false);
    const wickMesh = new THREE.Mesh(wickGeo, wickMaterial);
    diyaProp.add(wickMesh);

    // Part 8: Flame Core
    const flamePoints: THREE.Vector2[] = [];
    const steps = 14;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = t * 0.52;
      const r = Math.sin(t * Math.PI) * 0.15 * (1.1 - t * 0.3);
      flamePoints.push(new THREE.Vector2(r, y));
    }
    const flameGeo = new THREE.LatheGeometry(flamePoints, 18);
    const flameMesh = new THREE.Mesh(flameGeo, flameCoreMat);
    flameMesh.position.set(0.62, 1.02, 0);
    diyaProp.add(flameMesh);

    // Part 9: Outer Flame Aura
    const haloPoints: THREE.Vector2[] = flamePoints.map(
      (p) => new THREE.Vector2(p.x * 1.4, p.y * 1.2)
    );
    const haloGeo = new THREE.LatheGeometry(haloPoints, 18);
    const haloMesh = new THREE.Mesh(haloGeo, flameHaloMat);
    haloMesh.position.set(0.62, 1.01, 0);
    diyaProp.add(haloMesh);

    diyaRootGroup.add(diyaProp);
    scene.add(diyaRootGroup);

    // 8. Interaction Handling
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let targetRotationY = 0.3;
    let targetRotationX = 0.1;
    let currentRotationY = 0.3;
    let currentRotationX = 0.1;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(
        -0.2,
        Math.min(0.6, targetRotationX + deltaY * 0.006)
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    // 9. Intersection Observer for Pause When Offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ResizeObserver for rock-solid responsive adaptation
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 550;
      const newHeight = container.clientHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    // 10. Smooth, Ultra-lightweight Render Loop
    let animationFrameId = 0;
    let lastTime = performance.now();
    let lastRenderTime = 0;
    let lastFinishApplied = "";
    const minFrameInterval = isSoftwareGl ? 1000 / 30 : 1000 / 60;

    function tick(now = performance.now()) {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      if (now - lastRenderTime < minFrameInterval) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }
      lastRenderTime = now;

      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = now / 1000;

      let targetCamX = 0;
      let targetCamY = 2.7;
      let targetCamZ = 5.2;

      if (viewPresetRef.current === "macro") {
        targetCamX = 0.6;
        targetCamY = 1.45;
        targetCamZ = 2.3;
      } else if (viewPresetRef.current === "top") {
        targetCamX = 0;
        targetCamY = 5.6;
        targetCamZ = 1.0;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 4, delta);
      camera.lookAt(0, viewPresetRef.current === "macro" ? 0.95 : 0.72, 0);

      if (!isDragging) {
        targetRotationY += delta * 0.2;
      }

      currentRotationY = THREE.MathUtils.damp(currentRotationY, targetRotationY, 6, delta);
      currentRotationX = THREE.MathUtils.damp(currentRotationX, targetRotationX, 6, delta);

      diyaProp.rotation.y = currentRotationY;
      diyaProp.rotation.x = currentRotationX;

      const flicker = Math.sin(elapsed * 10) * 0.05 + Math.cos(elapsed * 18) * 0.03;
      flamePointLight.intensity = 2.4 * (1 + flicker);
      flameMesh.scale.set(1 + flicker * 0.2, 1 + flicker * 0.35, 1 + flicker * 0.2);

      const curFinish = finishRef.current;
      if (curFinish !== lastFinishApplied) {
        lastFinishApplied = curFinish;
        if (curFinish === "gold") {
          diyaMaterial.color.setHex(0xdeb841);
          diyaMaterial.metalness = 0.96;
          diyaMaterial.roughness = 0.14;
          rimMaterial.color.setHex(0xffe885);
        } else if (curFinish === "brass") {
          diyaMaterial.color.setHex(0xd4a553);
          diyaMaterial.metalness = 0.85;
          diyaMaterial.roughness = 0.25;
          rimMaterial.color.setHex(0xf3c973);
        } else if (curFinish === "terracotta") {
          diyaMaterial.color.setHex(0xb85634);
          diyaMaterial.metalness = 0.1;
          diyaMaterial.roughness = 0.85;
          rimMaterial.color.setHex(0xd16d47);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);

      plateGeo.dispose();
      shadowGeo.dispose();
      baseGeo.dispose();
      baseRingGeo.dispose();
      latheGeo.dispose();
      rimGeo.dispose();
      oilGeo.dispose();
      wickGeo.dispose();
      flameGeo.dispose();
      haloGeo.dispose();

      diyaMaterial.dispose();
      rimMaterial.dispose();
      baseMaterial.dispose();
      oilMaterial.dispose();
      wickMaterial.dispose();
      flameCoreMat.dispose();
      flameHaloMat.dispose();
      plateMaterial.dispose();
      shadowMat.dispose();
      rangoliTexture.dispose();
      shadowTexture.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[410px] lg:h-[420px] xl:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F0] to-[#F5EFE3] border border-[#D4A017]/35 shadow-[0_12px_36px_rgba(197,145,20,0.1)] flex flex-col justify-between">
      {/* Top indicator badge */}
      <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#1A1208] bg-[#FFFFFF] px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full border border-[#D4A017]/40 flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59114] fill-[#C59114]" />
          <span className="hidden xs:inline">Interactive 3D Sacred Diya</span>
          <span className="xs:hidden">3D Sacred Diya</span>
        </span>
      </div>

      {/* Drag hint */}
      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 text-xs text-[#4A3B2C] bg-[#FFFFFF]/90 px-3 py-1 sm:py-1.5 rounded-full border border-[#D4A017]/30 shadow-xs font-medium">
        <RotateCcw className="w-3.5 h-3.5 text-[#C59114]" />
        <span>Drag to rotate 360°</span>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Interactive 3D Sacred Diya - Drag to inspect"
      />

      {/* Viewport-First Collapsible Bottom Control Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-[560px]">
        {/* Toggle Collapse Bar */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1 text-[9px] sm:text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 sm:py-1 rounded-t-lg bg-[#FFFFFF] text-[#4A3B2C] hover:text-[#1A1208] border-t border-x border-[#D4A017]/30 transition-colors cursor-pointer shadow-xs"
            aria-label={isDockCollapsed ? "Show 3D Diya controls" : "Hide 3D Diya controls"}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59114]" />
                <span>Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59114]" />
                <span>Hide</span>
              </>
            )}
          </button>
        </div>

        {/* Control Dock Panel */}
        {!isDockCollapsed && (
          <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 border border-[#D4A017]/30 shadow-[0_8px_24px_rgba(0,0,0,0.07)] flex flex-wrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 text-xs">
            {/* Finish Switcher */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-[#F6F3EB] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#D4A017]/20">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#7A6652] px-1 hidden md:inline">
                Finish:
              </span>
              <button
                onClick={() => setFinish("gold")}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  finish === "gold"
                    ? "bg-[#D4A017] text-[#FFFFFF] shadow-xs"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                24K Gold
              </button>
              <button
                onClick={() => setFinish("brass")}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  finish === "brass"
                    ? "bg-[#C59114] text-[#FFFFFF] shadow-xs"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                Brass
              </button>
              <button
                onClick={() => setFinish("terracotta")}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  finish === "terracotta"
                    ? "bg-[#B85634] text-[#FFFFFF] shadow-xs"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                Terracotta
              </button>
            </div>

            {/* Camera View Switcher */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-[#F6F3EB] p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-[#D4A017]/20">
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#7A6652] px-1 hidden md:inline">
                View:
              </span>
              <button
                onClick={() => setViewPreset("front")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  viewPreset === "front"
                    ? "bg-[#FFFFFF] text-[#C59114] shadow-xs font-extrabold"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                Front
              </button>
              <button
                onClick={() => setViewPreset("macro")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  viewPreset === "macro"
                    ? "bg-[#FFFFFF] text-[#C59114] shadow-xs font-extrabold"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                Flame
              </button>
              <button
                onClick={() => setViewPreset("top")}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  viewPreset === "top"
                    ? "bg-[#FFFFFF] text-[#C59114] shadow-xs font-extrabold"
                    : "text-[#4A3B2C] hover:text-[#1A1208]"
                }`}
              >
                Mandala
              </button>
            </div>

            {/* Quick Pick CTA */}
            {onPickDiyaClick && (
              <button
                onClick={onPickDiyaClick}
                className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#D4A017] to-[#E5B537] text-white font-black text-[11px] sm:text-xs hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                <span>Pick Diya</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
