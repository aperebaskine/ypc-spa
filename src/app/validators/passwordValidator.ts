import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function passwordValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        let password: string = control.value;

        if (password.length < 8 || password.length > 20
            || !password.match(/[A-Z]/) || !password.match(/\d/) || !password.match(/\W|_/)) {
            return { 'INVALID_FORMAT': true };
        }

        return null;
    }
}