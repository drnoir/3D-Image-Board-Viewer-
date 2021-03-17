import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";

// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
        "./images/sky/yellowcloud_bk.jpg",
        "./images/sky/yellowcloud_dn.jpg",
        "./images/sky/yellowcloud_ft.jpg",
        "./images/sky/yellowcloud_If.jpg",
        "./images/sky/yellowcloud_rt.jpg",
        "./images/sky/yellowcloud_up.jpg",
    ]);

    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
};

export default SkyBox;
