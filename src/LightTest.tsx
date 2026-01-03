import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useHelper } from "@react-three/drei";

export default function LightTest() {
  const currentRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {});

  useEffect(() => {
    const meshLengh = groupRef.current!.children.length;

    for (let i = 0; i < meshLengh; i++) {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      mesh.geometry = currentRef.current!.geometry;
      mesh.position.z = 0;

      mesh.position.x = (i % (meshLengh / 2)) * 2 - 2;
      if (i >= meshLengh / 2) {
        mesh.position.z = 2;
      }
    }
  });
  const dLight = useRef<THREE.DirectionalLight>(null!);
  const sLight = useRef<THREE.SpotLight>(null!);

  useHelper(dLight, THREE.DirectionalLightHelper);
  useHelper(sLight, THREE.SpotLightHelper);

  return (
    <>
      {/* <directionalLight
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
        position={[3, 5, -2]}
        color="white"
        intensity={1.0}
        ref={dLight}
        target-position={[0, 0, 2]}
      /> */}
      // directionalLight 는 햇빛임 포지션으로 위치 조절가능 타켓 포짓션으로
      햇빛각도 조절가능
      {/* <ambientLight color={"white"} intensity={5} /> // 조명광 intensity = 밝기량 */}
      {/* <hemisphereLight args={["white", "black", 5]} /> // arg로 받음 skyColor,goundColor , intensity */}
      {/* <pointLight
        intensity={1.0}
        distance={5}
        position={[2, 0, 0]}
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
      /> */}
      //백열등 같은거임 퍼지는빛
      <spotLight
        ref={sLight}
        position={[0, 5, 0]}
        color="white"
        intensity={300}
        distance={10}
        angle={THREE.MathUtils.degToRad(40)}
        target-position={[0, 0, 0]}
        penumbra={0.5}
        castShadow
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-mapSize={[512, 512]}
      />
      // 무대조명 같은느낌
      {/* <Environment files={"./hdr1.hdr"} background blur={0.1} /> */}
      <mesh
        rotation-x={THREE.MathUtils.degToRad(-90)}
        position-y={-1}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial side={THREE.DoubleSide} color={"#020059"} />
      </mesh>
      <mesh ref={currentRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.5, 0.2]} />
      </mesh>
      <group ref={groupRef}>
        <mesh castShadow receiveShadow>
          <meshLambertMaterial
            color={"red"}
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            emissive={"black"}
          />{" "}
          // 반사각이없는거 흑이나 나무
        </mesh>
        <mesh castShadow receiveShadow>
          <meshPhongMaterial
            color={"red"}
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            emissive={"black"}
            specular={"#fff"}
            shininess={15} // 숫자가 커질수록 반사 각이 커짐
            flatShading={true} // 불리언값  단면으로 랜더링해라 true 하면 각진표현이 나옴
          />
          // 플라스틱 유리 철 제질등의 메쉬를 만들때 반사를하는 제질
        </mesh>

        <mesh castShadow receiveShadow>
          <ambientLight color={"black"} />
          <meshStandardMaterial
            visible={true}
            transparent={false}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            flatShading={true} // 불리언값
            emissive={"black"}
            roughness={0}
            metalness={0.5}
            color={"#049ef4"}
          />
        </mesh>
        <mesh castShadow receiveShadow>
          <meshPhysicalMaterial
            visible={true}
            transparent={true}
            opacity={1}
            side={THREE.FrontSide}
            alphaTest={1}
            depthTest={true}
            depthWrite={true}
            flatShading={true} // 불리언값
            emissive={"black"}
            roughness={0}
            metalness={0.5}
            clearcoat={1}
            color={"#049ef4"}
            transmission={1}
            thickness={0.5}
          />
        </mesh>

        <mesh castShadow receiveShadow>
          <meshToonMaterial />
        </mesh>
      </group>
    </>
  );
}
