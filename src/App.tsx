import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";
import LightTest from "./LightTest";
// import MaterialTest from "./MaterialTest";

function App() {
  return (
    <>
      <Canvas
        shadows={true}
        camera={{
          fov: 75,
          near: 1,
          far: 100,
          position: [10, 10, 5],
        }}
      >
        <color attach={"background"} args={["black"]}></color>
        <LightTest />
        {/* <MaterialTest /> */}
        <OrbitControls />
        {/* <axesHelper args={[6]} />
        <gridHelper args={[10, 10]} /> */}
      </Canvas>
    </>
  );
}

export default App;
