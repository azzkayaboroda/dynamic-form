export interface Control {
	id: string;
	control: string;
	caption: string;
	parentID?: string;
	tabIndex?: number;
	position?: number;
	type?: string;
	required?: boolean;
	options?: { value: string | boolean; label: string }[];
	visibilityDependsOn?: {
		controlId: string;
		value: string | boolean;
	};
}

export interface FormJSON {
	title: string;
	controls: Control[];
	submitUrl: string;
}
