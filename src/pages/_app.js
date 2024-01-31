import "@/styles/globals.css";
import Layout from "@/components/ui/Layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
