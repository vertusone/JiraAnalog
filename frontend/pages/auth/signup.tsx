import Link from "next/link";
import { useState } from "react";

import { MainLayout } from "../../components/MainLayout";

export default function SignUp() {
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
      <form className="dataForm" onSubmit={submit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>Nickname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
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
