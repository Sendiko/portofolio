"use client";
import { PencilIcon, TrashIcon, CircleAlert } from "lucide-react";
import TextInput from "../text-input";
import axios from "axios";
import { FormEvent, useState, useEffect } from "react";

interface Project {
	id: string;
	title: string;
	description: string;
	imagePreview: string;
	techStacks: string[];
}

export default function AddProjectForm() {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [imagePreview, setImagePreview] = useState<File | null>(null);
	const [techStacks, setTechStacks] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [projects, setProjects] = useState<Project[]>([]);
	const [editingProject, setEditingProject] = useState<Project | null>(null);

	const formComplete = title && description && techStacks && imagePreview;

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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const formData = new FormData();

			let techStacksArray: string[] = [];
			try {
				// Try parsing as JSON first (e.g. ["Kotlin", "Java"])
				const parsed = JSON.parse(techStacks);
				if (Array.isArray(parsed)) {
					techStacksArray = parsed;
				} else {
					// If valid JSON but not an array, treat as single string or split
					techStacksArray = [String(parsed)];
				}
			} catch (e) {
				// Fallback to comma separation if not valid JSON
				techStacksArray = techStacks.split(",").map((tech) => tech.trim());
			}

			formData.append("title", title);
			formData.append("description", description);

			// Send as a single JSON string
			formData.append("techStacks", JSON.stringify(techStacksArray.filter(Boolean)));

			if (imagePreview) {
				formData.append("imagePreview", imagePreview);
			}

			if (editingProject) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_BASE_API}/v1/project/${editingProject.id}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				location.reload();
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_API}/v1/project`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				location.reload();
			}

			setTitle("");
			setDescription("");
			setImagePreview(null);
			setTechStacks("");
			setEditingProject(null);
			fetchProjects();
		} catch (err: any) {
			console.error(err);
			const message =
				err.response?.data?.message || err.response?.data?.error || "Operasi gagal";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (project: Project) => {
		setTitle(project.title);
		setDescription(project.description);
		setTechStacks(JSON.stringify(project.techStacks));
		setEditingProject(project);
	};

	const handleDelete = async (id: string) => {
		try {
			await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API}/v1/project/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			fetchProjects();
		} catch (err: any) {
			console.error(err);
			setError("Gagal menghapus project");
		}
	};

	const handleCancel = () => {
		setTitle("");
		setDescription("");
		setImagePreview(null);
		setTechStacks("");
		setEditingProject(null);
		setError("");
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="mt-8 p-5 sm:p-10 bg-neutral-800 rounded-lg"
				encType="multipart/form-data">
				<h2 className="text-sm sm:text-xl font-bold mb-8">
					{editingProject ? "Edit Project" : "Tambah Project Baru"}
				</h2>

				{error && (
					<div className="mb-4 flex justify-center items-center border border-red-400 text-red-400 text-xs sm:text-base gap-2 rounded-md p-3">
						<CircleAlert />
						{error}
					</div>
				)}

				<TextInput
					id="judul"
					label="Judul"
					required
					className="mb-2"
					placeholder="Project terbaru saya"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextInput
					id="deskripsi"
					label="Deskripsi"
					required
					className="mb-2"
					placeholder="Lorem ipsum dolor sit amet."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<TextInput
					id="tech"
					label="Tech Stack"
					required
					className="mb-2"
					placeholder='["Java", "Kotlin", "Android"]'
					value={techStacks}
					onChange={(e) => setTechStacks(e.target.value)}
				/>

				<fieldset className="inline-flex flex-col gap-2 w-full mb-4">
					<label
						htmlFor="image-preview"
						className="font-medium text-xs sm:text-base">
						Image Preview
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImagePreview(e.target.files?.[0] || null)}
						className="w-full border-2 border-neutral-700 rounded-lg p-3 text-xs sm:text-base"
					/>
				</fieldset>

				<div className="flex gap-4">
					<button
						type="submit"
						disabled={!formComplete || loading}
						className={`${formComplete && !loading
							? "cursor-pointer bg-primary hover:bg-violet-700"
							: "cursor-not-allowed bg-gray-500"
							} flex-1 text-white text-xs sm:text-base font-semibold p-3 rounded-md`}>
						{loading ? "Processing..." : editingProject ? "Update" : "Tambah"}
					</button>

					{editingProject && (
						<button
							type="button"
							onClick={handleCancel}
							className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-semibold p-3 rounded-md px-8">
							Batal
						</button>
					)}
				</div>
			</form>

			<div className="mt-8 p-5 sm:p-10 bg-neutral-800 rounded-lg">
				<h2 className="text-sm sm:text-xl font-bold mb-8">Project</h2>

				<div className="overflow-x-auto">
					<table className="table-auto w-[1000px] xl:w-full text-white">
						<thead>
							<tr className="border-b border-[#D4D4D4] text-left">
								<th className="text-xs lg:text-lg font-bold py-3 px-4">No</th>
								<th className="text-xs lg:text-lg font-bold py-3">Image Preview</th>
								<th className="text-xs lg:text-lg font-bold py-3 px-4">Judul</th>
								<th className="text-xs lg:text-lg font-bold py-3 px-4 w-[300px]">
									Deskripsi
								</th>
								<th className="text-xs lg:text-lg font-bold py-3 px-4">Tech Stack</th>
								<th className="text-xs lg:text-lg font-bold py-3">Actions</th>
							</tr>
						</thead>
						<tbody className="relative">
							{Array.isArray(projects) && projects.length === 0 ? (
								<tr>
									<td colSpan={6} className="py-8 text-center text-gray-400">
										Belum ada project
									</td>
								</tr>
							) : (
								Array.isArray(projects) &&
								projects.map((project, index) => (
									<tr key={project.id} className="border-b border-[#D4D4D4]">
										<td className="py-4 px-4 align-top text-xs sm:text-base font-medium">
											{index + 1}
										</td>
										<td className="py-4 align-top">
											<img
												className="w-[200px] sm:w-[300px] h-[100px] sm:h-[200px] object-cover"
												src={
													`${process.env.NEXT_PUBLIC_BASE_API}/${project.imagePreview}` ||
													"/default-project.png"
												}
												alt={project.title}
											/>
										</td>
										<td className="py-4 px-4 align-top">
											<p className="text-xs sm:text-base font-semibold leading-tight">
												{project.title}
											</p>
										</td>
										<td className="py-4 px-4 w-[300px] align-top text-xs sm:text-base font-semibold">
											{project.description}
										</td>
										<td className="py-4 px-4 align-top text-xs sm:text-base font-semibold whitespace-nowrap">
											{Array.isArray(project.techStacks)
												? project.techStacks.map((tech, i) => (
													<span
														key={i}
														className="inline-block bg-primary text-white px-2 py-1 rounded-md text-xs mr-1 mb-1">
														{tech}
													</span>
												))
												: project.techStacks}
										</td>
										<td className="py-4 align-top">
											<div className="flex items-center gap-x-[16px]">
												<div
													onClick={() => handleEdit(project)}
													className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-amber-500 text-amber-500 hover:text-amber-800 p-[8px] rounded-[8px] hover:bg-amber-600 hover:bg-opacity-10">
													<PencilIcon width={18} height={18} />
												</div>
												<div
													onClick={() => handleDelete(project.id)}
													className="cursor-pointer w-[34px] h-[34px] flex justify-center items-center border border-red-500 text-red-500 hover:text-red-800 p-[8px] rounded-[8px] hover:bg-red-600 hover:bg-opacity-10">
													<TrashIcon width={14} height={18} />
												</div>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
