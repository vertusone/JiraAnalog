import { MainLayout } from "../../components/MainLayout";

export default function Employee({ employee }) {
  return (
    <MainLayout>
      <div align="center">
        <h1>{employee.firstName}</h1>
        <h1>{employee.age}</h1>
      </div>
    </MainLayout>
  );
}

Employee.getInitialProps = async (ctx) => {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const responce = await fetch(
    `https://localhost:5001/api/employee/${ctx.query.id}`,
    {
      agent,
    }
  );
  const employee = await responce.json();

  return {
    employee,
  };
};
