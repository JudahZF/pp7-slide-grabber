import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { ProPresenter } from 'renewedvision-propresenter'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig // Setup in init()
	ProPresenter!: ProPresenter

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config

		this.ProPresenter = new ProPresenter(this.config.host, this.config.port, 1000)
		const status = await this.ProPresenter.version()
		if (!status.ok) {
			this.updateStatus(InstanceStatus.UnknownError)
			this.log('error', JSON.stringify(status))
			return
		}
		this.log('info', 'ProPresenter Slide Grabber module initialized')
		this.log('debug', JSON.stringify(status))

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy(): Promise<void> {
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		this.config = config
		this.ProPresenter = new ProPresenter(this.config.host, this.config.port, 1000)
		const status = await this.ProPresenter.version()
		if (!status.ok) {
			this.updateStatus(InstanceStatus.UnknownError)
			this.log('error', JSON.stringify(status))
			return
		}
		this.log('info', 'ProPresenter Slide Grabber module initialized')
		this.log('debug', JSON.stringify(status))

		this.updateStatus(InstanceStatus.Ok)
	}

	// Return config fields for web config
	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
