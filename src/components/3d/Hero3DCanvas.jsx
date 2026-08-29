// src/components/3d/Hero3DCanvas.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TEXTURE_URLS = {
  heroProduct: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762', // Milange Charcoal 240 GSM Loose Fit
  leftProduct: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338',  // White Linen Blend Shirt
  rightProduct: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04717.jpg?v=1786604164', // Sky Blue Loose Fit Tee
  backdrop: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04563.jpg?v=1786603959'     // Editorial Campaign Shot
};

export default function Hero3DCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio <= 1.5,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return; // Graceful WebGL fallback
    }

    let width = container.clientWidth;
    let height = container.clientHeight;
    let isPortrait = height > width;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, isPortrait ? 0.04 : 0.028);

    // Dynamic FOV based on aspect ratio
    const fov = isPortrait ? 55 : 42;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, isPortrait ? 8.5 : 7.5);

    // Warm, sophisticated fashion studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x994126, 0.9);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // 1. BACKGROUND PLANE
    const bgTexture = textureLoader.load(TEXTURE_URLS.backdrop);
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      transparent: true,
      opacity: isPortrait ? 0.25 : 0.35,
      depthWrite: false
    });
    const bgPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(isPortrait ? 12 : 15, isPortrait ? 20 : 18),
      bgMaterial
    );
    bgPlane.position.set(0, 0, -6);
    scene.add(bgPlane);

    // 2. PRODUCT PLANES
    // Responsive plane sizing: slightly smaller on mobile portrait
    const planeW = isPortrait ? 2.4 : 3.0;
    const planeH = isPortrait ? 3.1 : 3.8;
    const productGeom = new THREE.PlaneGeometry(planeW, planeH, 16, 16);

    // Center Hero Plane (Milange Charcoal)
    const heroTexture = textureLoader.load(TEXTURE_URLS.heroProduct);
    const heroMaterial = new THREE.MeshStandardMaterial({
      map: heroTexture,
      roughness: 0.45,
      metalness: 0.05,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide
    });
    const heroPlane = new THREE.Mesh(productGeom, heroMaterial);
    heroPlane.position.set(0, isPortrait ? 0.4 : 0, 0);
    scene.add(heroPlane);

    // Left Depth Plane (White Linen Blend Shirt)
    const leftTexture = textureLoader.load(TEXTURE_URLS.leftProduct);
    const leftMaterial = new THREE.MeshStandardMaterial({
      map: leftTexture,
      roughness: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const leftPlane = new THREE.Mesh(productGeom, leftMaterial);
    leftPlane.position.set(isPortrait ? -1.8 : -3.5, isPortrait ? -2.2 : -0.4, isPortrait ? -2.0 : -2.8);
    leftPlane.rotation.y = isPortrait ? 0.15 : 0.22;
    scene.add(leftPlane);

    // Right Depth Plane (Sky Blue Loose Fit Tee)
    const rightTexture = textureLoader.load(TEXTURE_URLS.rightProduct);
    const rightMaterial = new THREE.MeshStandardMaterial({
      map: rightTexture,
      roughness: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const rightPlane = new THREE.Mesh(productGeom, rightMaterial);
    rightPlane.position.set(isPortrait ? 1.8 : 3.5, isPortrait ? -2.2 : 0.4, isPortrait ? -2.0 : -2.8);
    rightPlane.rotation.y = isPortrait ? -0.15 : -0.22;
    scene.add(rightPlane);

    // Touch & Pointer Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * (isPortrait ? 0.2 : 0.35);
      targetY = y * (isPortrait ? 0.2 : 0.35);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const p = scrollRef.current; // 0.0 to 1.0

      // Pointer lerping
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Camera motion: pushes through depth on scroll
      camera.position.z = (isPortrait ? 8.5 : 7.5) - p * (isPortrait ? 4.2 : 4.8);
      camera.position.y = -p * 1.6 + currentY * 0.4;
      camera.position.x = currentX * 0.6;
      camera.lookAt(0, -p * 1.2, 0);

      // Idle floating motion
      const idleFloat = Math.sin(elapsedTime * 1.2) * 0.05;

      // Hero Plane
      heroPlane.position.y = (isPortrait ? 0.4 : 0) + idleFloat - p * 1.2;
      heroPlane.rotation.y = currentX * 0.2 + p * 0.35;
      heroPlane.rotation.x = currentY * 0.15;
      heroPlane.position.x = currentX * 0.25;

      // Left & Right Planes
      if (isPortrait) {
        // Mobile portrait: move smoothly downward and fade
        leftPlane.position.x = -1.8 - p * 1.2 + currentX * 0.1;
        leftPlane.position.y = -2.2 + p * 0.4 + idleFloat * 0.5;
        leftPlane.position.z = -2.0 + p * 2.5;

        rightPlane.position.x = 1.8 + p * 1.2 + currentX * 0.1;
        rightPlane.position.y = -2.2 + p * 0.4 + idleFloat * 0.5;
        rightPlane.position.z = -2.0 + p * 2.5;
      } else {
        // Desktop / Tablet landscape
        leftPlane.position.x = -3.5 - p * 2.2 + currentX * 0.15;
        leftPlane.position.z = -2.8 + p * 3.5;
        leftPlane.position.y = -0.4 + idleFloat * 0.8 + p * 0.5;

        rightPlane.position.x = 3.5 + p * 2.2 + currentX * 0.15;
        rightPlane.position.z = -2.8 + p * 3.5;
        rightPlane.position.y = 0.4 + idleFloat * 0.8 + p * 0.5;
      }

      // Fade out smoothly as scroll approaches 75% -> 100% to blend into New Arrivals
      const fadeOut = Math.max(0, 1 - (p - 0.75) * 4);
      if (p > 0.75) {
        heroMaterial.opacity = 0.98 * fadeOut;
        leftMaterial.opacity = 0.85 * fadeOut;
        rightMaterial.opacity = 0.85 * fadeOut;
        bgMaterial.opacity = (isPortrait ? 0.25 : 0.35) * fadeOut;
      } else {
        heroMaterial.opacity = 0.98;
        leftMaterial.opacity = 0.85;
        rightMaterial.opacity = 0.85;
        bgMaterial.opacity = isPortrait ? 0.25 : 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      isPortrait = height > width;
      camera.fov = isPortrait ? 55 : 42;
      camera.aspect = width / height;
      camera.position.z = isPortrait ? 8.5 : 7.5;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      productGeom.dispose();
      heroMaterial.dispose();
      leftMaterial.dispose();
      rightMaterial.dispose();
      bgMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}
