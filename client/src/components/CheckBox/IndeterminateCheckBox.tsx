import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { formatDepartmentJSON } from "../Department/formatDepartmentJSON";
import {
  FormattedDepartment,
  FormattedSubDepartment,
} from "../../interfaces/FormattedDepartmentInterface";
import { DepartmentInterface } from "../../interfaces/DepartmentInterface";
import { Collapse, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface PropsType {
  departmentsDetail: DepartmentInterface[];
}

const defaultDepartment: FormattedDepartment[] = [
  {
    department: {
      name: "default",
      checked: false,
      indeterminateChecked: false,
      expanded: false,
    },
    sub_departments: [
      {
        name: "deafult",
        checked: false,
      },
    ],
  },
];

export default function IndeterminateCheckbox(props: PropsType) {
  const { departmentsDetail } = props;
  const [departmentList, setDepartmentList] =
    useState<FormattedDepartment[]>(defaultDepartment);

  useEffect(() => {
    const formattedList = formatDepartmentJSON(departmentsDetail);
    setDepartmentList(formattedList);
  }, [departmentsDetail]);

  const shouldIndeterminatedChecked = (
    subDepartment: FormattedSubDepartment[]
  ) => {
    return subDepartment.some((list) => list.checked);
  };

  const handleDepartmentCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    departmentIndex: number
  ): void => {
    const checked = event.target.checked;
    if (checked) {
      setDepartmentList((prevDepartments) => {
        const updatedDepartments = [...prevDepartments];
        updatedDepartments[departmentIndex].department.checked = true;
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          false;

        // If the department checkbox is checked, update all sub-departments
        if (departmentIndex >= 0) {
          updatedDepartments[departmentIndex].sub_departments.forEach(
            (subDepartment) => (subDepartment.checked = true)
          );
        }

        return updatedDepartments;
      });
    } else {
      setDepartmentList((prevDepartments) => {
        const updatedDepartments = [...prevDepartments];
        updatedDepartments[departmentIndex].department.checked = false;
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          false;

        // If the department checkbox is checked, update all sub-departments
        if (departmentIndex >= 0) {
          updatedDepartments[departmentIndex].sub_departments.forEach(
            (subDepartment) => (subDepartment.checked = false)
          );
        }

        return updatedDepartments;
      });
    }
  };

  const isAllSubDepartmentsChecked = (
    sub_departments: FormattedSubDepartment[]
  ): boolean => {
    for (const subDepartment of sub_departments) {
      if (!subDepartment.checked) {
        return false; // Return false if any sub-department is not checked
      }
    }
    return true; // Return true if all sub-departments are checked
  };

  const handleSubDepartmentCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    departmentIndex: number,
    subDepartmentIndex: number
  ): void => {
    if (event.target.checked) {
      const updatedDepartments = [...departmentList];
      updatedDepartments[departmentIndex].sub_departments[
        subDepartmentIndex
      ].checked = true;
      // check for if all sub department is checked or not
      const result = isAllSubDepartmentsChecked(
        updatedDepartments[departmentIndex].sub_departments
      );
      if (result) {
        updatedDepartments[departmentIndex].department.checked = true;
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          false;
      } else if (
        shouldIndeterminatedChecked(
          updatedDepartments[departmentIndex].sub_departments
        )
      ) {
        updatedDepartments[departmentIndex].department.checked = false;
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          true;
      } else {
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          false;
      }

      setDepartmentList(updatedDepartments);
    } else {
      const updatedDepartments = [...departmentList];
      updatedDepartments[departmentIndex].sub_departments[
        subDepartmentIndex
      ].checked = false;
      // check for if all sub department is checked or not
      if (
        shouldIndeterminatedChecked(
          updatedDepartments[departmentIndex].sub_departments
        )
      ) {
        updatedDepartments[departmentIndex].department.checked = false;
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          true;
      } else {
        updatedDepartments[departmentIndex].department.indeterminateChecked =
          false;
      }
      setDepartmentList(updatedDepartments);
    }
  };

  const handleCollapse=(departmentIndex:number):void=>{
    setDepartmentList((prevDepartment)=>{
      const updatedDepartments = [...prevDepartment];
      updatedDepartments[departmentIndex].department.expanded = !(updatedDepartments[departmentIndex].department.expanded);
      return updatedDepartments;
    })
  }

  return (
    <div>
      {departmentList &&
        departmentList.map((data, departmentIndex: number) => {
          return (
            <React.Fragment key={departmentIndex}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex" }}>
                  <IconButton onClick={()=>handleCollapse(departmentIndex)}>
                    { !data.department.expanded ? <AddIcon /> : <RemoveIcon />}
                  </IconButton>
                  <FormControlLabel
                    label={data.department.name}
                    control={
                      <Checkbox
                        checked={data.department.checked}
                        indeterminate={data.department.indeterminateChecked}
                        onChange={(e) =>
                          handleDepartmentCheckBox(e, departmentIndex)
                        }
                      />
                    }
                  />
                </Box>
                <Collapse in={data.department.expanded}>

                {data.sub_departments.map(
                  (subDepartment, subDepartmentIndex: number) => {
                    return (
                      <React.Fragment key={subDepartmentIndex}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 10,
                          }}
                        >
                          <FormControlLabel
                            label={subDepartment.name}
                            control={
                              <Checkbox
                                checked={subDepartment.checked}
                                onChange={(e) =>
                                  handleSubDepartmentCheckBox(
                                    e,
                                    departmentIndex,
                                    subDepartmentIndex
                                  )
                                }
                              />
                            }
                          />
                        </Box>
                      </React.Fragment>
                    );
                  }
                )}
                </Collapse>

              </Box>
            </React.Fragment>
          );
        })}
    </div>
  );
}
