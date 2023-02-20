/* eslint-disable react/prop-types */
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import { Col, Row, Card, Space, Typography } from 'antd';
import '../index.css';

const { Text } = Typography;

type AccountsCardsProps = {
  cardItems: any[];
  editFun: (item: any) => void;
  showFun: (item: any) => void;
  delFun: (id: number) => void;
};

const AccountsCards: React.FC<AccountsCardsProps> = ({ cardItems, editFun, showFun, delFun }) => {
  return (
    <Row gutter={[16, 16]}>
      {cardItems.map((item, index) => {
        return (
          <Col className="gutter-row" xs={24} lg={8} key={index}>
            <Card className="account_card">
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row justify="space-between">
                  <Col style={{ width: 'calc(100% - 120px)' }}>
                    <Text
                      style={{ fontSize: 21, fontWeight: 500 }}
                      ellipsis={{ tooltip: item.account }}
                    >
                      {item.account}
                    </Text>
                  </Col>
                  <Col className="account_img_content">
                    {item.initialized === 0 ? (
                      <Text className="account_init">数据初始化中...</Text>
                    ) : (
                      <img className="account_img" src={item.cloudImg} />
                    )}
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <Text style={{ color: '#8995AD' }}>创建时间 ：{item.createTime}</Text>
                  </Col>
                  <Col>
                    <Row justify="space-between" gutter={16}>
                      <Col>
                        <div className="account_icon" onClick={() => showFun(item)}>
                          <EyeFilled />
                        </div>
                      </Col>
                      <Col>
                        <div className="account_icon" onClick={() => editFun(item)}>
                          <EditFilled />
                        </div>
                      </Col>
                      <Col>
                        <div className="account_icon" onClick={() => delFun(item.id)}>
                          <DeleteFilled />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default AccountsCards;
