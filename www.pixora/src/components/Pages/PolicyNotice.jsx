import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PolicyNotice = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check wach l-user deja qbel l-cookies
        const consent = localStorage.getItem('pixora_cookies_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('pixora_cookies_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner-overlay">
            <div className="cookie-card">
                <div className="cookie-content">
                    <div className="cookie-icon">🍪</div>
                    <div className="cookie-text">
                        <h4>We use cookies</h4>
                        <p>
                            We use cookies to enhance your experience. By continuing to visit this site you agree to our
                            <Link to={'/terms'}> Cookie Policy</Link>.
                        </p>
                    </div>
                </div>
                <div className="cookie-actions">
                    <button className="btn-decline" onClick={() => setIsVisible(false)}>Decline</button>
                    <button className="btn-accept" onClick={handleAccept}>Accept All</button>
                </div>
            </div>
        </div>
    );
}

export default PolicyNotice