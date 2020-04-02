// External Libraries **************************************************
import React from 'react';


interface PageHeaderProps {
    title: string
}

// React Component *****************************************************
const PageHeader = ({title}: PageHeaderProps) => {
    return (
        <div className="pageHeaderContainer">
            <h3>{title}</h3>
        </div>
    )
};

export default PageHeader;