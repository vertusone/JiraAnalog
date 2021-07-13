import Link from "next/link";

export function MainLayout({ children }) {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <Link href="../">
            <a className="navbar-brand">Home</a>
          </Link>
          <Link href="/employees/">
            <a className="nav-link">Employees</a>
          </Link>
          <Link href="/jobs/">
            <a className="nav-link">Jobs</a>
          </Link>
        </div>
      </nav>
      <br />
      <main className="container">{children}</main>
    </>
  );
}
