import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { employeeService } from "../../services/employee.service";

export default function Create({ jobs }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    age: Yup.number().required("Age is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, register, formState } = useForm(formOptions);

  const { errors } = formState;

  function onSubmit(data) {
    return createEmployee(data);
  }

  function createEmployee(data) {
    return employeeService.create(data).then(() => {
      router.back();
    });
  }

  return (
    <MainLayout>
      <h1>Add Employee</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="John" {...register("firstName")} />
          {errors.firstName && (
            <span role="alert" className="error">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Doe" {...register("lastName")} />
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
            placeholder="example@example.com"
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
          <input type="number" min="1" max="100" {...register("age")} />
          {errors.age && (
            <span role="alert" className="error">
              {errors.age.message}
            </span>
          )}
        </div>

        <div>
          <label>Job</label>
          <select {...register("job.id")}>
            <option></option>
            {jobs.map((job) => (
              <option key={job.id}>{job.id}</option>
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
    </MainLayout>
  );
}

Create.getInitialProps = async () => {
  const responce = await fetch("http://localhost:5000/api/job/");
  const jobs = await responce.json();

  return {
    jobs,
  };
};
