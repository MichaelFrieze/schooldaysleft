import { mutation } from "./_generated/server";

// Sample data for testing
const sampleBooks = [
	{
		name: "The Great Gatsby",
		author: "F. Scott Fitzgerald",
		isbn: "978-0-7432-7356-5",
	},
	{
		name: "To Kill a Mockingbird",
		author: "Harper Lee",
		isbn: "978-0-06-112008-4",
	},
	{
		name: "1984",
		author: "George Orwell",
		isbn: "978-0-452-28423-4",
	},
	{
		name: "Pride and Prejudice",
		author: "Jane Austen",
		isbn: "978-0-14-143951-8",
	},
	{
		name: "The Catcher in the Rye",
		author: "J.D. Salinger",
		isbn: "978-0-316-76948-0",
	},
];

// Mutation to seed the database with sample books
export const seedBooks = mutation({
	args: {},
	handler: async (ctx) => {
		// Check if books already exist
		const existingBooks = await ctx.db.query("books").collect();

		if (existingBooks.length > 0) {
			throw new Error(
				"Books already exist in database. Clear the database first if you want to reseed.",
			);
		}

		// Insert all sample books
		const bookIds = [];
		for (const book of sampleBooks) {
			const id = await ctx.db.insert("books", book);
			bookIds.push(id);
		}

		return {
			message: `Successfully seeded ${bookIds.length} books`,
			bookIds,
		};
	},
});

// Mutation to clear all books (useful for testing)
export const clearBooks = mutation({
	args: {},
	handler: async (ctx) => {
		const books = await ctx.db.query("books").collect();

		for (const book of books) {
			await ctx.db.delete(book._id);
		}

		return {
			message: `Successfully deleted ${books.length} books`,
		};
	},
});
