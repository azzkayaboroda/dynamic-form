class LocalStorageService {
	static saveFormData(data: Record<string, string | null>) {
		localStorage.setItem('formData', JSON.stringify(data));
	}

	static getFormData(): Record<string, string | null> | null {
		const data = localStorage.getItem('formData');
		return data ? JSON.parse(data) : null;
	}

	static clearFormData() {
		localStorage.removeItem('formData');
	}
}

export default LocalStorageService;
