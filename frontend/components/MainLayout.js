import Head from "next/head";
import Link from "next/dist/client/link";

export function MainLayout({ children }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link href="../">
          <a className="navbar-brand">
            Home
          </a>
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/employees/info">
              <a className="nav-link">Employees</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/jobs/info">
              <a className="nav-link">Jobs</a>
            </Link>
          </li>
        </ul>
      </nav>
      <br />
      <main>{children}</main>
    </>
  );
}
