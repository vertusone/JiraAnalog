import { MainLayout } from "../../components/MainLayout";
import Link from "next/link";

export default function Employees({ employees }) {
  return (
    <MainLayout>
      <div align="center">
        <h1>All employees</h1>
        <br />
        <Link href="/employees/create">
          <a className="btn btn-primary btn-lg">Add new employee</a>
        </Link>
        <br />
        <br />
        <table className="table w-75 p-3">
          <thead>
            <tr className="table-active">
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Job</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <th>{employee.id}</th>
                <td>
                  <Link
                    href={`/employees/[id]`}
                    as={`/employees/${employee.id}`}
                  >
                    <a>{employee.firstName}</a>
                  </Link>
                </td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.age}</td>
                <td>{employee.job && employee.job.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

Employees.getInitialProps = async () => {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const responce = await fetch("https://localhost:5001/api/employee/", {
    agent,
  });
  const employees = await responce.json();

  return {
    employees,
  };
};
