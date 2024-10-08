import { NgxMatDateFormats } from "@angular-material-components/datetime-picker";

export const DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: "l, LTS"
    },
    display: {
        dateInput: "l, LT",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY"
    }
};
