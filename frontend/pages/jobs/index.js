import { useState, useEffect } from "react";

import Link from "next/link";
import { jobService } from "../../services/job.service";
import { MainLayout } from "../../components/MainLayout";

export default function Index() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    jobService.getAll().then((x) => setJobs(x));
  }, []);

  function deleteJob(id) {
    setJobs(
      jobs.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    jobService.delete(id).then(() => {
      setJobs((jobs) => jobs.filter((x) => x.id !== id));
    });
  }

  return (
    <MainLayout>
      <div>
        <h1>Jobs</h1>
        <Link href="/jobs/create">
          <a className="btn btn-sm btn-success mb-2">Add Job</a>
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Name</th>
              <th style={{ width: "40%" }}>Description</th>
              <th style={{ width: "40%" }}>Assigned to</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {jobs &&
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.name}</td>
                  <td>{job.description}</td>
                  <td>{job.employee && job.employee.firstName}</td>
                  <td></td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      <a className="btn btn-sm btn-primary">Edit</a>
                    </Link>{" "}
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="btn btn-sm btn-danger"
                      disabled={job.isDeleting}
                    >
                      {job.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!jobs && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {jobs && !jobs.length && (
              <tr>
                <td colSpan="4" className="text-center">
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
