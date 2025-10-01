import { queryOptions } from "@tanstack/react-query";
import { getAllCountdowns } from "../server/server-fns";

export const countdownsQueryOptions = () =>
	queryOptions({
		queryKey: ["countdowns"],
		queryFn: () => getAllCountdowns(),
	});
