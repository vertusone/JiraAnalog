import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { MainLayout } from "../../components/MainLayout";

export default function Signup() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, password }),
    });
  };

  return (
    <MainLayout>
      <Head>
        <title>Sign up</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className="dataForm" onSubmit={submit}>
        <h3 className="text-center">Sign up</h3>

        <div className="form-group">
          <label>Nickname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter nickname"
            required
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Already registered{" "}
          <Link href="/auth/login">
            <a>log in?</a>
          </Link>
        </p>
      </form>
    </MainLayout>
  );
}
