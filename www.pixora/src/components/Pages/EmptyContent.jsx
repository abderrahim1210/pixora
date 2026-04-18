import React from 'react'

export const EmptyContent = ({icon,text}) => {
    return (
        <div className="container-fluid">
            <div className="empty-content">
                <div className="empty-content-item">
                    {icon}
                    <h4>{text}</h4>
                </div>
            </div>
        </div>
    )
}
