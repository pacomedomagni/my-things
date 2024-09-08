import { MobileRegisterService } from "@modules/mobile/services/register.service";
import { autoSpy } from "autoSpy";
import { of } from "rxjs";
import { ChangePhoneNumberComponent } from "./change-phone-number.component";

describe("ChangePhoneNumberComponent", () => {

	it("should construct", () => {
		const { build } = setup().default();
		const r = build();
	});
});

function setup(): any {
	const injectedData = {model:{phoneNumber:"220-323-3322"}, data:[{}, {}]};

	const registerService = autoSpy(MobileRegisterService);
	registerService.generateMobileNumber.mockReturnValue(of("440-344-2333"));
	const builder = {
		injectedData,
		registerService,
		default(): any {
			return builder;
		},
		build(): any {
			return new ChangePhoneNumberComponent(injectedData, registerService);
		}
	};

	return builder;
}

describe("Change phone number dialog", () => {

	it("should create", () => {
		const { build } = setup().default();
		const component = build();

		expect(component).toBeTruthy();
	});

	it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model).toEqual({phoneNumber:"220-323-3322"});
	});

	it("should generate mobile number", () => {
		const { build, registerService } = setup().default();
		const component = build();

		component.generateMobileNumber();

		expect(registerService.generateMobileNumber).toHaveBeenCalled();
	});

	it("should clear auto generate number", () => {
		const { build} = setup().default();
		const component = build();
		component.generateSuccessful = true;
		component.clearAutoGenerateMobileNumber();

		expect(component.generateSuccessful).toBeFalsy();
	});

});
