import React from 'react';
import {Card} from 'antd';

const CountryGraphCard = ({ title }) => {
    return (
        <div className="site-card-wrapper">
            <Card title={title} bordered={false}>
                {title}
            </Card>
        </div>
    );
}

export default CountryGraphCard;