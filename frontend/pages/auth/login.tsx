import { useState } from "react";

import { MainLayout } from "../../components/MainLayout";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nickname, password }),
    });
  };

  return (
    <MainLayout>
      <form className="dataForm" onSubmit={submit}>
        <h3>Log In</h3>

        <div className="form-group">
          <label>Nickname</label>
          <input
            type="nickname"
            className="form-control"
            placeholder="Enter email"
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

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </MainLayout>
  );
}
