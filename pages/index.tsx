import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

// import { BusUtil } from "@vmw/transport/util/bus.util";
import { useEffect, useRef } from "react";
import { ProxyType } from "@vmw/transport";

import Script from "next/script";

const Home: NextPage = () => {
  const busRef = useRef();
  useEffect(() => {
    const BusUtil = window.transport.TransportEventBus;
    // boot the bus
    BusUtil.boot();
    console.log(BusUtil);
    // capture instance of the bus.
    const bus = BusUtil.getInstance();
    console.log(bus);
    bus.enableMessageProxy({
      protectedChannels: ["chatty-chat"],
      proxyType: "child", // runs as child.
      parentOrigin: `http://localhost:3000/`,
      acceptedOrigins: [
        "http://localhost:3000", // local dev
      ], // production
      targetAllFrames: true,
      targetSpecificFrames: [],
    });
    bus?.listenStream("chatty-chat").handle((e) => {
      console.log(e);
    });
    busRef.current = bus;
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/rxjs@6.6.3/bundles/rxjs.umd.min.js"
        ></Script>
        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/@vmw/transport@latest/transport.umd.min.js"
        ></Script>
        <button
          onClick={() => {
            console.log(busRef.current);
            if (busRef.current) {
              // busRef.current
              //   .sendResponseMessage("chatty-chat", { hi: "123" })
              //   .handle((res) => {
              //     console.log("rs", res);
              //   });
              busRef.current.requestOnce("chatty-chat", "hello").handle((e) => {
                console.log("okaaay", e);
              });
            }
          }}
        >
          {" "}
          adfasdf
        </button>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
