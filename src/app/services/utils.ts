import { of } from 'rxjs';

export class Utils {
  public static log(response: any) {
    console.table(response);
  }

  public static handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
