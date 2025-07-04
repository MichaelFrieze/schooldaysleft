const authConfig = {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
      applicationID: "convex",
    },
  ],
};

console.log(
  "Convex auth config domain:",
  process.env.NEXT_PUBLIC_CLERK_FRONTEND_API_URL,
);

export default authConfig;
