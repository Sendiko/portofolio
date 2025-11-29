"use client";
import Navbar from "@/components/navbar";
import axios from "axios";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const formComplete = email && password;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_API}/v1/auth/signin`,
				{ email, password },
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			localStorage.setItem("token", response?.data?.data?.access_token);

			window.location.href = "/admin";
		} catch (err: any) {
			console.error(err);

			const message =
				err.response?.data?.message || err.response?.data?.error || "Login gagal";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="relative w-screen h-screen overflow-hidden">
			<Image
				src={"/gradient-circle.png"}
				width={555}
				height={555}
				alt="gradient circle"
				className="absolute -top-72 -right-72 z-0 w-[500px] blur-[300px]"
			/>
			<Image
				src={"/gradient-circle.png"}
				width={555}
				height={555}
				alt="gradient circle"
				className="absolute -bottom-96 -left-96 z-0 w-[1000px] blur-[300px]"
			/>
			<Navbar className="fixed w-full z-50" />
			<div className="z-10 h-full grid grid-cols-12 items-center px-5">
				<form
					onSubmit={handleSubmit}
					className="col-start-1 md:col-start-4 xl:col-start-5 col-end-13 md:col-end-10 xl:col-end-9 bg-zinc-800 rounded-lg p-5">
					<h1 className="mt-4 text-lg sm:text-3xl font-extrabold text-center">
						Login
					</h1>
					{!formComplete && (
						<div className="my-8 flex justify-center items-center border border-red-400 text-red-400 text-xs sm:text-base gap-2 rounded-md p-3">
							<CircleAlert />
							Semua input harus terisi
						</div>
					)}
					{error && (
						<div className="my-8 flex justify-center items-center border border-red-400 text-red-400 text-xs sm:text-base gap-2 rounded-md p-3">
							<CircleAlert />
							{error}
						</div>
					)}
					<ul className={`${formComplete && "mt-8"} space-y-3 text-xs sm:text-base`}>
						<li className="flex flex-col gap-2">
							<label htmlFor="">Email</label>
							<input
								onChange={(e) => setEmail(e.target.value)}
								className="outline-none bg-zinc-900 p-3 rounded-md"
								type="text"
								placeholder="Masukkan email kamu"
							/>
						</li>
						<li className="flex flex-col gap-2">
							<label htmlFor="">Password</label>
							<div className="relative">
								<input
									onChange={(e) => setPassword(e.target.value)}
									className="outline-none bg-zinc-900 p-3 rounded-md w-full"
									type={showPassword ? "text" : "password"}
									placeholder="Masukkan password kamu"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</li>
						<li>
							<button
								type={`${formComplete ? "submit" : "button"}`}
								className={`${formComplete
									? "cursor-pointer bg-primary hover:bg-violet-700"
									: "cursor-not-allowed bg-gray-500"
									} w-full text-white font-semibold p-3 rounded-md`}>
								{loading ? "Logging in..." : "Login"}
							</button>
						</li>
					</ul>
				</form>
			</div>
		</section>
	);
}
