import Link from "next/link";

export const AuthNavbar = () => {
  return (
    <header>
      <div className="container flex h-16 items-center">
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-primary">School</span>
            DaysLeft
          </span>
        </Link>
      </div>
    </header>
  );
};
