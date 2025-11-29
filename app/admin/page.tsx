"use client";

import AddExperienceForm from "@/components/form/add-experience-form";
import AddMessageForm from "@/components/form/add-message-form";
import AddProjectForm from "@/components/form/add-project-form";
import AddTechForm from "@/components/form/add-tech-form";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
	const searchParams = useSearchParams();
	const modal = searchParams.get("modal");

	useEffect(() => {
		if (
			typeof window !== "undefined" &&
			(!localStorage.getItem("token") ||
				localStorage.getItem("token") == undefined)
		) {
			window.location.href = "/";
		}
	}, []);

	return (
		<>
			<Navbar className="w-full z-50" />
			<main className="py-4 sm:py-8 px-4 lg:px-16 xl:px-32 relative">
				<div className="flex gap-2 overflow-x-auto no-scrollbar">
					<Link
						href={"?modal=new-project"}
						className={`text-center font-semibold pb-2 sm:pb-3 border-b-2 w-full sm:w-[150px] transition-colors text-xs sm:text-base hover:border-primary hover:text-primary ${modal === "new-project" || !modal
							? "border-primary text-primary"
							: "border-gray-500 text-white"
							}`}>
						Projek
					</Link>
					<Link
						href={"?modal=new-experience"}
						className={`text-center font-semibold pb-1 sm:pb-3 border-b-2 w-full sm:w-[150px] transition-colors text-xs sm:text-base hover:border-primary hover:text-primary ${modal === "new-experience"
							? "border-primary text-primary"
							: "border-gray-500 text-white"
							}`}>
						Pengalaman
					</Link>
					<Link
						href={"?modal=new-tech"}
						className={`text-center font-semibold pb-1 sm:pb-3 border-b-2 w-full sm:w-[150px] transition-colors text-xs sm:text-base hover:border-primary hover:text-primary ${modal === "new-tech"
							? "border-primary text-primary"
							: "border-gray-500 text-white"
							}`}>
						Tech stack
					</Link>
					<Link
						href={"?modal=message"}
						className={`text-center font-semibold pb-1 sm:pb-3 border-b-2 w-full sm:w-[150px] transition-colors text-xs sm:text-base hover:border-primary hover:text-primary ${modal === "message"
							? "border-primary text-primary"
							: "border-gray-500 text-white"
							}`}>
						Pesan
					</Link>
				</div>

				{(modal === "new-project" || !modal) && <AddProjectForm />}
				{modal === "new-experience" && <AddExperienceForm />}
				{modal === "new-tech" && <AddTechForm />}
				{modal === "message" && <AddMessageForm />}
			</main>
		</>
	);
}
