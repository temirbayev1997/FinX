import { Card, Row, Col, Statistic } from "antd";

export default function Dashboard() {
  return (
    <div>

      <h1 style={{ marginBottom: 20 }}>Главная</h1>

      <Row gutter={16}>
        
        <Col span={6}>
          <Card>
            <Statistic title="Баланс" value={700000} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Доход" value={1000000} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Расход" value={300000} suffix="₸" />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Налог" value={30000} suffix="₸" />
          </Card>
        </Col>

      </Row>

    </div>
  );
}