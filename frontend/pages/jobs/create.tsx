import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSession } from "next-auth/client";
import Select from "react-select";
import { useState } from "react";

import { MainLayout } from "../../components/MainLayout";
import { jobService } from "../../services/job.service";
import AccessDenied from "../../components/AccessDenied";

export default function Create({ employees }) {
  const [session] = useSession();

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, register, formState } = useForm(formOptions);

  const { errors } = formState;

  function onSubmit(data) {
    data = {
      ...data,
      employeeId: selectedOption && selectedOption.value,
    };
    return createJob(data);
  }

  function createJob(data) {
    return jobService.create(data).then(() => {
      router.back();
    });
  }

  const options = employees.map(function (employee) {
    return { value: employee.id, label: employee.firstName };
  });

  const [selectedOption, setSelectedOption] = useState(null);

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
        <title>Job Create</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Add Job</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Bug" {...register("name")} />
          {errors.firstName && (
            <span role="alert" className="error">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label>Description</label>
          <input type="text" placeholder="Hard" {...register("description")} />
          {errors.description && (
            <span role="alert" className="error">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label>Employee</label>
          <Select
            name="form-field-name"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
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
  const responce = await fetch("http://localhost:5000/api/employee/");
  const employees = await responce.json();

  return {
    employees,
  };
};
