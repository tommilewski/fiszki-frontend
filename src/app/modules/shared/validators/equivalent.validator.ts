import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equivalentValidator = (
    passwordControlName: string,
    secondPasswordControlName: string,
): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordControl = control.get(passwordControlName);
        const secondPasswordControl = control.get(secondPasswordControlName);

        if (
            secondPasswordControl?.value &&
            passwordControl?.value !== secondPasswordControl?.value
        ) {
            secondPasswordControl.setErrors({ passwordNotEqual: true });
        }
        return null;
    };
};
