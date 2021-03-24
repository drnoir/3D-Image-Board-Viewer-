import React ,   { useState, useRef } from 'react'
import  './App.css'


export default function ImagesLoad() {

    const [imagePreviewUrl, setPreviewURL] = useState('' )
    const [imagePreview, setimagePreview] = useState('')
    const [File, setFile] = useState('')

    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
    } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    function loadImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file)
            setPreviewURL(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div>
            <h2 className="center">3D Image Board Viewer / Photo tool</h2>
            <p className="center">Add you Images below and then click view to view them in 3D</p>
            <input
                type="file"
                //  className={'uploaded-file'}
                size="60"
                accept={'image/*'}
                onChange={(e)=>loadImage(e)}
            />
            <div className="image-wrapper">

                <div className="image-box">
                    {$imagePreview}
                </div>

                {/*<div className="image-box"></div>*/}
                {/*<div className="image-box"></div>*/}
                {/*<div className="image-box"></div>*/}
                {/*<div className="image-box"></div>*/}
                {/*<div className="image-box"></div>*/}
            </div>

            <div className={"center-wrapper"}>
                <button className="image-View-button">View In 3D</button>
            </div>
        </div>
    )
}
