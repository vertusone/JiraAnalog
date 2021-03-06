import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";

import { MainLayout } from "../components/MainLayout";

export default function Index() {
  const [session] = useSession();

  return (
    <MainLayout>
      <Head>
        <title>Home page</title>
      </Head>

      <div className="jumbotron text-center">
        <div className="container">
          {!session && (
            <>
              <h1 className="jumbotron">JiraAnalog</h1>
              <p className="lead text-muted">
                The best software teams ship early and often. JiraAnalog is
                built for every member of your software team to plan, track, and
                release great software.
              </p>

              <p>
                <Link href="/auth/login">
                  <a className="btn btn-lg btn-success">Log in</a>
                </Link>{" "}
                <Link href="/auth/signup">
                  <a className="btn btn-lg btn-primary">Sign up</a>
                </Link>
              </p>
            </>
          )}
          {session && (
            <>
              <h1 className="jumbotron">Welcome to JiraAnalog</h1>
              <button
                className="btn btn-lg btn-danger"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
