"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LiteralUnion } from "type-fest";
import Loader from "./Loader";

type BuiltInProviderType = "facebook" | "google" | "github";

type ClientSafeProvider = {
	id: string;
	name: string;
	type: LiteralUnion<BuiltInProviderType, string>;
};

type ProviderMap = Record<
	LiteralUnion<BuiltInProviderType, string>,
	ClientSafeProvider
> | null;
const Nav = () => {
	const { data: session } = useSession();
	const [toggleDropDown, setToggleDropDown] = useState<Boolean>(false);
	const [providers, setProviders] = useState<any>(null);
	useEffect(() => {
		const ProvidersCall = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		ProvidersCall();
	}, []);
	console.log(session, "session");

	console.log(providers, "providers");
	return (
		<nav className="flex justify-between  w-full ">
			<Link href={"/"} className="flex gap-2 flex-center align-middle m-2">
				<Image
					className="object-contain"
					width={"30"}
					height={"30"}
					alt="logo"
					src={"/assets/images/logo1.svg"}
				/>

				<p className="text-gray-600 md:block hidden text-2xl font-extrabold">
					Ideas Hub
				</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="sm:flex hidden flex-center align-middle m-2">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5 items-center">
						<Link href={"/create-post"} className="black_btn ">
							{" "}
							Create Idea
						</Link>
						<button className="outlined_btn " onClick={() => signOut()}>
							{" "}
							Sign Out
						</button>
						<Link href={"/profile"}>
							<Image
								className="rounded-full"
								src={session?.user?.image || "/assets/images/logo.svg"}
								alt="profile"
								width={37}
								height={37}
							/>{" "}
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => {
								return (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="black_btn"
									>
										Sign in
									</button>
								);
							})}
					</>
				)}
			</div>
			{/* Mobile navigation */}
			<div className="sm:hidden flex relative ">
				{session?.user ? (
					<div className="flex ">
						{toggleDropDown ? (
							<Image
								className="object-contain"
								width={"30"}
								height={"30"}
								alt="logo"
								src={"/assets/icons/close.svg"}
								onClick={() => setToggleDropDown((prev) => !prev)}
							/>
						) : (
							<Image
								className="object-contain"
								width={"30"}
								height={"30"}
								alt="logo"
								src={"/assets/icons/menu.svg"}
								onClick={() => setToggleDropDown((prev) => !prev)}
							/>
						)}
						{toggleDropDown && (
							<div className={`  dropdown ${toggleDropDown ? "active" : ""} `}>
								<Link
									href={"/profile"}
									className="dropdown_link flex justify-center align-middle gap-1"
									onClick={() => setToggleDropDown(false)}
								>
									{" "}
									<span>{session?.user?.name}</span>
									<Image
										className="rounded-full"
										src={session?.user?.image || "/assets/images/logo.svg"}
										alt="profile"
										width={25}
										height={25}
									/>
								</Link>
								<Link
									href={"/create-post"}
									className="dropdown_link"
									onClick={() => setToggleDropDown(false)}
								>
									Create Post
								</Link>
								<button
									className="black_btn w-[80%] text-sm"
									onClick={() => signOut()}
								>
									{" "}
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider: any) => {
								return (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="black_btn self-center text-xs"
									>
										Sign in
									</button>
								);
							})}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
