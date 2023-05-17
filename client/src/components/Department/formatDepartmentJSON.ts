export const formatDepartmentJSON = (data: any[]) => {
    if (data.length === 0) return [];
    
    return data.map(d => ({
      department: {
        name: d.department,
        checked: false,
        indeterminateChecked: false
      },
      sub_departments: d.sub_departments.map(sub => ({
        name: sub,
        checked: false,
      })),
    }));
  };
  