import Feed from "@components/Feed";
import Footer from "@components/Footer";

import React from "react";

const Home = () => {
	return (
		<section className="w-ful flex flex-col gap-4 mt-4 items-center h-[99vh]  ">
			<h1 className="md:text-5xl text-4xl font-extrabold ">Discover & Share</h1>
			<span className="md:text-4xl text-3xl font-extrabold orangeColor   ">
				Ideas Hub platform
			</span>
			<p className="text-center w-[80%] md:text-sm text-xs text-gray-400 font-semibold">
				{" "}
				Ideas Hub is a platform where you can discover the ideas of different people on different stuff on the platform {" "}
			</p>
			<Feed />
			<Footer/>
		</section>
	);
};

export default Home;
