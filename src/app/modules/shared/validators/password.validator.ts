import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordValidator = (passwordControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordControl = control.get(passwordControlName);

        if (passwordControl?.value && !/[A-Z]/.test(passwordControl.value)) {
            passwordControl.setErrors({ passwordNotContainGreatLetter: true });
        }
        if (passwordControl?.value && !/\d/.test(passwordControl.value)) {
            passwordControl.setErrors({ passwordNotContainDigit: true });
        }
        return null;
    };
};
