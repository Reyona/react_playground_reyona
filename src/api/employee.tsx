import { get, post } from '@/common/request'

export const GET_EMPLOYEE_URL = '/api/employee/getEmployee.action';

interface EmployeeInfo {
    id: number;
    key: number;
    name: string;
    department: string;
    hiredate: string;
    level: string;
}

export interface EmployeeRequest {
    name: string;
    departmentId: number | undefined;
}

export type EmployeeResponse = EmployeeInfo[] | undefined;

export function queryEmployee(param: EmployeeRequest):Promise<EmployeeResponse> {
    return get(GET_EMPLOYEE_URL, param);
}