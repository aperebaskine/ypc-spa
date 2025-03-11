import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export function emailExistsValidator(): AsyncValidatorFn {

    const userService = inject(UserService);

    return (control: AbstractControl<any, any>) =>
        userService.exists({ email: control.value })
            .pipe(map((exists) => exists.email ? { "EMAIL_IN_USE": true } : null));
}
