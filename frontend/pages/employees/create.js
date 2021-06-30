import { MainLayout } from "../../components/MainLayout";
import { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Create({ jobs }) {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("");

    try {
      const res = await fetch("https://localhost:5001/api/employee/", {
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
      <h1>Add Employee</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="e.g. John"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <span role="alert" className="error">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="e.g. Doe"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <span role="alert" className="error">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="e.g. john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <span role="alert" className="error">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label>Age</label>
          <input
            type="number"
            min="1"
            max="100"
            {...register("age", { required: "Invalid age" })}
          />
          {errors.age && (
            <span role="alert" className="error">
              {errors.age.message}
            </span>
          )}
        </div>

        <div>
          <label>Job</label>
          <select type="text" {...register("employee.job.name")}>
            <option></option>
            {jobs.map((job) => (
              <option key={job.id}>{job.name}</option>
            ))}
          </select>
          {errors.job && (
            <span role="alert" className="error">
              {errors.job.name.message}
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

  const responce = await fetch("https://localhost:5001/api/job/", {
    agent,
  });
  const jobs = await responce.json();

  return {
    jobs,
  };
};
