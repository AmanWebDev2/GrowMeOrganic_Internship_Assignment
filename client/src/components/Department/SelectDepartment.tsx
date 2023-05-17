import React from 'react'
import IndeterminateCheckbox from '../CheckBox/IndeterminateCheckBox'

interface PropsType {
  departmentsDetail: any
}

const SelectDepartment = (props:PropsType) => {
  const {departmentsDetail} = props;
  return (
    <>
    <IndeterminateCheckbox departmentsDetail={departmentsDetail}/>
    </>
  )
}

export default SelectDepartment