import { DialogReturnPluginComponent } from "./dialog-return-plugin.component";

function setup() {
  const injectedData = {model:{selection:"123456789"}, data:["123456789", "987654321"]};
  const builder = {
    default() {
      return builder;
    },
    build() {
      const comp = new DialogReturnPluginComponent(injectedData);
      return comp;
    }
  };

  return builder;
}

describe("DialogReturnPluginComponent", () => {

  it("should create", () => {
    const { build } = setup().default();
    const component = build();

    expect(component).toBeTruthy();
  });

  it("should correctly initialize model", () => {
		const { build } = setup().default();
		const component = build();

		component.ngOnInit();

		expect(component.model).toEqual({selection:"123456789"});
		expect(component.deviceSerialNumbers.length).toEqual(2);
	});
});

