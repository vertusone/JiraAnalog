import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "next-auth/client";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
