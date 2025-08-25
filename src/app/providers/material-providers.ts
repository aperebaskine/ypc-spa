import { Provider } from "@angular/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

export const MATERIAL_DEFAULT_PROVIDERS: Provider[] = [
    {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue:
        {
            appearance: 'outline',
            floatLabel: 'always'
        }
    }
];