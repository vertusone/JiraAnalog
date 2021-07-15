import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "next-auth/client";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
