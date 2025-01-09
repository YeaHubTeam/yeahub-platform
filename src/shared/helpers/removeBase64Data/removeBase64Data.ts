export function removeBase64Data(imageBase64: string) {
	const base64regexp = new RegExp(/data:image\/(png|jpg|jpeg);base64,/);
	return imageBase64.replace(base64regexp, '');
}
