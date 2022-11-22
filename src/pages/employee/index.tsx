import React, { Component } from 'react';
import { Table } from 'antd';
import './index.css';

import QueryForm from '@components/employee/QueryForm';
import { EmployeeResponse } from '@/api/employee';

const employeeColumns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "部门",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "入职时间",
    dataIndex: "hiredate",
    key: "hiredate",
  },
  {
    title: "职级",
    dataIndex: "level",
    key: "level",
  },
];

interface State {
  employee: EmployeeResponse;
}

class Employee extends Component<{}, State> {
  state: State = { employee: undefined };

  handleQueryData = (data: EmployeeResponse) => {
    this.setState({ employee: data });
  }

  render() {
    return (
      <>
        <QueryForm onDataChange={this.handleQueryData} />
        <Table columns={employeeColumns} dataSource={this.state.employee} className="table" />
      </>
    );
  }
}

export default Employee;