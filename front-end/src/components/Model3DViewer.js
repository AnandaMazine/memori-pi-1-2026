"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { buildModel3DUrl } from "@/lib/api";

export default function Model3DViewer({ modelUrl, modelName = "3D Model" }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !modelUrl) return;

    // Converter URL para usar a rota de API se necessário
    const apiModelUrl = buildModel3DUrl(modelUrl);

    // Inicializar cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);
    sceneRef.current = scene;

    // Câmera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Carregar modelo
    const loader = new GLTFLoader();
    let loadedModel = null;

    loader.load(
      apiModelUrl,
      (gltf) => {
        loadedModel = gltf.scene;
        scene.add(loadedModel);

        // Centralizar e escalar o modelo
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 30 / maxDim;

        loadedModel.scale.multiplyScalar(scale);
        loadedModel.position.sub(center.multiplyScalar(scale));

        // Ajustar câmera para começar mais próxima
        const distance = maxDim * 1.5;
        camera.position.z = distance;
        camera.lookAt(0, 0, 0);
      },
      undefined,
      (error) => {
        console.error("Erro ao carregar modelo 3D:", error);
      }
    );

    // Controles de mouse (rotação simples)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    renderer.domElement.addEventListener("mousedown", (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    renderer.domElement.addEventListener("mousemove", (e) => {
      if (isDragging && loadedModel) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        loadedModel.rotation.y += deltaX * 0.01;
        loadedModel.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    renderer.domElement.addEventListener("mouseup", () => {
      isDragging = false;
    });

    renderer.domElement.addEventListener("mouseleave", () => {
      isDragging = false;
    });

    // Zoom com scroll
    renderer.domElement.addEventListener("wheel", (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(1, Math.min(20, camera.position.z));
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md"
      style={{ minHeight: "400px" }}
    >
      <div className="absolute top-2 left-2 bg-white/90 px-3 py-1.5 rounded text-xs text-gray-600 pointer-events-none">
        {modelName}
      </div>
      <div className="absolute bottom-2 left-2 bg-white/90 px-3 py-1.5 rounded text-xs text-gray-500 pointer-events-none select-none">
        🖱️ Clique e arraste para girar • 🔙 Scroll para zoom
      </div>
    </div>
  );
}
