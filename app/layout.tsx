import React, { ReactNode } from "react";
import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
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
			<body>
				<Provider >
					<div className="main mb-2">
						<Nav />
						<div className="gradient" />
					</div>
					<main className="flex justify-center">{children}</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
