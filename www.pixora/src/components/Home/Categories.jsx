import React from 'react'
import { Link } from 'react-router-dom'
const Categories = () => {
    return (
        <div
            className="container-fluid tab-pane fade show mt-3 mb-3"
            id="categories"
        >
            <div className="for-you-header d-flex justify-content-center align-items-center flex-column text-center gap-1 mb-2">
                <h1 className="fw-bold text-center">Categories</h1>
                <span className="text-muted fw-light greeting-text">
                    — Explore the world through different lenses. —
                </span>
            </div>
            <div className="container-fluid mt-3 mb-3">
                <div className="categories">
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=nature`}>
                                    <h3>Nature</h3>
                                    <img src="/outils/categories/nature.webp" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=animal`}>
                                    <h3>Animals</h3>
                                    <img src="/outils/categories/animals.webp" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=architecture`}>
                                    <h3>Architecture</h3>
                                    <img src="/outils/categories/artchitecture.webp" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=landscape`}>
                                    <h3>Landscape</h3>
                                    <img src="/outils/categories/landscape.webp" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=people`}>
                                <div className="info1">
                                    <h3>People</h3>
                                    <img src="/outils/categories/peopl.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=travel`}>
                                <div className="info1">
                                    <h3>Travel</h3>
                                    <img src="/outils/categories/travel.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=technology`}>
                                <div className="info1">
                                    <h3>Technology</h3>
                                    <img src="/outils/categories/tech.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=fantasy`}>
                                <div className="info1">
                                    <h3>Fantasy / Anime</h3>
                                    <img src="/outils/categories/fantasy.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=food`}>
                                <div className="info1">
                                    <h3>Food &amp; Drinks</h3>
                                    <img src="/outils/categories/food.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=cars`}>
                                <div className="info1">
                                    <h3>Cars</h3>
                                    <img src="/outils/categories/cars.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=sport`}>
                                <div className="info1">
                                    <h3>Sports</h3>
                                    <img src="/outils/categories/sport.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=abstract`}>
                                <div className="info1">
                                    <h3>Abstract</h3>
                                    <img src="/outils/categories/abstract.webp" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories