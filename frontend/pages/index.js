import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <Head>
          <title>Home page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>Welcome to JiraAnalog</h1>
        <br />
        <div className="position-relative col-">
          <div>
            <button type="button" className="btn btn-success btn-lg">
              Log in
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-primary btn-lg">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
