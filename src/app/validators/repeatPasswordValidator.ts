import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function repeatPasswordValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')!;
        const repeatPassword = control.get('repeatPassword')!;

        if (password.value !== repeatPassword.value) {
            repeatPassword.setErrors({ 'PASSWORDS_DO_NOT_MATCH': true });
        } else if (repeatPassword.value.length > 0) {
            repeatPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }

        return null;
    }
}