import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const Terms = () => {
    const { tab } = useParams();
    const [activeTab, setActiveTab] = useState(tab ?? 'terms');

    return (
        <div className="legal-container">
            <Helmet>
                <title>Pixora | Terms , Privacy & Cookies</title>
            </Helmet>
            <div className="legal-wrapper">
                <aside className="legal-sidebar">
                    <h2 className="sidebar-title">Legal Center</h2>
                    <nav>
                        <button
                            className={activeTab === 'terms' ? 'active' : ''}
                            onClick={() => setActiveTab('terms')}
                        >
                            Terms of Service
                        </button>
                        <button
                            className={activeTab === 'privacy' ? 'active' : ''}
                            onClick={() => setActiveTab('privacy')}
                        >
                            Privacy Policy
                        </button>
                        <button
                            className={activeTab === 'cookies' ? 'active' : ''}
                            onClick={() => setActiveTab('cookies')}
                        >
                            Cookies Policy
                        </button>
                    </nav>
                </aside>

                <main className="legal-content">
                    {activeTab === 'terms' && (
                        <section className="animate-fade">
                            <h1>Terms of Service</h1>
                            <p className="last-updated">Last updated: May 2026</p>

                            <h3>1. Acceptance of Terms</h3>
                            <p>By accessing Pixora, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>

                            <h3>2. User Content</h3>
                            <p>You retain all ownership rights to the photos you upload. However, by posting on Pixora, you grant us a non-exclusive license to display your content.</p>

                            <h3>3. Account Security</h3>
                            <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                        </section>
                    )}

                    {activeTab === 'privacy' && (
                        <section className="animate-fade">
                            <h1>Privacy Policy</h1>
                            <p className="last-updated">Last updated: May 2026</p>

                            <h3>1. Data We Collect</h3>
                            <p>We collect information you provide directly to us, such as your name, email, and photos you upload.</p>

                            <h3>2. How We Use Data</h3>
                            <p>Your data helps us personalize your experience and improve the Pixora community.</p>
                        </section>
                    )}
                    {activeTab === 'cookies' && (
                        <section className="animate-fade">
                            <h1>Cookie Policy</h1>
                            <p className="last-updated">Last updated: May 2026</p>

                            <div className="cookie-info-box">
                                <p>At <strong>Pixora</strong>, we use cookies to improve your experience and analyze our traffic. By using our platform, you consent to our use of cookies.</p>
                            </div>

                            <h3>1. What are Cookies?</h3>
                            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and keep you logged in.</p>
                            
                            <h3>2. How We Use Them</h3>
                            <p>We use cookies for:
                                <ul>
                                    <li><strong>Authentication:</strong> To keep you signed in while you browse.</li>
                                    <li><strong>Preferences:</strong> To remember your language and theme (Dark/Light mode).</li>
                                    <li><strong>Analytics:</strong> To understand how users interact with Pixora and fix bugs.</li>
                                </ul>
                            </p>
                            
                            <h3>3. Managing Cookies</h3>
                            <p>You can control or reset your cookies through your browser settings. However, please note that some features of Pixora may not function properly if cookies are disabled.</p>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Terms