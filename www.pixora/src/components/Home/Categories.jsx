import React from 'react'
import { Link } from 'react-router-dom'
const Categories = () => {
    return (
        <div
            className="container-fluid tab-pane fade show mt-3 mb-3"
            id="categories"
        >
            <h1 className="fw-bold text-center">Categories</h1>
            <div className="container-fluid mt-3 mb-3">
                <div className="categories">
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=nature`}>
                                    <h3>Nature</h3>
                                    <img src="/outils/categories/nature.jpg" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=animal`}>
                                    <h3>Animals</h3>
                                    <img src="/outils/categories/animals.jpg" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=architecture`}>
                                    <h3>Architecture</h3>
                                    <img src="/outils/categories/artchitecture.jpg" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <div className="info1">
                                <Link to={`/search?searchTerme=landscape`}>
                                    <h3>Landscape</h3>
                                    <img src="/outils/categories/landscape.jpg" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=people`}>
                                <div className="info1">
                                    <h3>People</h3>
                                    <img src="/outils/categories/peopl.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=travel`}>
                                <div className="info1">
                                    <h3>Travel</h3>
                                    <img src="/outils/categories/travel.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=technology`}>
                                <div className="info1">
                                    <h3>Technology</h3>
                                    <img src="/outils/categories/tech.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=fantasy`}>
                                <div className="info1">
                                    <h3>Fantasy / Anime</h3>
                                    <img src="/outils/categories/fantasy.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=food`}>
                                <div className="info1">
                                    <h3>Food &amp; Drinks</h3>
                                    <img src="/outils/categories/food.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=cars`}>
                                <div className="info1">
                                    <h3>Cars</h3>
                                    <img src="/outils/categories/cars.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=sport`}>
                                <div className="info1">
                                    <h3>Sports</h3>
                                    <img src="/outils/categories/sport.jpg" alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="category">
                        <div className="image">
                            <Link to={`/search?searchTerme=abstract`}>
                                <div className="info1">
                                    <h3>Abstract</h3>
                                    <img src="/outils/categories/abstract.jpg" alt="" />
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