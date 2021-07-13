import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

import { employeeService } from "../../services/employee.service";
import { MainLayout } from "../MainLayout";

export function EmployeeEdit(props) {
  const employee = props?.employee;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
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

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit User</h1>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
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
          <input name="email" type="email" {...register("email")} />
          {errors.email && (
            <span role="alert" className="error">
              {errors.email.message}
            </span>
          )}
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
          </button>{" "}
          <Link href="/employees/">
            <a className="btn btn-secondary">Cancel</a>
          </Link>
        </div>
      </form>
    </MainLayout>
  );
}

EmployeeEdit.getInitialProps = async (ctx) => {
  const responce = await fetch(
    `http://localhost:5000/api/employee/${ctx.query.id}`
  );
  const employee = await responce.json();

  return {
    employee,
  };
};
