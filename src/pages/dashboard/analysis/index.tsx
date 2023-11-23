import { GridContent, ProCard, Statistic, StatisticCard } from '@ant-design/pro-components'
import { Divider, Tooltip, Row, Col, Card } from 'antd'
import { Column, Pie, measureTextWidth } from '@ant-design/plots';

// import Trend from './components/Trend';
// import { InfoCircleOutlined } from '@ant-design/icons';


const Analysis = () => {
    const data = [
        {
          type: '1-3秒',
          value: 0.16,
        },
        {
          type: '4-10秒',
          value: 0.125,
        },
        {
          type: '11-30秒',
          value: 0.24,
        },
        {
          type: '31-60秒',
          value: 0.19,
        },
        {
          type: '1-3分',
          value: 0.22,
        },
        {
          type: '3-10分',
          value: 0.05,
        },
        {
          type: '10-30分',
          value: 0.01,
        },
        {
          type: '30+分',
          value: 0.015,
        },
      ];
      const paletteSemanticRed = '#F4664A';
      const brandColor = '#5B8FF9';
      const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        color: ({ type }) => {
          if (type === '10-30分' || type === '30+分') {
            return paletteSemanticRed;
          }
    
          return brandColor;
        },
        label: {
          content: (originData) => {
            const val = parseFloat(originData.value);
    
            if (val < 0.05) {
              return (val * 100).toFixed(1) + '%';
            }
          },
          offset: 10,
        },
        legend: false,
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
      };
      function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
    
        let scale = 1;
    
        if (containerWidth < textWidth) {
          scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }
    
        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
      }

      const data1 = [
        {
          type: '分类一',
          value: 27,
        },
        {
          type: '分类二',
          value: 25,
        },
        {
          type: '分类三',
          value: 18,
        },
        {
          type: '分类四',
          value: 15,
        },
        {
          type: '分类五',
          value: 10,
        },
        {
          type: '其他',
          value: 5,
        },
      ];
      const config1 = {
        appendPadding: 10,
        data: data1,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: (v) => `${v} ¥`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          style: {
            textAlign: 'center',
          },
          autoRotate: false,
          content: ({type,percent})=>type +'\n'+ (percent*100).toFixed(0)+'%',
        },
        statistic: {
          title: {
            offsetY: -4,
            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect();
              const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
              const text = datum ? datum.type : '总计';
              return renderStatistic(d, text, {
                fontSize: 28,
              });
            },
          },
          content: {
            offsetY: 4,
            style: {
              fontSize: '32px',
            },
            customHtml: (container, view, datum, data) => {
              const { width } = container.getBoundingClientRect();
              const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
              return renderStatistic(width, text, {
                fontSize: 32,
              });
            },
          },
        },
        // 添加 中心统计文本 交互
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
          {
            type: 'pie-statistic-active',
          },
        ],
      };
    return (
        <div className='p-2'>
            <Row gutter={12} style={{margin: 0}}>
                {[1,2,3,4].map(_=><Col xl={6} lg={24} md={24} sm={24} xs={24} className='pb-4' >
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
            <Row gutter={12} style={{margin: 0}}>
                <Col xl={14} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Việc bán hàng">
                        <Column {...config} />
                    </Card>
                </Col>
                <Col xl={10} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Tỷ lệ danh mục bán hàng">
                        <Pie {...config1} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={12} style={{margin: 0}}>
                <Col xl={14} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Việc bán hàng">
                        <Column {...config} />
                    </Card>
                </Col>
                <Col xl={10} lg={24} md={24} sm={24} xs={24} className='pb-4'>
                    <Card title="Tỷ lệ danh mục bán hàng">
                        <Pie {...config1} />
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default Analysis