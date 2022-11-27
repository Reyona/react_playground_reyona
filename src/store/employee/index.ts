import { Dispatch } from 'redux';
import { EmployeeRequest, EmployeeResponse, queryEmployee } from '@/api/employee';
import { Employee } from '../actions';

type State = Readonly<{ employeeList: EmployeeResponse }>;
type Action = { type: string; payload: EmployeeResponse };

// 初始状态
const initialState: State = { employeeList: undefined };

export function getEmployee(param: EmployeeRequest) {
  return async (dispatch: Dispatch) => {
    const data = await queryEmployee(param);
    dispatch({ type: Employee.GET_EMPLOYEE, payload: data });
    // queryEmployee(param).then((data) => {
    //   dispatch({ type: GET_EMPLOYEE, payload: data });
    // });
  };
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case Employee.GET_EMPLOYEE:
      return { ...state, employeeList: action.payload };
    default:
      return state;
  }
}
