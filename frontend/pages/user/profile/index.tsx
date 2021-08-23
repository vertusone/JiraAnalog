import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import { jobService } from "../../../services/job.service";
import { employeeService } from "../../../services/employee.service";
import { MainLayout } from "../../../components/MainLayout";
import AccessDenied from "../../../components/AccessDenied";

export default function Index() {
  const [session] = useSession();

  const _props = {
    id: 1,
    firstName: "Andrew",
    lastName: "Jii",
    email: "aaa@aa.aaa",
    age: 23,
    role: 1,
    job: {
      id: 1,
      name: "bug",
    },
  };

  const employee = _props;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    age: Yup.number().required("Age is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { ...defaultValues } = employee;
  formOptions.defaultValues = defaultValues;

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return updateEmployee(employee.id, data);
  }

  function updateEmployee(id, data) {
    return employeeService.update(id, data).then(() => {
      router.back();
    });
  }

  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    jobService.getAll().then((x) => setJobs(x));
  }, []);

  if (!session) {
    return (
      <MainLayout>
        <AccessDenied />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>My Profile</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Edit User</h3>
          <div>
            <label>First Name</label>
            <input name="firstName" type="text" {...register("firstName")} />
            {errors.firstName && (
              <span role="alert" className="error">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div>
            <label>Last Name</label>
            <input name="lastName" type="text" {...register("lastName")} />
            {errors.lastName && (
              <span role="alert" className="error">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div>
            <label>Email</label>
            <input name="email" disabled type="email" {...register("email")} />
          </div>

          <div>
            <label>Age</label>
            <input
              name="age"
              type="number"
              min="1"
              max="100"
              {...register("age")}
            />
            {errors.age && (
              <span role="alert" className="error">
                {errors.age.message}
              </span>
            )}
          </div>

          <br />

          <div className="form-group">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="btn btn-primary mr-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Save
            </button>{" "}
            <button
              onClick={() => reset(formOptions.defaultValues)}
              type="button"
              disabled={formState.isSubmitting}
              className="btn btn-danger"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <br />
      <div>
        <h3>Jobs</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "30%" }}>Status</th>
              <th style={{ width: "30%" }}>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.name}</td>
                  <td>{job.description}</td>
                  <td>{job.status}</td>
                  <td>{new Date(job.deadline).toLocaleDateString("en-EU")}</td>
                </tr>
              ))}
            {!jobs && (
              <tr>
                <td colSpan={4} className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {jobs && !jobs.length && (
              <tr>
                <td colSpan={4} className="text-center">
                  <div className="p-2">No Jobs To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
