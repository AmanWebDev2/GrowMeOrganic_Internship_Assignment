import { DepartmentInterface } from "../../models/departmentInterface";

export const formatDepartmentJSON = (data: DepartmentInterface[]) => {
    if (data.length === 0) return [];
    
    return data.map((d,i) => ({
      department: {
        name: d.department,
        checked: false,
        indeterminateChecked: false,
        // default expand first department
        expanded: i==0 ? true : false,
      },
      sub_departments: d.sub_departments.map(sub => ({
        name: sub,
        checked: false,
      })),
    }));
  };
  