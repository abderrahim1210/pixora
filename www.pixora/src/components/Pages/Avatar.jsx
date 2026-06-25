import React, { useState } from 'react'

const Avatar = ({ src, alt = "avatar", size = 50, rounded = true }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div data-bs-page="avatar">
            <div className='avatar-container'>
                {
                    !loaded && <div className='skeleton'></div>}
                <img src={src ?? "/outils/pngs/useracc2.png"} alt={alt} style={{ width: size, height: size,borderRadius:"50%" }} className={`avatar-img ${loaded ? "show" : "hide"} ${rounded ? "rounded" : ""}`} onLoad={() => setLoaded(true)} onError={(e) => e.target.src = "/outils/pngs/useracc2.png"} />
            </div>

        </div>
    )
}

export default Avatar