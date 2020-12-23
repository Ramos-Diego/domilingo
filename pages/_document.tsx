import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
