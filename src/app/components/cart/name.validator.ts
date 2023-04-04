import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): any => {
    const nameIsCorrect =
      control.value.split('').filter((np: any) => np !== '').length > 1;
    return nameIsCorrect ? null : { incorrectName: true };
  };
}
