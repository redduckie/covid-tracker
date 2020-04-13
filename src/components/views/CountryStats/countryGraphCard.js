import React from 'react';
import _ from 'lodash';
import { Card, Row, Col } from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts"

const CountryGraphCard = ({ title, data, xAxis, yAxis }) => {
    return (
        <div className="site-card-wrapper">
            <Row>
                <Col>
                    <Card title={title} bordered={true}>
                        <Chart height={400} data={data} forceFit>
                            <Axis name={xAxis} />
                            {_.map(yAxis, y => {
                                return <>
                                    <Axis name={y.name} />
                                    <Geom type="line" color={yAxis.color} position={`${xAxis}*${y.name}`} size={2} />
                                    <Geom
                                        type="point"
                                        position={`${xAxis}*${y.name}`}
                                        size={4}
                                        shape={"circle"}
                                        style={{
                                            stroke: "#fff",
                                            lineWidth: 1
                                        }}
                                    /></>
                            })}
                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                        </Chart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CountryGraphCard;