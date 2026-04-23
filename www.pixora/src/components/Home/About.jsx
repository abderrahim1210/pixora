import React from 'react'
import { FaArrowRight, FaCamera, FaGlobe, FaLink, FaStar } from 'react-icons/fa'

const About = () => {
    return (
        <div
            className="tab-pane fade show mt-3 mb-3"
            id="about"
        >
            <div className="about-container">
                <div className="about-content">
                    <h1>About Pixora</h1>
                </div>
                <div className="wave-wrapper">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path
                            fill="#ffffff"
                            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                        </path>
                    </svg>
                </div>
            </div>
            <h1 className="text-center fw-bold">Inspiring Visual Excelllence</h1>
            <div className="container mt-2 mb-2">
                <p>
                    At Pixora, we believe that every image tells a story beyond words.
                    Our platform is built for photographers, visual artists, and creative minds who seek more than just sharing — they seek impact.
                    Pixora is a premium space where creativity meets recognition.
                    We curate high-quality visual content, empowering artists to showcase their work, gain visibility, and connect with a global community that appreciates true artistry.
                    Whether you're here to exhibit your portfolio, discover unique perspectives, or get inspired — Pixora is where creativity finds its voice.
                </p>
            </div>
            <div className="container-fluid about-features mt-3 mb-3">
                <div className="about-feature">
                    <div>
                        <FaGlobe className="feature-icon" />
                    </div>
                    <div>
                        <h3>Global Community</h3>
                        <p>Connecting photographers and artists from all corners of the world.</p>
                    </div>
                </div>
                <div className="about-feature">
                    <div>
                        <FaStar className="feature-icon" />
                    </div>
                    <div>
                        <h3>Curated Excellence</h3>
                        <p>Showcasing the best in photgraphy and digital art.</p>
                    </div>
                </div>
                <div className="about-feature">
                    <div>
                        <FaCamera className="feature-icon" />
                    </div>
                    <div>
                        <h3>Premium Hub</h3>
                        <p>Offering a seamless experience for discovering and sharing visual art.</p>
                    </div>
                </div>
            </div>
            <div className="owner-infos mt-3 mb-3">
                <div className="owner-image">
                    <img src="/outils/jpg/owner.jpg" alt="owner" />
                </div>
                <div className="owner-texts">
                    <h3>Founder-Building Pixora</h3>
                    <p>I’m a passionate designer and developer focused on creating modern and user-friendly digital experiences.
                        I enjoy turning ideas into clean, visually appealing designs while paying attention to every detail.
                        Through my work, I aim to deliver high-quality visuals that help people express their ideas in a creative and impactful way. <a href="Consultez le profil de Abderrahim Khali Ali sur LinkedIn https://ma.linkedin.com/in/abderrahim-khali-ali-b5865734b" className="linkedin-link"><FaLink className="icon" /> LinkedIn</a></p>
                </div>
            </div>
            <div className="join-community mt-3 mb-3">
                <div className="join-community-texts">
                    <h2>join the pixora community</h2>
                    <p>Become part of a global hub for creative minds and visual artists.</p>
                    <button className="btn">Join now <FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}

export default About