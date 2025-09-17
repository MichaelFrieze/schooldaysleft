import { Button } from "@/components/ui/button";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { Suspense, useState } from "react";

type SeedResponse = {
	message: string;
	bookIds?: Id<"books">[];
};

export const Route = createFileRoute("/_authed/convex-route")({
	loader: (opts) => {
		console.log("loader from convex-route");
		opts.context.queryClient.prefetchQuery(convexQuery(api.books.getBooks, {}));
	},
	// loader: async (opts) => {
	// 	console.log("loader from convex-route");
	// 	await new Promise((resolve) => setTimeout(resolve, 3000));
	// 	await opts.context.queryClient.ensureQueryData(
	// 		convexQuery(api.books.getBooks, {}),
	// 	);
	// },
	// pendingMs: 0,
	// pendingMinMs: 5000,
	// pendingComponent: () => <div>Route Loader Loading...</div>,
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Suspense fallback={<div>Loading Suspense Component...</div>}>
				<SuspenseComponent />
			</Suspense>
		</div>
	);
}

function SuspenseComponent() {
	const { data } = useSuspenseQuery(convexQuery(api.books.getBooks, {}));
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [isbn, setIsbn] = useState("");
	const [editingId, setEditingId] = useState<Id<"books"> | null>(null);
	const [editName, setEditName] = useState("");
	const [editAuthor, setEditAuthor] = useState("");
	const [editIsbn, setEditIsbn] = useState("");

	const { mutate: addBook, isPending: isAddingBook } = useMutation({
		mutationFn: useConvexMutation(api.books.addBook),
		onSuccess: () => {
			// Clear form after successful submission
			setName("");
			setAuthor("");
			setIsbn("");
		},
	});

	const { mutate: updateBook, isPending: isUpdatingBook } = useMutation({
		mutationFn: useConvexMutation(api.books.updateBook),
		onSuccess: () => {
			// Clear edit state after successful update
			setEditingId(null);
			setEditName("");
			setEditAuthor("");
			setEditIsbn("");
		},
	});

	const { mutate: deleteBook, isPending: isDeletingBook } = useMutation({
		mutationFn: useConvexMutation(api.books.deleteBook),
	});

	const { mutate: seedBooks, isPending: isSeedingBooks } = useMutation({
		mutationFn: useConvexMutation(api.seed.seedBooks),
		onSuccess: (data: SeedResponse) => {
			alert(data.message);
		},
		onError: (error: Error) => {
			alert(`Error seeding books: ${error.message}`);
		},
	});

	const { mutate: clearBooks, isPending: isClearingBooks } = useMutation({
		mutationFn: useConvexMutation(api.seed.clearBooks),
		onSuccess: (data: SeedResponse) => {
			alert(data.message);
		},
		onError: (error: Error) => {
			alert(`Error clearing books: ${error.message}`);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim() && author.trim() && isbn.trim()) {
			addBook({
				name: name.trim(),
				author: author.trim(),
				isbn: isbn.trim(),
			});
		}
	};

	const handleEdit = (book: {
		_id: Id<"books">;
		name: string;
		author: string;
		isbn: string;
	}) => {
		setEditingId(book._id);
		setEditName(book.name);
		setEditAuthor(book.author);
		setEditIsbn(book.isbn);
	};

	const handleUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		if (editingId && editName.trim() && editAuthor.trim() && editIsbn.trim()) {
			updateBook({
				id: editingId,
				name: editName.trim(),
				author: editAuthor.trim(),
				isbn: editIsbn.trim(),
			});
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditName("");
		setEditAuthor("");
		setEditIsbn("");
	};

	const handleDelete = (id: Id<"books">) => {
		if (confirm("Are you sure you want to delete this book?")) {
			deleteBook({ id });
		}
	};

	const handleSeedBooks = () => {
		if (confirm("This will add sample books to the database. Continue?")) {
			seedBooks({});
		}
	};

	const handleClearBooks = () => {
		if (
			confirm("This will delete ALL books from the database. Are you sure?")
		) {
			clearBooks({});
		}
	};

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-6">
			<h1 className="text-4xl">Convex Route</h1>
			{/* Database Management */}
			<div className="flex flex-col gap-4">
				<h2 className="text-center text-xl">Database Management</h2>
				<div className="flex gap-4">
					<Button
						onClick={handleSeedBooks}
						disabled={isSeedingBooks}
						variant="outline"
						className="h-auto px-4 py-2"
					>
						{isSeedingBooks ? "Seeding..." : "Seed Sample Books"}
					</Button>
					<Button
						onClick={handleClearBooks}
						disabled={isClearingBooks}
						variant="destructive"
						className="h-auto px-4 py-2"
					>
						{isClearingBooks ? "Clearing..." : "Clear All Books"}
					</Button>
				</div>
			</div>
			{/* Add Book Form */}
			<form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
				<h2 className="text-2xl">Add a Book</h2>
				<input
					type="text"
					placeholder="Book Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="text"
					placeholder="Author"
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<input
					type="text"
					placeholder="ISBN"
					value={isbn}
					onChange={(e) => setIsbn(e.target.value)}
					className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				<Button type="submit" disabled={isAddingBook}>
					{isAddingBook ? "Adding..." : "Add Book"}
				</Button>
			</form>
			{/* Books List */}
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl">Books</h2>
				{data.map((book) => (
					<div key={book._id} className="rounded-md border border-gray-200 p-3">
						{editingId === book._id ? (
							// Edit mode
							<form onSubmit={handleUpdate} className="flex flex-col gap-3">
								<input
									type="text"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								<input
									type="text"
									value={editAuthor}
									onChange={(e) => setEditAuthor(e.target.value)}
									className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								<input
									type="text"
									value={editIsbn}
									onChange={(e) => setEditIsbn(e.target.value)}
									className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								<div className="flex gap-2">
									<Button
										type="submit"
										disabled={isUpdatingBook}
										className="h-auto px-3 py-1 text-xs"
									>
										{isUpdatingBook ? "Saving..." : "Save"}
									</Button>
									<Button
										type="button"
										onClick={handleCancelEdit}
										variant="outline"
										className="h-auto px-3 py-1 text-xs"
									>
										Cancel
									</Button>
								</div>
							</form>
						) : (
							// View mode
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="font-semibold">{book.name}</div>
									<div className="text-gray-600">by {book.author}</div>
									<div className="text-gray-500 text-sm">ISBN: {book.isbn}</div>
								</div>
								<div className="ml-4 flex gap-2">
									<Button
										onClick={() => handleEdit(book)}
										variant="outline"
										className="h-auto px-3 py-1 text-xs"
									>
										Edit
									</Button>
									<Button
										onClick={() => handleDelete(book._id)}
										variant="destructive"
										disabled={isDeletingBook}
										className="h-auto px-3 py-1 text-xs"
									>
										{isDeletingBook ? "..." : "Delete"}
									</Button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
			<Button asChild>
				<Link to="/">Home</Link>
			</Button>
		</div>
	);
}
