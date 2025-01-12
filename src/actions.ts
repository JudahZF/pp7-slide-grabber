import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		grab_action: {
			name: 'Grab Slide Text',
			options: [
				{
					id: 'group',
					type: 'textinput',
					label: 'Group',
					default: 'Chorus 1',
				},
				{
					id: 'num',
					type: 'number',
					label: 'Maxium number of slides',
					default: 1,
					min: 1,
					max: 16,
				},
				{
					id: 'start',
					type: 'number',
					label: 'First variable to use',
					default: 1,
					min: 1,
					max: 16,
				},
			],
			callback: async (event) => {
				this.ProPresenter.presentationActiveGet()
				const group = event.options.group
				const num = event.options.num
				const start = event.options.start
				if (typeof group !== 'string') {
					this.log('group must be a string')
					return
				}
				if (typeof num !== 'number') {
					this.log('num must be a number')
					return
				}
				if (typeof start !== 'number') {
					this.log('start must be a number')
					return
				}

				const presentation = await this.ProPresenter.presentationActiveGet()
				if (presentation === null) {
					this.log('no presentation active')
					return
				}
				this.log('presentation active')

				const selected_group = presentation.presentation.groups.find((grp) => grp.name === group)
				if (selected_group === undefined) {
					this.log('group not found')
					return
				}
				this.log('group found')

				const selected_slides = selected_group.slides.slice(0, num - 1)
				if (selected_slides.length === 0) {
					this.log('no slides found')
					return
				}
				this.log('slides found')

				for (let i = 0; i < selected_slides.length; i++) {
					const slide = selected_slides[i]
					this.setVariableValues({
						[`slide_${start + i}`]: slide.text,
					})
				}
			},
		},
	})
}
