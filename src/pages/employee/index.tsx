import React, { Component } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import './index.css';

import QueryForm from '@components/employee/QueryForm';
import { EmployeeRequest, EmployeeResponse } from '@/api/employee';
import { getEmployee } from '@/store/employee'

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

interface Props {
  fetchEmployee(param: EmployeeRequest): void;
  employeeList: EmployeeResponse;
}

class Employee extends Component<Props> {

  render() {
    return (
      <>
        <QueryForm fetchEmployee={ this.props.fetchEmployee } />
        {/* 把一个请求数据的redux方法getEmployee传给子组件，让它在适当时机调用并传入参数，返回的结果自动存入redux */}
        <Table columns={employeeColumns} dataSource={this.props.employeeList} className="table" />
        {/* 把redux中的数据state.employee.employeeList传给子组件 */}
      </>
    );
  }
}

// 状态映射
const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList,
});

// action映射
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchEmployee: getEmployee }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Employee);