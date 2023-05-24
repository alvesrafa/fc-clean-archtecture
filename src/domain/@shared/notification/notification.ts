export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    let message = this.errors.reduce((msg, error) => {
      if (context === undefined || error.context === context) {
        msg += `${error.context}: ${error.message},`;
      }
      return msg;
    }, "");

    return message;
  }
}
