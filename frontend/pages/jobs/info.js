import { MainLayout } from "../../components/MainLayout";
import Link from "next/link";

export default function Jobs({ jobs }) {
  return (
    <MainLayout>
      <div align="center">
        <h1>All jobs</h1>
        <br />
        <table className="table w-75 p-3">
          <thead>
            <tr className="table-active">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Assigned to</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <th>{job.id}</th>
                <td>
                  <Link
                      href={`/jobs/[id]`}
                      as={`/jobs/${job.id}`}
                  >
                    <a>{job.name}</a>
                  </Link>
                </td>
                <td>{job.description}</td>
                <td>{job.employee.firstName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

Jobs.getInitialProps = async () => {
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
