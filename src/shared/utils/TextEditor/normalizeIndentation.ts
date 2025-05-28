export function normalizeIndentation(str: string, spacesCount = 4): string {
	return str
		.split('\n')
		.map((line) => {
			let indentLevel = 0;
			let i = 0;
			while (i < line.length) {
				if (line[i] === '\t') {
					indentLevel++;
					i++;
				} else if (line.substr(i, spacesCount) === ' '.repeat(spacesCount)) {
					indentLevel++;
					i += spacesCount;
				} else if (line[i] === ' ') {
					indentLevel++;
					i++;
				} else {
					break;
				}
			}
			return '\t'.repeat(indentLevel) + line.slice(i);
		})
		.join('\n');
}
