import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import EssayContainer from "../components/EssayContainer";

const Home = () => {
    return (
        <div>
            <Head>
                <title>Essay Grader</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <section className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-48 mb-48">
                <Hero />
            </section>

            <section className="bg-gray-800 h-screen flex">
                <EssayContainer />
            </section>
        </div>
    );
};

export default Home;
