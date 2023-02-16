import React, {useState, useEffect} from 'react';
import './RoboGallery.css';

function RobotGallery() {
    const [inputText, setInputText] = useState('');
    const [robotImageUrl, setRobotImageUrl] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        if (inputText) {
            fetch(`https://robohash.org/${inputText}`)
                .then(response => response.blob())
                .then(imageData => {
                    const imageUrl = URL.createObjectURL(imageData);
                    setRobotImageUrl(imageUrl);

                    const imageDataObject = {
                        inputText,
                        imageUrl,
                    };
                    const imageDataString = JSON.stringify(imageDataObject);
                    localStorage.setItem(`robotImage_${inputText}`, imageDataString);
                });
        } else {
            setRobotImageUrl('');
        }
    }, [inputText]);

    useEffect(() => {
        const galleryData = Object.keys(localStorage).filter(key => key.includes('robotImage')).map(key => {
            const imageDataString = localStorage.getItem(key);
            const imageDataObject = JSON.parse(imageDataString);
            return imageDataObject;
        });
        setGalleryImages(galleryData);
    }, []);

    function handleInputTextChange(event) {
        setInputText(event.target.value);
    }

    function handleGenerateButtonClick() {
        if (inputText) {
            setInputText('');
        }
    }

    function handleDeleteImage(image) {
        const imageDataString = JSON.stringify(image);
        localStorage.removeItem(`robotImage_${image.inputText}`);
        setGalleryImages(prevImages => prevImages.filter(prevImage => prevImage.inputText !== image.inputText));
    }

    useEffect(() => {
        const colors = ['#3d9bff', '#b1b1b1', '#d9d9d9', '#9c9c9c', '#828282', '#5c5c5c'];
        let index = 0;
        const intervalId = setInterval(() => {
            const titleElement = document.querySelector('h1');
            if (titleElement) {
                titleElement.style.color = colors[index % colors.length];
                index++;
            }
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <div className="input-container">
                <input className="text-input" type="text" value={inputText} onChange={handleInputTextChange}
                       onKeyPress={(event) => event.key === 'Enter' && handleGenerateButtonClick()}/>
                <button className="generate-button" onClick={handleGenerateButtonClick}>Generate</button>
            </div>
            <div className="image-container">
                <img className="main-image" src={robotImageUrl} alt="Robot Image"/>
            </div>
            <div className="gallery-container">
                {galleryImages.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img className="gallery-image" src={image.imageUrl} alt="Robot Image"/>
                        <button className="delete-button" onClick={() => handleDeleteImage(image)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RobotGallery;
