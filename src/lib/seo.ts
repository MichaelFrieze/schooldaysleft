export const seo = ({
	title,
	description,
	keywords,
	image,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
}) => {
	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: "@michaelfrieze" },
		{ name: "twitter:site", content: "@michaelfrieze" },
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:site_name", content: title },
		...(image
			? [
					{ name: "twitter:image", content: image },
					{ name: "twitter:card", content: "summary_large_image" },
					{ property: "og:image", content: image },
				]
			: []),
	];

	return tags;
};
