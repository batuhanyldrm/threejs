import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cylinder = () => {
    const renderer = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        renderer.current = new THREE.WebGLRenderer();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.current.domElement);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        const points = [];
        points.push(new THREE.Vector3(-10, 0, 0));
        points.push(new THREE.Vector3(0, 10, 0));
        points.push(new THREE.Vector3(10, 0, 0));
        points.push(new THREE.Vector3(0, 0, 0, 10));
        points.push(new THREE.Vector3(-10, 0, 0, 0));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const line = new THREE.Line(geometry, material);
        scene.add(line);

        renderer.current.render(scene, camera);

        return () => {
            renderer.current.dispose();

            const rendererElement = renderer.current.domElement;
            rendererElement.parentNode.removeChild(rendererElement);
        };
    }, []); 

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'black',
            }}
        />
    );
};

export default Cylinder;
