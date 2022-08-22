import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
export class Usernamevalidator{

  //Validator to check if string has space or not
  static cannotContainSpace(controll : AbstractControl) : ValidationErrors | null {
    if ((controll.value as string).indexOf(' ') >= 0 )
      return {
        cannotContainSpace: true
      }
    return null;
  }

  //password check and confiramtion password
  static passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}

