import RoboGallery from "./RoboGallery";
import ParticlesBg from 'particles-bg'

function App() {
    return (
        <div>
            <ParticlesBg type="square" bg={true}/>
            <h1>Robot Gallery</h1>
            <RoboGallery/>
        </div>

    );
}

export default App;
