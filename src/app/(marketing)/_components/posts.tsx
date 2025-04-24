"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";

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

  const { data: latestPost } = useSuspenseQuery(
    trpc.post.getLatest.queryOptions(),
  );

  // No suspense: useQuery()
  // This works with or without prefetching
  // const { data: latestPost, isLoading } = useQuery(
  //   trpc.post.getLatest.queryOptions(),
  // );
  //
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // You can also get initial data from RSC instead of prefetching
  // Data fetching will need to be awaited in RSC
  // const { data: latestPost } = useQuery({
  //   ...trpc.post.getLatest.queryOptions(),
  //   initialData: props.initialData
  // });

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
