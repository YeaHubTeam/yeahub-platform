export function convertSpacesToTabs(code: string, tabSize = 2): string {
	return code
		.split('\n')
		.map((line) => {
			let i = 0;
			while (i < line.length && line[i] === ' ') i++;
			const tabs = '\t'.repeat(Math.floor(i / tabSize));
			const rest = line.slice(i);
			return tabs + rest;
		})
		.join('\n');
}
