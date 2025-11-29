"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
	id: string;
	title: string;
	description: string;
	imagePreview: string;
	projectTechstack: {
		id: string;
		name: string;
	}[];
}

export default function ProjectsSection() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	const fetchProjects = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_API}/v1/project`
			);
			setProjects(response.data.data);
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<section
			id="recent-work"
			className="relative min-h-screen flex flex-col justify-center py-32 px-4 lg:px-16 xl:px-64">
			<Image
				src={"/gradient-circle.png"}
				width={555}
				height={555}
				alt="gradient circle"
				className="absolute -bottom-96 -left-96 z-0 w-[1000px] blur-[300px]"
			/>
			<h2 className="text-xl sm:text-4xl mb-12 font-semibold">📲 Apps by Me</h2>
			<div className="z-10 grid grid-cols-12 gap-5">
				{Array.isArray(projects) &&
					projects.map((project, index) => (
						<div
							key={index}
							onClick={() => setSelectedProject(project)}
							className="group col-span-12 md:col-span-6 lg:col-span-4 bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 backdrop-blur-sm cursor-pointer">
							<div className="overflow-hidden h-[200px]">
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_API}/${project.imagePreview}`}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									alt={project.title}
								/>
							</div>
							<div className="p-6 flex flex-col gap-4">
								<div>
									<h3 className="font-bold text-lg sm:text-xl mb-2 text-white group-hover:text-primary transition-colors">
										{project.title}
									</h3>
								</div>
								<div className="flex flex-wrap gap-2 mt-auto">
									{Array.isArray(project.projectTechstack) &&
										project.projectTechstack.map((tech, i) => (
											<span
												key={i}
												className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium">
												{tech.name}
											</span>
										))}
								</div>
							</div>
						</div>
					))}
			</div>

			{/* Project Details Modal */}
			{selectedProject && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
					onClick={() => setSelectedProject(null)}>
					<div
						className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
						onClick={(e) => e.stopPropagation()}>
						<div className="relative h-[300px] sm:h-[400px] w-full">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_API}/${selectedProject.imagePreview}`}
								className="w-full h-full object-cover"
								alt={selectedProject.title}
							/>
							<button
								onClick={() => setSelectedProject(null)}
								className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						</div>
						<div className="p-6 sm:p-10">
							<h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
								{selectedProject.title}
							</h2>
							<div className="flex flex-wrap gap-2 mb-6">
								{Array.isArray(selectedProject.projectTechstack) &&
									selectedProject.projectTechstack.map((tech, i) => (
										<span
											key={i}
											className="inline-block bg-primary/20 text-primary-300 border border-primary/30 px-3 py-1 rounded-full text-sm font-medium">
											{tech.name}
										</span>
									))}
							</div>
							<div className="prose prose-invert max-w-none">
								<p className="text-neutral-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
									{selectedProject.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
