export interface DepartmentInterface {
    department: string,
    sub_department: SubDepartmentInterface[]
}

interface SubDepartmentInterface {
    sub_departments: string[] 
}