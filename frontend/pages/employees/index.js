import { useState, useEffect } from "react";

import Link from "next/link";
import { employeeService } from "../../services/employee.service";
import { MainLayout } from "../../components/MainLayout";

export default function Index() {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    employeeService.getAll().then((x) => setEmployees(x));
  }, []);

  function deleteEmployee(id) {
    setEmployees(
      employees.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    employeeService.delete(id).then(() => {
      setEmployees((employees) => employees.filter((x) => x.id !== id));
    });
  }

  return (
    <MainLayout>
      <div>
        <h1>Employees</h1>
        <Link href="/employees/create">
          <a className="btn btn-sm btn-success mb-2">Add Employee</a>
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>First Name</th>
              <th style={{ width: "30%" }}>Last Name</th>
              <th style={{ width: "30%" }}>Email</th>
              <th style={{ width: "30%" }}>Age</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.age}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/employees/${employee.id}`}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      <a className="btn btn-sm btn-primary">Edit</a>
                    </Link>{" "}
                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="btn btn-sm btn-danger"
                      disabled={employee.isDeleting}
                    >
                      {employee.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!employees && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {employees && !employees.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No Employees To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
