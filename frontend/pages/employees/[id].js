import { EmployeeEdit } from "../../components/employees/EmployeeEdit";
import { employeeService } from "../../services/employee.service";

export default EmployeeEdit;

export async function getInitialProps({ params }) {
  const employee = await employeeService.getById(params.id);

  return {
    props: { employee },
  };
}
