"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
	const handleClick = () => {
		const email = "rizkysendiko7@gmail.com";
		const subject = "Saya tertarik dengan company Anda";
		const body =
			"Halo Sendiko, saya melihat portofolio Anda dan ingin berdiskusi lebih lanjut.";

		const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
			email
		)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		window.open(gmailURL, "_blank");
	};

	return (
		<section className="relative w-screen h-screen flex items-center px-4 lg:px-16 xl:px-52 2xl:px-64">
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
			<div className="z-10 mt-44 lg:mt-0 w-full flex flex-col lg:grid grid-cols-12 items-start lg:items-center gap-10 lg:gap-0">
				<div className="w-full sm:w-[600px] lg:col-start-1 lg:col-end-8 xl:col-end-9 2xl:col-end-6 flex flex-col gap-3 sm:gap-5">
					<p className="text-sm sm:text-xl">
						👋 Hi, i'm <span className="font-semibold">Muhammad Rizky Sendiko</span>
					</p>
					<h1 className="font-extrabold sm:font-semibold text-2xl sm:text-5xl flex flex-col gap-2.5">
						<span>
							FULLSTACK <span className="text-primary">KOTLIN</span>
						</span>
						<span>DEVELOPER</span>
					</h1>
					<div className="space-y-2">
						<p className="text-xs sm:text-base sm:leading-[24px]">
							A passionate software developer specializing in Kotlin Multiplatform
							development. I build seamless, modern user experiences using Jetpack
							Compose and follow clean, scalable architectures like MVI and Clean
							Architecture.
						</p>
					</div>
					<div className="flex gap-5">
						<Link target="_blank" href={"https://github.com/Sendiko"}>
							<Image src={"/github.png"} width={32} height={32} alt="github" />
						</Link>
						<Link target="_blank" href={"https://www.linkedin.com/in/rizky-sendiko/"}>
							<Image src={"/linkedin.png"} width={32} height={32} alt="linkedin" />
						</Link>
						<Image
							className="cursor-pointer"
							onClick={handleClick}
							src={"/gmail.png"}
							width={32}
							height={32}
							alt="gmail"
						/>
					</div>
				</div>
				<div className="col-end-13 col-start-10 2xl:col-end-13">
					<Image
						src={"/sendiko_new.png"}
						className="w-full"
						width={247}
						height={389}
						alt="Foto Sendiko"
					/>
				</div>
			</div>
		</section>
	);
}
