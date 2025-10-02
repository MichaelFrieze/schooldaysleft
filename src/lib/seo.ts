export const seo = ({
	title,
	description,
	image,
	keywords,
	siteName,
	url,
	locale,
	imageAlt,
	imageWidth,
	imageHeight,
}: {
	title: string;
	description?: string;
	image?: string;
	keywords?: string;
	siteName: string;
	url: string;
	locale?: string;
	imageAlt?: string;
	imageWidth?: number | string;
	imageHeight?: number | string;
}) => {
	const tags = [
		{ title },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: "@michaelfrieze" },
		{ name: "twitter:site", content: "@michaelfrieze" },
		{
			name: "twitter:card",
			content: image ? "summary_large_image" : "summary",
		},
		{ property: "og:type", content: "website" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:site_name", content: siteName },
		{ property: "og:url", content: url },
		{ property: "og:locale", content: locale ?? "en_US" },
		...(image
			? [
					{ name: "twitter:image", content: image },
					...(imageAlt
						? [{ name: "twitter:image:alt", content: imageAlt }]
						: []),
					{ property: "og:image", content: image },
					...(imageAlt
						? [{ property: "og:image:alt", content: imageAlt }]
						: []),
					...(imageWidth
						? [{ property: "og:image:width", content: String(imageWidth) }]
						: []),
					...(imageHeight
						? [{ property: "og:image:height", content: String(imageHeight) }]
						: []),
				]
			: []),
	];

	return tags;
};
