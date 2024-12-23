import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPass = control.get('newPass')?.value;
    const cnfPass = control.get('cnfPass')?.value;
    
    // Check if passwords match
    if (newPass && cnfPass && newPass !== cnfPass) {
      return { passwordMismatch: true };  // Error if passwords don't match
    }
    return null; // No error if passwords match
  };
}
