import type { ModuleInstance } from './main.js'
import { Group } from './types.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		grab_slide_action: {
			name: 'Grab Slide Text',
			options: [
				{
					id: 'group',
					type: 'textinput',
					label: 'Group',
					default: 'Chorus',
				},
				{
					id: 'num',
					type: 'number',
					label: 'Maxium number of slides',
					default: 1,
					min: 8,
					max: self.config.num_slides,
				},
				{
					id: 'start',
					type: 'number',
					label: 'First variable to use',
					default: 1,
					min: 1,
					max: self.config.num_slides,
				},
			],
			callback: async (event) => {
				const group = event.options.group
				const num = event.options.num
				const start = event.options.start
				if (typeof group !== 'string') {
					self.log('error', 'group must be a string')
					return
				}
				if (typeof num !== 'number') {
					self.log('error', 'num must be a number')
					return
				}
				if (typeof start !== 'number') {
					self.log('error', 'start must be a number')
					return
				}

				const presentation = await self.ProPresenter.presentationActiveGet()
				if (presentation === null) {
					self.log('error', 'no presentation active')
					return
				}
				self.log('debug', 'presentation active')
				self.log('debug', `${JSON.stringify(presentation)}`)

				const selected_group = presentation.data.presentation.groups.find((grp: Group) => grp.name === group)
				if (selected_group === undefined) {
					self.log('error', 'group not found')
					return
				}
				self.log('debug', 'group found')

				const selected_slides = selected_group.slides.slice(0, num - 1)
				if (selected_slides.length === 0) {
					self.log('error', 'no slides found')
					return
				}
				self.log('debug', 'slides found')

				for (let i = 0; i < num; i++) {
					self.log('debug', `Clearing variable "slide_${start + i}"`)
					self.setVariableValues({
						[`slide_${start + i}`]: '',
					})
				}

				for (let i = 0; i < selected_slides.length; i++) {
					const slide = selected_slides[i]
					self.log('debug', `Saving "${slide.text}" to variable "slide_${start + i}"`)
					self.setVariableValues({
						[`slide_${start + i}`]: slide.text,
					})
				}
			},
		},
		grab_word_action: {
			name: 'Grab Slide Words',
			options: [
				{
					id: 'group',
					type: 'textinput',
					label: 'Group',
					default: 'Chorus',
				},
				{
					id: 'num',
					type: 'number',
					label: 'Maxium number of words',
					default: 32,
					min: 1,
					max: self.config.num_words,
				},
				{
					id: 'start',
					type: 'number',
					label: 'First variable to use',
					default: 1,
					min: 1,
					max: self.config.num_words,
				},
			],
			callback: async (event) => {
				const group = event.options.group
				const num = event.options.num
				const start = event.options.start
				if (typeof group !== 'string') {
					self.log('error', 'group must be a string')
					return
				}
				if (typeof num !== 'number') {
					self.log('error', 'num must be a number')
					return
				}
				if (typeof start !== 'number') {
					self.log('error', 'start must be a number')
					return
				}

				const presentation = await self.ProPresenter.presentationActiveGet()
				if (presentation === null) {
					self.log('error', 'no presentation active')
					return
				}
				self.log('debug', 'presentation active')
				self.log('debug', `${JSON.stringify(presentation)}`)

				const selected_group = presentation.data.presentation.groups.find((grp: Group) => grp.name === group)
				if (selected_group === undefined) {
					self.log('error', 'group not found')
					return
				}
				self.log('debug', 'group found')
				const words: string[] = []
				for (let i = 0; i < selected_group.slides.length; i++) {
					const text = selected_group.slides[i].text.replaceAll('\n', ' ').split(' ')
					for (let j = 0; j < text.length; j++) {
						words.push(text[j])
					}
				}

				if (words.length === 0) {
					self.log('error', 'no words found')
					return
				}
				self.log('debug', 'words found')

				for (let i = 0; i < num; i++) {
					self.log('debug', `Clearing variable "word_${start + i}"`)
					self.setVariableValues({
						[`word_${start + i}`]: '',
					})
				}

				for (let i = 0; i < num; i++) {
					const word = words[i]
					self.log('debug', `Saving "${word}" to variable "word_${start + i}"`)
					self.setVariableValues({
						[`word_${start + i}`]: word,
					})
				}
			},
		},
	})
}
