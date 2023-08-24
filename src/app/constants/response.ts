export class Response {
  private content: unknown;
  private message: string;
  /**
   * @constructor
   * @param message :string
   * @param data :unknown(Optional)
   * called when the UserResponse is created
   */
  constructor(message: string, data?: unknown) {
    this.message = !!message ? message : 'Success';
    this.content = !!data ? data : {};
  }
}
