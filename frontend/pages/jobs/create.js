import { MainLayout } from "../../components/MainLayout";
import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Create({ employees }) {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch("https://localhost:5001/api/job/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.back();
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <MainLayout>
      <h1>Add Job</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.firstName && (
            <span role="alert" className="error">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label>Description</label>
          <input type="text" {...register("description")} />
          {errors.description && (
            <span role="alert" className="error">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label>Employee</label>
          <select type="text" {...register("job.employee.firstName")}>
            <option></option>
            {employees.map((employee) => (
              <option key={employee.id}>{employee.firstName}</option>
            ))}
          </select>
          {errors.employee && (
            <span role="alert" className="error">
              {errors.employee.name.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Create
          </button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}
    </MainLayout>
  );
}

Create.getInitialProps = async () => {
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
