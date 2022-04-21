import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    //whenever we have some style or setting that should we applied on every page than create a wrapper component with those styles and wrap it around <Component/>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
