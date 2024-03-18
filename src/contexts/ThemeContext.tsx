import React, { Suspense, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color, Euler, MeshStandardMaterial, Vector3  } from 'three';
import {  OrbitControls, Stars } from '@react-three/drei';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({children}) =>{
    const [theme, setTheme] = useState(false);
    interface ICameraProps {
        fov: number,
        aspect: number,
        near: number,
        far: number,
        position: Vector3 

    }

    interface IBoxGeometryProps {
        position: THREE.Vector3;
        polygonSize: [
            width?: number | undefined, 
            height?: number | undefined, 
            depth?: number | undefined, 
            widthSegments?: number | undefined, 
            heightSegments?: number | undefined, 
            depthSegments?: number | undefined
        ] | undefined;
        rotation: THREE.Euler;
    }

    const DEFAULT_BOX_GEOMETRY_PROPS : IBoxGeometryProps = {
        position: new Vector3(1, 1, 1),
        polygonSize: [1, 1, 1],
        rotation: new Euler(0)
    }

    const DEFAULT_CAMERA_PROPS : ICameraProps = {
        fov: 90,
        near: 0.1,
        far: 1000,
        position: new Vector3(0, 0, 5),
        aspect: ( window.innerWidth / window.innerHeight )
    }    

    const UIErrorEvent = ({message}) => {
        return (
            <div> {message} </div>
        );
    }

    const Loading = ( props ) => {
        console.log(props);
        return(
            <div>loading: {props}</div>
        )
    }

    // Implements a React Functional Component using ICameraProps as the type.
    const RenderCanvas : React.FC<ICameraProps> = ( props ) =>{
        // Destructures the default variable + props passed into the fuction then merges it.
        const { fov, near, far, position} = {...DEFAULT_CAMERA_PROPS, ...props};
        const { children } : any = {...props};
        return(
            // Plugs destructured data into a Canvas element with the necessary props along with default
            <Canvas frameloop="always" >
                <Suspense fallback = {<Loading args={"testing1234"}/>}>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} intensity={Math.PI} />
                    <pointLight  position={[-10, -10, -10]} decay = {0} intensity={Math.PI}/>
                    <perspectiveCamera fov={fov} near={near} far={far} position={position}/>
                    <OrbitControls />
                    <Stars />
                    { children }
                </Suspense>
            </Canvas>
        );
    }
    // Implements a React Functional Component using IBoxGeometryProps as the type
    const BoxGeometry : React.FC<IBoxGeometryProps> = (props) => {
        // Creates a null reference with a Mesh type
        const mesh : any = useRef<MeshStandardMaterial>(null!);
        // Destructures the default variable + props passed into the fuction then merges it.
        const { polygonSize, position, rotation } = { ...DEFAULT_BOX_GEOMETRY_PROPS, ...props}
        const viewport = useThree((state) => state.viewport.aspect);
        const setSize = useThree((state) => state.setSize)
        // Adding rotation to mesh reference at the same refresh rate as the DOM;
        useFrame((_, delta) => {
            mesh.current.rotation.x += 1 * delta;
            mesh.current.rotation.y += .5 * delta;
        })
        useEffect(() => {
            setSize(window.innerWidth, window.innerHeight / 2);
        }, [viewport, setSize])


        const randomColor = useMemo(() => {
            // Adaptation of Box-Muller transform to create random colors on a gaussian curve
            const gaussianRandom = () => {
                const u = 1 - Math.random();
                const v = Math.random();
                // sets normalized curve between .75 and 1 by doing math stuff
                return Math.sqrt( -2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
            }
            return new Color(gaussianRandom(), gaussianRandom(), gaussianRandom());
        },[])


        
        
        return (
            // Plugs destructured data into a mesh element with the necessary props along with default 
            <mesh 
                {...props}
                ref = { mesh } 
                position = { position } 
                rotation = { rotation}
                
            >    
                <boxGeometry args = { polygonSize } />
                <meshStandardMaterial color={randomColor}/>
            </mesh>
        );
    }


    return(
        <ThemeContext.Provider value={{theme, setTheme, BoxGeometry, UIErrorEvent, RenderCanvas}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}