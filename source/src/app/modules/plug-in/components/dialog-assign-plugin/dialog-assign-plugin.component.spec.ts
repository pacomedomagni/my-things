import { MatDialogRef } from "@angular/material/dialog";
import { autoSpy } from "autoSpy";
import { DialogAssignPluginComponent } from "./dialog-assign-plugin.component";

function setup() {
  const data = { name: "Participant Name" };
  const dialogRef = autoSpy(MatDialogRef) as MatDialogRef<DialogAssignPluginComponent>;
  const builder = {
    dialogRef,
    default() {
      return builder;
    },
    build() {
      const comp = new DialogAssignPluginComponent(data, dialogRef);
      return comp;
    }
  };

  return builder;
}

describe("DialogAssignPluginComponent", () => {

  it("should create", () => {
    const { build } = setup().default();
    const component = build();

    expect(component).toBeTruthy();
  });

  it("when onClose is called the dialog should close with undefined", () => {
    const { build, dialogRef } = setup().default();
    const component = build();

    component.onClose();

    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it("when onCancel is called the dialog should close with undefined", () => {
    const { build, dialogRef } = setup().default();
    const component = build();

    component.onCancel();

    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it("when onConfirm is called the dialog should close with undefined", () => {
    const { build, dialogRef } = setup().default();
    const component = build();

    component.onConfirm();

    expect(dialogRef.close).toHaveBeenCalledWith({});
  });

});

