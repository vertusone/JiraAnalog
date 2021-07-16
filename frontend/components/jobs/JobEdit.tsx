import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { useSession } from "next-auth/client";

import { MainLayout } from "../MainLayout";
import { jobService } from "../../services/job.service";
import AccessDenied from "../../components/AccessDenied";

export function JobEdit(props) {
  const [session] = useSession();

  const job = props?.job;
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { ...defaultValues } = job;
  formOptions.defaultValues = defaultValues;

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return updateJob(job.id, data);
  }

  function updateJob(id, data) {
    return jobService.update(id, data).then(() => {
      router.back();
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
        <title>Job Edit</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Job</h1>
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
        </div>

        <div>
          <label>Description</label>
          <input name="description" type="text" {...register("description")} />
          {errors.description && (
            <span role="alert" className="error">
              {errors.description.message}
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
          <Link href="/jobs/">
            <a className="btn btn-secondary">Cancel</a>
          </Link>
        </div>
      </form>
    </MainLayout>
  );
}

JobEdit.getInitialProps = async (ctx) => {
  const responce = await fetch(`http://localhost:5000/api/job/${ctx.query.id}`);
  const job = await responce.json();

  return {
    job,
  };
};
