import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cylinder = () => {
 const containerRef = useRef(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x262626);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, -20, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineDashedMaterial({
      color: 0xffffff,
      linewidth: 2,
      scale: 1,
      dashSize: 3,
      gapSize: 2,
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    line.position.set(0, 10, 0);
    scene.add(line);

    function redraw() {
      const newGeometry = new THREE.BufferGeometry().setFromPoints(points);
      line.geometry.dispose();
      line.geometry = newGeometry;
    }

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    containerRef.current.appendChild(renderer.domElement);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Cylinder;
