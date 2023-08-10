import { FormArray, FormControl } from "@angular/forms";

export interface LoginForm {
    username: FormControl<string>;
    password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
    email: FormControl<string>;
    repeatedPassword: FormControl<string>;
}

export interface IndexCardsForm {
    name: FormControl<string>;
    type: FormControl<string>;
    words: FormArray<FormControl<string>>;
    translations: FormArray<FormControl<string>>;
}
