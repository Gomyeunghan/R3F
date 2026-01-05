import { ThreeEvent } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

export default function InteractionTest() {
  function clickFunc(e: ThreeEvent<MouseEvent>) {
    console.log(e);
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh<
      THREE.BufferGeometry,
      THREE.MeshStandardMaterial
    >;
    mesh.material.color.set("blue");
  }

  return (
    <>
      <ambientLight />
      <directionalLight intensity={5} />
      <mesh onClick={(e) => clickFunc(e)} position={[-2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh onClick={(e) => clickFunc(e)} position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh onClick={(e) => clickFunc(e)} position={[2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}
