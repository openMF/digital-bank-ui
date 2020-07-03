import { throwError as observableThrowError } from 'rxjs';

export class Error {
  status: number;
  statusText: string;
  message: string;

  static handleError(errorResponse: any): any {
    const error: Error = new Error(errorResponse.status, errorResponse.statusText, errorResponse.message);

    console.error(error.getErrorMessage());

    return observableThrowError(error);
  }

  constructor(status: number, statusText: string, message: string) {
    this.status = status;
    this.message = message;
    this.statusText = statusText;
  }

  getErrorMessage(): string {
    const errMsg: string = this.message ? this.message : this.status ? `${this.status} - ${this.statusText}` : 'Server error';
    return errMsg;
  }
}
