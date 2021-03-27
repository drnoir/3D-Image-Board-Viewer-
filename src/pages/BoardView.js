import React, { useRef, useState, Suspense } from 'react'
import { TextureLoader} from "three"
import { Canvas, useThree,  useLoader  } from 'react-three-fiber'
import  './App.css'

import art1 from '../images/art/1.jpg'
import art2 from '../images/art/2.jpg'
import art3 from '../images/art/3.jpg'
import art4 from '../images/art/4.jpg'
import art5 from '../images/art/5.jpg'
import art6 from '../images/art/6.jpg'

import { useDrag } from "react-use-gesture"
import { FlyControls , Html, Text } from '@react-three/drei'
import * as htmlToImage from 'html-to-image';

//used for random positioning
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// take a picture of canvas
function takeImage(elementId) {
    htmlToImage.toJpeg(document.getElementById('my-node'), { quality: 100 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
}


function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    const texture = useLoader(TextureLoader, props.artworkTexture)
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const intPos = getRandomArbitrary(0,3)
    const [position, setPosition] = useState([intPos, intPos, intPos]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;

    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });

    return (
        <mesh  position={position} {...bind()}
               {...props}
               ref={mesh}
               scale={active ? props.scale : props.Initscale }
               onClick={(e) => setActive(!active)}
               onPointerOver={(e) => setHover(true)}
               onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshBasicMaterial attach="material" map={texture} />
        </mesh>
    )
}


export default function BoardView() {
    return (
        <div id = "my-node">
            <Canvas camera={{ fov: 75, position: [0, 0, 8] }} gl={{ preserveDrawingBuffer: true }}>
                <directionalLight intensity={1} />
                <ambientLight intensity={0.6} />
                <Suspense fallback={null}>
                    {/*map here*/}
                    <Box  scale ={[2.5,5,0.1]} Initscale ={[0.5, 1, 0.01]}  artworkTexture={art1} />
                    <Box  scale ={[5,5,0.1]} Initscale ={[1,1,0.01]}  artworkTexture={art2} />
                    <Box  scale ={[5,5,0.1]} Initscale ={[1,1,0.01]}   artworkTexture={art3} />
                    <Box  scale ={[5,5,0.1]} Initscale ={[1,1,0.01]}   artworkTexture={art4} />
                    <Box  scale ={[5,5,0.1]} Initscale ={[1,1,0.01]}   artworkTexture={art5} />
                    <Box  scale ={[5,5,0.1]} Initscale ={[1,1,0.01]}   artworkTexture={art6} />
                </Suspense>
                <FlyControls/>
                <Html>
                    <div id = "buttons">
                        <button className ="reset" >Reset</button>
                        <button className ="photo" onClick={takeImage}>Take Photo</button>
                    </div>
                </Html>
            </Canvas>
        </div>
    )
}
