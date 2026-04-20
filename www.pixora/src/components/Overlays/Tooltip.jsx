import React from 'react'

const Tooltip = ({children,title,text}) => {
    return (
        <div className="tooltip-wrapper">
            <div className="tooltip-trigger">
                {children}
            </div>

            <div className="tooltip-box">
                <div className="tooltip-content">
                    {title && <h6>{title}</h6>}
                    <p>{text}</p>
                </div>
                <div className="tooltip-arrow"></div>
            </div>
        </div>
    )
}

export default Tooltip