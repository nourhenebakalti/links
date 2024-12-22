import React from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/Scroll-to-top";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/globals.css";
import "../styles/index.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
  <title>Links Station | Identity & Brand Development Services</title>
  {/* Primary favicon */}
  <link rel="icon" href="/img/favicon.ico" />

  {/* Additional favicon sizes */}
  <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="18x18" href="/img/favicon-18x18.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="/img/favicon-48x48.png" />
  {/* Add more sizes as needed */}

  {/* SVG favicon */}
  <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />

  {/* Apple Touch Icon for iOS devices */}
  <link rel="apple-touch-icon" sizes="57x57" href="/img/apple-touch-icon-57x57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/img/apple-touch-icon-72x72.png" />
  {/* Add more sizes as needed */}

  {/* Safari Pinned Tab Icon */}
  <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#5bbad5" />

  {/* Open Graph image metadata */}
  <meta property="og:image" content="/img/smlogo.png" />
</Head>

      <Cursor />
      <LoadingScreen />
      <ScrollToTop />
      <Component {...pageProps} />

      <Script
        strategy="beforeInteractive"
        id="wow"
        src="/js/wow.min.js"
      >
      </Script>
      <Script
        strategy="beforeInteractive"
        id="splitting"
        src="/js/splitting.min.js"
      ></Script>
      <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        id="isotope"
        src="/js/isotope.pkgd.min.js"
      ></Script>
      <Script
        strategy="lazyOnload" 
        id="initWow" 
        src="/js/initWow.js"
      ></Script>
    </>
  );
}

export default MyApp;
