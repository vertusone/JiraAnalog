import Link from "next/link";
import { useSession } from "next-auth/client";

export function MainLayout({ children }) {
  const [session] = useSession();

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <Link href="../">
            <a className="navbar-brand">Home</a>
          </Link>
          {session && (
            <>
              <Link href="/employees/">
                <a className="nav-link">Employees</a>
              </Link>
              <Link href="/jobs/">
                <a className="nav-link">Jobs</a>
              </Link>
              <Link href="/user/profile/">
                <a className="nav-link">Profile</a>
              </Link>
              <Link href="/user/calendar/">
                <a className="nav-link">Calendar</a>
              </Link>
            </>
          )}
        </div>
      </nav>
      <br />
      <main className="container">{children}</main>
    </>
  );
}
