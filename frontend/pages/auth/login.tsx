import Link from "next/link";
import { getCsrfToken } from "next-auth/client";

import { MainLayout } from "../../components/MainLayout";

export default function Login({ csrfToken }) {
  return (
    <MainLayout>
      <form
        className="dataForm"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label>
            Username
            <input
              name="nickname"
              type="text"
              className="form-control"
              placeholder="Enter nickname"
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Not registered yet{" "}
          <Link href="/auth/signup">
            <a>sign up?</a>
          </Link>
        </p>
      </form>
    </MainLayout>
  );
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};
