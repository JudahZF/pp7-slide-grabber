import type { ModuleInstance } from './main.js'
import type { CompanionVariableDefinition } from '@companion-module/base'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	const variables: CompanionVariableDefinition[] = []
	for (let i = 1; i <= self.config.num_slides; i++) {
		variables.push({ variableId: `slide_${i}`, name: `Slide ${i}` })
	}
	for (let i = 1; i <= self.config.num_words; i++) {
		variables.push({ variableId: `word_${i}`, name: `Word ${i}` })
	}
	self.setVariableDefinitions(variables)
}
