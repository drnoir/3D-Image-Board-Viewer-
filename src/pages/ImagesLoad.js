import React, {useState, useRef, Suspense} from 'react'
import './App.css'
import {Link} from "react-router-dom";
import BoardView from "./BoardView";
import * as htmlToImage from "html-to-image";
import {Canvas, useLoader, useThree} from "react-three-fiber";
import {TextureLoader} from "three";
import {useDrag} from "react-use-gesture";
import placeholder from "../images/placeholder.png";
import {FlyControls, Html} from "@react-three/drei";


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


export default function ImagesLoad() {

    const [imagePreviewUrl, setPreviewURL] = useState(placeholder)
    const [File, setFile] = useState('')
    const [Images, setImage] = useState([])
    const [ImageDivs, setImageDiv] = useState([])

    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img className="previewImage" src={imagePreviewUrl}/>);
    } else {
        $imagePreview = (<img className="previewImage" src={placeholder}/>);
    }

    const board =
        <div id = "my-node">
            <Canvas camera={{ fov: 75, position: [0, 0, 8] }} gl={{ preserveDrawingBuffer: true }}>
                <directionalLight intensity={1} />
                <ambientLight intensity={0.6} />
                <Suspense fallback={null}>
                    {/*map here*/}
                    {Images.map((Image, index) => (
                        <Box key={index}  scale ={[5,5,0.1]} Initscale ={[2.5, 2.5, 0.01]}  artworkTexture={Image} />
                        ))}
                </Suspense>
                <FlyControls/>
            </Canvas>
        </div>



    function loadImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file)
            setPreviewURL(reader.result)
        }
        reader.readAsDataURL(file)
        console.log(imagePreviewUrl);
        // setImage([...Images, imagePreviewUrl]);
        setImage(Images.concat(imagePreviewUrl));
        appendImage()
        console.log(Images)
    }

    function appendImage(e){
    const key = Date.now().toString();
        const newImage =
            <div className="image-card" key={key}>
                    <div className="image-box">
                        {$imagePreview}
                    </div>
            </div>
        setImageDiv( ImageDivs.concat(newImage) )
    }


            return (
            <div className="container">
                <h1 className="center">3D Mood Board Viewer</h1>
                <p className="center">Add your Images below (up to 8) and then click add to board to view them in 3D</p>
                <div className="center">
                    <input
                        className="file-upload"
                        type="file"
                        size="60"
                        accept={'image/*'}
                        onChange={(e) => loadImage(e)}
                    />
                    <label htmlFor="orientation">Select Image Orientation:</label>
                    <select name="orientation" id="orientation">
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                        <option value="landscape">Square</option>
                    </select>
                    <div className="image-wrapper">
                    {ImageDivs}
                    </div>
                    <button className="photo" onClick={takeImage}>Take Photo</button>
                </div>
                {board}
        </div>
)
}
