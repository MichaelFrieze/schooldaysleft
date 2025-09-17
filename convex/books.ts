import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all books
export const getBooks = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (identity === null) {
			throw new Error("Not authenticated");
		}
		// console.log("identity", { identity });
		return await ctx.db.query("books").collect();
	},
});

// Query to get a single book by ID
export const getBook = query({
	args: { id: v.id("books") },
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	},
});

// Mutation to add a new book
export const addBook = mutation({
	args: {
		name: v.string(),
		author: v.string(),
		isbn: v.string(),
	},
	handler: async (ctx, args) => {
		const bookId = await ctx.db.insert("books", {
			name: args.name,
			author: args.author,
			isbn: args.isbn,
		});
		return bookId;
	},
});

// Mutation to update an existing book
export const updateBook = mutation({
	args: {
		id: v.id("books"),
		name: v.optional(v.string()),
		author: v.optional(v.string()),
		isbn: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;
		await ctx.db.patch(id, updates);
		return id;
	},
});

// Mutation to delete a book
export const deleteBook = mutation({
	args: { id: v.id("books") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
