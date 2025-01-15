import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	num_slides: number
	num_words: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: Regex.IP,
			default: '127.0.0.1',
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 4,
			min: 1,
			max: 65535,
			default: 1025,
		},
		{
			type: 'number',
			id: 'num_slides',
			label: 'Number of Slide Variables',
			width: 4,
			min: 1,
			max: 256,
			default: 16,
		},
		{
			type: 'number',
			id: 'num_words',
			label: 'Number of Word Variables',
			width: 4,
			min: 1,
			max: 1024,
			default: 128,
		},
	]
}
