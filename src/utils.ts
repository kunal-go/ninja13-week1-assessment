export function imageLink(path: string, size: string = "w500") {
	return `https://image.tmdb.org/t/p/${size}${path}`
}

export function formattedDate(date: any) {
	return new Date(date).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}
