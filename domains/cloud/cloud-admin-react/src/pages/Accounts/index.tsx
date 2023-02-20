import AccountsCards from './components/AccountsCards';
import { Col, Row, Button, Progress, Tooltip, Modal, message, Spin, Empty } from 'antd';
import AccountsModelForm from './components/AccountsModelForm';
import { getList, addList, editList, delList } from './hooks/useRules';
import { useEffect, useState } from 'react';

const Accounts: React.FC = () => {
  const maxAccount: number = 10;
  // states
  const [newRuleFormOpen, setNewRuleFormOpen] = useState<boolean>(false);
  const [values, setvalues] = useState<any>({});
  const [modelTitle, setModelTitle] = useState<string>('');
  const [cardItems, setCardItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>();

  const modelTitleList: any = {
    add: '新建',
    edit: '修改',
    show: '查看',
  };

  const getListData = async () => {
    const result = await getList();
    if (!result.length) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    setLoading(false);
    setCardItems(result);
  };

  const newFun = () => {
    if (cardItems.length >= maxAccount) {
      message.error('您的账号额度已满，若有需要请升级您的账户');
      return;
    }
    setModelTitle('add');
    setvalues({});
    setNewRuleFormOpen(true);
  };
  const showFun = (item: any) => {
    setModelTitle('show');
    setvalues(item);
    setNewRuleFormOpen(true);
  };
  const editFun = (item: any) => {
    setModelTitle('edit');
    setvalues(item);
    setNewRuleFormOpen(true);
  };
  const delFun = (id: number) => {
    Modal.confirm({
      title: '是否确定删除该账号',
      onOk: async () => {
        const success = await delList(id);
        if (success) {
          message.success('删除账号成功');
          getListData();
        }
      },
    });
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <Spin spinning={loading || false} delay={500}>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Row justify="space-between">
          <Col>
            <Row justify="space-between" gutter={16}>
              <Col>
                <span>
                  账号数 {cardItems.length}/{maxAccount}
                </span>
              </Col>
              <Col>
                <div style={{ width: 170 }}>
                  <Progress
                    percent={(cardItems.length / maxAccount) * 100}
                    strokeColor="#6d67ef"
                    size="small"
                    showInfo={false}
                  />
                </div>
              </Col>
              <Col>
                <Tooltip title="账户升级请联系管理员">
                  <a href="#">升级</a>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type="primary" onClick={newFun}>
              新建
            </Button>
          </Col>
        </Row>
      </div>
      {isEmpty === true ? (
        <Empty
          image="/images/empty.png"
          imageStyle={{
            height: 340,
          }}
          description={<span style={{ color: '#8995AD' }}>暂无数据，请配置您的账号</span>}
        />
      ) : isEmpty === false ? (
        <AccountsCards cardItems={cardItems} editFun={editFun} showFun={showFun} delFun={delFun} />
      ) : (
        ''
      )}
      {/* 表单弹窗 */}
      <AccountsModelForm
        open={newRuleFormOpen}
        onCancel={() => setNewRuleFormOpen(false)}
        onFinish={async (value: any) => {
          if (modelTitle === 'add') {
            const success = await addList(value);
            if (success) {
              message.success('添加账号成功');
              setNewRuleFormOpen(false);
              getListData();
            }
          } else if (modelTitle === 'edit') {
            const success = await editList({ ...value, id: values.id });
            if (success) {
              message.success('修改账号成功');
              setNewRuleFormOpen(false);
              getListData();
            }
          } else {
            setNewRuleFormOpen(false);
          }
        }}
        width={700}
        title={modelTitleList[modelTitle]}
        type={modelTitle}
        values={values}
      />
    </Spin>
  );
};

export default Accounts;
