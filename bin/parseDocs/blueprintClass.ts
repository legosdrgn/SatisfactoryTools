export default function parseBlueprintClass(blueprint: string): string
{
	if (blueprint === null) {
		return '';
	}
	let match = blueprint.match(/"(.*?)"/);
	if (match) {
		blueprint = match[1];
	}
	match = blueprint.match(/'(.*?)'/);
	if (match) {
		blueprint = match[1];
	}
	const parts = blueprint.split('.');
	return parts[parts.length - 1];
}
