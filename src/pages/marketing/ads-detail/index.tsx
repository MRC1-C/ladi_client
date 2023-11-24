import { GridContent, Statistic, StatisticCard } from '@ant-design/pro-components'
import { Row, Col, Card } from 'antd'
import { Area, Stock, Facet, Radar } from '@ant-design/plots';
import { useEffect, useState } from 'react';

// import Trend from './components/Trend';
// import { InfoCircleOutlined } from '@ant-design/icons';


const AdsDetail = () => {
    const [data1, setData1] = useState([]);

    useEffect(() => {
        asyncFetch1();
    }, []);

    const asyncFetch1 = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
            .then((response) => response.json())
            .then((json) => setData1(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config1 = {
        data: data1,
        xField: 'item',
        yField: 'score',
        seriesField: 'user',
        meta: {
            score: {
                alias: '分数',
                min: 0,
                max: 80,
            },
        },
        xAxis: {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    style: {
                        lineDash: null,
                    },
                },
            },
        },
        yAxis: {
            line: null,
            tickLine: null,
            grid: {
                line: {
                    type: 'line',
                    style: {
                        lineDash: null,
                    },
                },
                alternateColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
        // 开启面积
        area: {},
        // 开启辅助点
        point: {
            size: 2,
        },
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'country',
        slider: {
            start: 0.1,
            end: 0.9,
        },
    };
    const [data2, setData2] = useState([]);

    useEffect(() => {
        asyncFetch2();
    }, []);

    const asyncFetch2 = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/2Qttbqxmtw/symmetry-data.json')
            .then((response) => response.json())
            .then((json) => setData2(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config2 = {
        data: data2,
        fields: ['gender'],
        transpose: true,
        padding: [32, 16, 28, 16],
        meta: {
            age: {
                sync: true,
                tickCount: 11,
            },
            total_percentage: {
                sync: true,

                formatter(v: any) {
                    return v + '%';
                },
            },
            gender: {
                sync: true,
            },
        } as any,
        axes: {},
        eachView: (_: any, f: any) => {
            return {
                padding: [0, 48, 0, 0],
                type: 'column',
                options: {
                    data: f.data,
                    xField: 'age',
                    yField: 'total_percentage',
                    seriesField: 'gender',
                    color: ['#1890ff', '#f04864'],
                },
            } as any;
        },
    };

    const [data3, setData3] = useState([]);

    useEffect(() => {
        asyncFetch3();
    }, []);

    const asyncFetch3 = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
            .then((response) => response.json())
            .then((json) => setData3(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config3 = {
        data: data3,
        xField: 'trade_date',
        yField: ['open', 'close', 'high', 'low'] as any,
        meta: {
            vol: {
                alias: '成交量',
            },
            open: {
                alias: '开盘价',
            },
            close: {
                alias: '收盘价',
            },
            high: {
                alias: '最高价',
            },
            low: {
                alias: '最低价',
            },
        },
        tooltip: {
            crosshairs: {
                // 自定义 crosshairs line 样式
                line: {
                    style: {
                        lineWidth: 0.5,
                        stroke: 'rgba(0,0,0,0.25)',
                    },
                },
                text: (type: any, defaultContent: any, items: any) => {
                    let textContent;

                    if (type === 'x') {
                        const item = items[0];
                        textContent = item ? item.title : defaultContent;
                    } else {
                        textContent = `${defaultContent.toFixed(2)}`;
                    }

                    return {
                        position: type === 'y' ? 'start' : 'end',
                        content: textContent,
                        // 自定义 crosshairs text 样式
                        style: {
                            fill: '#dfdfdf',
                        },
                    };
                },
                // 自定义 crosshairs textBackground 样式
                textBackground: {
                    padding: [4, 8],
                    style: {
                        fill: '#363636',
                    },
                },
            },
        },
    };


    return (
        <GridContent className='p-2'>
            <Row gutter={12} style={{ margin: 0 }}>
                {[1, 2, 3, 4].map(_ => <Col xl={6} lg={24} md={24} sm={24} xs={24} className='pb-4' >
                    <StatisticCard
                        // colSpan={6}
                        title="Chỉ tiêu thực hiện năm tài chính"
                        statistic={{
                            value: 82.6,
                            suffix: 'VNĐ',
                            description: <Statistic title="Ngày này" value="6.47%" trend="up" />,
                        }}
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                                alt="进度条"
                                width="100%"
                            />
                        }
                    />
                </Col>)}
            </Row>
            <Row gutter={12} style={{ margin: 0 }}>
                <Col xl={14} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Việc bán hàng">
                        <Area {...config} />
                    </Card>
                </Col>
                <Col xl={10} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Tỷ lệ danh mục bán hàng">
                        <Radar {...config1} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={12} style={{ margin: 0 }}>
                <Col xl={14} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Việc bán hàng">
                        <Stock {...config3} />
                    </Card>
                </Col>
                <Col xl={10} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Tỷ lệ danh mục bán hàng">
                        <Facet type='mirror' {...config2} />
                    </Card>
                </Col>
            </Row>
        </GridContent>

    )
}

export default AdsDetail