import React, { createContext, useContext, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Color, Euler, Mesh, Scene, Vector3  } from 'three';
import { Stats, OrbitControls } from '@react-three/drei';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({children}) =>{
    interface ICameraProps {
        fov: number,
        near: number,
        far: number,
        position: Vector3

    }

    interface IBoxGeometryProps {
        position: Vector3;
        scale: Vector3;
        rotation: Euler;
        color: Color;
    }

    const DEFAULT_BOX_GEOMETRY_PROPS : IBoxGeometryProps = {
        position: new Vector3(1, 1, 1),
        scale: new Vector3(5, 5, 5),
        rotation: new Euler(0),
        color: new Color('blue')
    }

    const DEFAULT_CAMERA_PROPS : ICameraProps = {
        fov: 90,
        near: 0.1,
        far: 1000,
        position: new Vector3(0, 0, 5)
    }

    const [theme, setTheme] = useState(false);

    const UIErrorEvent = ({message}) => {
        return (
            <div> {message} </div>
        );
    }

    // Implements a React Functional Component using ICameraProps as the type.
    const RenderCanvas : React.FC<ICameraProps> = ( props ) =>{
        
        // Destructures the default variable + props passed into the fuction then merges it.
        const { fov, near, far, position, children} = {...DEFAULT_CAMERA_PROPS, ...props};
        return(
            // Plugs destructured data into a Canvas element with the necessary props along with default
            <Canvas frameloop="demand" camera = {{fov, near, far, position}} style={ {width: (window.innerWidth / 2), height: (window.innerHeight)} }>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} intensity={Math.PI} />
                <pointLight  position={[-10, -10, -10]} decay = {0} intensity={Math.PI}/>
                <OrbitControls />
                <Stats />
                { children }
            </Canvas>
        );
    }

    // Implements a React Functional Component using IBoxGeometryProps as the type
    const BoxGeometry : React.FC<IBoxGeometryProps> = (props) => {
        // Creates a null reference with a Mesh type
        const mesh = useRef<Mesh>(null!);
        // Destructures the default variable + props passed into the fuction then merges it.
        const { scale, position, rotation, color } = { ...DEFAULT_BOX_GEOMETRY_PROPS, ...props}
        return (
            // Plugs destructured data into a mesh element with the necessary props along with default 
            <mesh 
                {...props}
                ref = { mesh } 
                scale = { scale } 
                position = { position } 
                rotation = { rotation }
            >    
                <boxGeometry args = {[1, 1, 1]} />
                <meshStandardMaterial color = { color } />
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