import { JobEdit } from "../../components/jobs/JobEdit";
import { jobService } from "../../services/job.service";

export default JobEdit;

export async function getInitialProps({ params }) {
  const job = await jobService.getById(params.id);

  return {
    props: { job },
  };
}
