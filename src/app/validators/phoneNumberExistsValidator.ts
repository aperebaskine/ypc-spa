import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export function phoneNumberExistsValidator(): AsyncValidatorFn {

    const userService = inject(UserService);

    return (control: AbstractControl<any, any>) =>
        userService.exists({ phoneNumber: control.value })
            .pipe(map((exists) => exists.phoneNumber ? { "PHONE_NUMBER_IN_USE": true } : null));
}
