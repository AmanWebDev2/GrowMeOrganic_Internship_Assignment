export interface FormattedDepartment 
{
    department: {
      name: string;
      checked: boolean;
      indeterminateChecked: boolean
    },
    sub_departments: FormattedSubDepartment[];
}
  
export interface FormattedSubDepartment {
    name: string;
    checked: boolean;
  }
  