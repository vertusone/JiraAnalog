import { MainLayout } from "../../components/MainLayout";

export default function Job({ job }) {
  return (
    <MainLayout>
      <div align="center">
        <h1>{job.name}</h1>
        <h1>{job.description}</h1>
      </div>
    </MainLayout>
  );
}

Job.getInitialProps = async (ctx) => {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const responce = await fetch(
    `https://localhost:5001/api/job/${ctx.query.id}`,
    {
      agent,
    }
  );
  const job = await responce.json();

  return {
    job,
  };
};
