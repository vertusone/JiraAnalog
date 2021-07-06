import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

import { jobService } from "../../services/job.service";

export default function Create({ employees }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, register, formState } = useForm(formOptions);

  const { errors } = formState;

  function onSubmit(data) {
    return createJob(data);
  }

  function createJob(data) {
    return jobService.create(data).then(() => {
      router.back();
    });
  }

  return (
    <MainLayout>
      <h1>Add Job</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          <select type="text" {...register("job.employees.firstName")}>
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
