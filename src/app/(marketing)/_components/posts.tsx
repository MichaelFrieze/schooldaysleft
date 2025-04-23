"use client";

import { useState } from "react";

import { useTRPC } from "@/trpc/react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LatestPost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const createPostMutationOptions = trpc.post.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: trpc.post.getLatest.queryKey(),
      });
      setName("");
    },
  });
  const createPost = useMutation(createPostMutationOptions);

  const { data: latestPost, isLoading } = useSuspenseQuery(
    trpc.post.getLatest.queryOptions(),
  );

  if (isLoading) {
    return <p>Loading from client...</p>;
  }

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <Input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2"
        />
        <Button
          type="submit"
          className="rounded-full px-10 py-3 font-semibold transition"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
