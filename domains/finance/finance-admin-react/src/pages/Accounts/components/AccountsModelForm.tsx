/* eslint-disable react/prop-types */
import { Form, Input, Modal, Radio } from 'antd';
import { useEffect, useState } from 'react';

type RuleModalFormProps = {
  open: boolean;
  onCancel: () => void;
  onFinish:
    | (((formData: Record<string, any>) => Promise<boolean | void>) &
        ((formData: Record<string, any>) => Promise<any>))
    | undefined;
  values: any;
  title: string;
  width: number;
  type: string;
};

const AccountsModelForm: React.FC<RuleModalFormProps> = (props) => {
  const { title, open, width, values, type, onFinish, onCancel } = props;

  const [radioValue, setRadioValue] = useState<string>();
  const [form] = Form.useForm();

  useEffect(() => {
    setRadioValue(values.platform || 'AZURE_EA');
  }, [values]);

  return (
    <>
      <Modal
        title={title}
        open={open}
        width={width ? width : 400}
        onOk={() => form.submit()}
        onCancel={onCancel}
        destroyOnClose={true}
        bodyStyle={{ padding: 20 }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 550 }}
          initialValues={values}
          onFinish={onFinish}
          autoComplete="off"
          disabled={type === 'show'}
          preserve={false}
        >
          <Form.Item
            label="云平台"
            name="platform"
            rules={[
              {
                required: true,
                message: '云平台必须选择',
              },
            ]}
            className="img_radio"
            initialValue={values.platform || 'AZURE_EA'}
          >
            <Radio.Group
              disabled={!(type === 'add')}
              onChange={(e) => {
                setRadioValue(e.target.value);
              }}
            >
              {type === 'add' ? (
                <>
                  <Radio.Button value={'AZURE_EA'}>
                    <img src="/images/AZURE_EA.png" />
                  </Radio.Button>
                  <Radio.Button value={'ALI'}>
                    <img src="/images/ALI.png" />
                  </Radio.Button>
                  <Radio.Button value={'AWS'}>
                    <img src="/images/AWS.png" />
                  </Radio.Button>
                </>
              ) : (
                <Radio.Button value={values.platform}>
                  <img src={`/images/${values.platform}.png`} />
                </Radio.Button>
              )}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="账号名称"
            name="account"
            rules={[{ required: true, message: '账号名称必须填写' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={`${radioValue}账号`}
            name="eaContractNum"
            rules={[{ required: true, message: '云平台账号必须填写' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={`${radioValue}密码`}
            name="secretKey"
            rules={[{ required: true, message: '云平台密码必须填写' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountsModelForm;
