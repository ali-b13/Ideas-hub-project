import React, { ReactNode } from "react";
import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Footer from "@components/Footer";
interface props {
	children: ReactNode;
}
export const metadata = {
	title: "My App",
	description: "this app is created by Ali",
};
const RootLayout: React.FC<props> = ({ children }) => {
	return (
		<html lang="en">
			<body className="h-min-[99vh]">
				<Provider >
					<div className="main mb-2">
						<Nav />
						<div className="gradient" />
					</div>
					<main className="flex justify-center min-h-[81vh]">{children}</main>
				</Provider>
				<Footer/>
			</body>
		</html>
	);
};

export default RootLayout;
