import { DepartmentInterface } from '../../interfaces/DepartmentInterface';
import IndeterminateCheckbox from '../CheckBox/IndeterminateCheckBox'

interface PropsType {
  departmentsDetail: DepartmentInterface[]
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