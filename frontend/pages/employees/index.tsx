import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

import { employeeService } from "../../services/employee.service";
import { MainLayout } from "../../components/MainLayout";
import AccessDenied from "../../components/AccessDenied";

export default function Index() {
  const [session] = useSession();

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

  if (!session) {
    return (
      <MainLayout>
        <AccessDenied />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Employees list</title>
      </Head>

      <div>
        <h1>Employees</h1>
        <Link href="/employees/create">
          <a className="btn btn-sm btn-success mb-2">Add Employee</a>
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>First Name</th>
              <th style={{ width: "20%" }}>Last Name</th>
              <th style={{ width: "20%" }}>Email</th>
              <th style={{ width: "20%" }}>Age</th>
              <th style={{ width: "10%" }}>Job</th>
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
                  <td>{employee.job && employee.job.name}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link href={`/employees/${employee.id}`}>
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
                <td colSpan={4} className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {employees && !employees.length && (
              <tr>
                <td colSpan={4} className="text-center">
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
