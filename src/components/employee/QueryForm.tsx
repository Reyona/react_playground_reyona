import React, { Component, useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { queryEmployee, EmployeeRequest } from '@/api/employee';

const { Option } = Select;

// 定义属性类型
interface Props {
  fetchEmployee(data: EmployeeRequest): void;
}

// P: props的类型，默认{}
// S: state的类型，EmployeeRequest
class QueryForm extends Component<Props, EmployeeRequest> {
  state = {
    name: '',
    departmentId: undefined,
  };

  /*
   ** 根据 `Antd` 官方接口定义，`Input` 的 `onChange` 回调会返回一个事件类型
   ** onChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
   */
  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  /*
   ** onChange?: ((value: number, option: OptionsType | OptionData | OptionGroupData) => void) | undefined
   */
  handleDepartmentChange = (value: number) => {
    this.setState({ departmentId: value });
  };

  handleSubmit = () => {
    this.queryEmployee(this.state);
  };

  // 组件挂载完成
  componentDidMount() {
    this.queryEmployee(this.state);
  }

  queryEmployee = async (param: EmployeeRequest) => {
    console.log('queryEmployee: ', param);
    const data = await queryEmployee(param);
    // todo 放进redux
    console.log('responseEmployee: ', data);
    this.props.fetchEmployee(param);
  };

  render() {
    return (
      <>
        <Form layout="inline">
          <Form.Item>
            <Input placeholder="姓名" style={{ width: 120 }} allowClear
              value={this.state.name} onChange={this.handleNameChange} />
          </Form.Item>
          <Form.Item>
            <Select placeholder="部门" style={{ width: 120 }} allowClear
              value={this.state.departmentId} onChange={this.handleDepartmentChange}>
              <Option value={1}>技术部</Option>
              <Option value={2}>运营部</Option>
              <Option value={3}>市场部</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const QueryFormHooks = ({fetchEmployee = f => f}: Props) => {
  const [name, setName] = useState('')
  const [departmentId, setDepartmentId] = useState<number | undefined>(undefined)

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value );
  }

  /*
   ** onChange?: ((value: number, option: OptionsType | OptionData | OptionGroupData) => void) | undefined
   */
  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value);
  }

  const handleSubmit = () => {
    fetchEmployee({name, departmentId}); // 父组件提供的redux方法，返回的数据自动放进redux
  }

  // 组件挂载完成
  useEffect(() => {
    fetchEmployee({name, departmentId}); // 父组件提供的redux方法，返回的数据自动放进redux
    return () => {}; // 组件销毁时
  }, [])

  return (
    <>
      <Form layout="inline">
        <Form.Item>
          <Input placeholder="姓名" style={{ width: 120 }} allowClear
            value={name} onChange={handleNameChange} />
        </Form.Item>
        <Form.Item>
          <Select placeholder="部门" style={{ width: 120 }} allowClear
            value={departmentId} onChange={handleDepartmentChange}>
            <Option value={1}>技术部</Option>
            <Option value={2}>运营部</Option>
            <Option value={3}>市场部</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>查询</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default QueryFormHooks;