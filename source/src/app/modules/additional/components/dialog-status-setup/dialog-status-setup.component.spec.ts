
import { DialogStatusSetupComponent } from "./dialog-status-setup.component";

function setup() {
	const injectedData = { model:{isNonInstaller: false, isNonCommunicator: true, nonInstallerDays: 30, nonCommunicatorDays: 20} };
	const builder = {
		default() {
			return builder;
		},
		build() {
			return new DialogStatusSetupComponent(injectedData);
		}
	};

	return builder;
}

describe("DialogStatusSetupComponent", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model.isNonInstaller).toEqual(false);
		expect(component.model.isNonCommunicator).toEqual(true);
		expect(component.model.nonInstallerDays).toEqual(30);
		expect(component.model.nonCommunicatorDays).toEqual(20);
	});
});
