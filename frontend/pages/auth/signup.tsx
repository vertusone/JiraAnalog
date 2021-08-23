import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { DefaultValues } from "react-hook-form";
import Select from "react-select";

import { MainLayout } from "../../components/MainLayout";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const submit = async (e) => {
    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName,
        password,
        role: selectedOption.value,
      }),
    });
  };

  return (
    <MainLayout>
      <Head>
        <title>Sign up</title>
      </Head>

      <form className="dataForm" onSubmit={submit}>
        <h3 className="text-center">Sign up</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            required
            onChange={(e) => setFirstName(e.target.value)}
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

        <div>
          <label>Role</label>
          <Select
            name="form-field-name"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
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
