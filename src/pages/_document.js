import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="keywords" content="brand development, identity design, branding services, logo design, brand strategy, graphic design, marketing collateral, visual identity, brand guidelines, corporate branding, audio visual services, innovation solutions, creative design, digital branding, brand storytelling, web design, user experience (UX) design, product innovation, technology solutions, creative consulting"/>
          <meta
            name="description"
            content="LINKS STATION is an innovative creative studio dedicated to crafting extraordinary digital products, building memorable brands, and delivering captivating experiences."
          />
          <meta name="author" content="" />
        </Head>

        <body>
          <Main />
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
