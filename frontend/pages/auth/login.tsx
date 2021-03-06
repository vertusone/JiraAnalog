import Head from "next/head";
import Link from "next/link";
import { getCsrfToken } from "next-auth/client";

import { MainLayout } from "../../components/MainLayout";

export default function Login({ csrfToken }) {
  return (
    <MainLayout>
      <Head>
        <title>Log in</title>
      </Head>

      <form
        className="dataForm"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <h3 className="text-center">Log in</h3>

        <div className="form-group">
          <label>Email</label>

          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            minLength={6}
          />
        </div>

        <br />

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
