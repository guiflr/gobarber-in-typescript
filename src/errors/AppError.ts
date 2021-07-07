class AppError {
  public message;
  public status;
  constructor(message: string, status = 400) {
    this.message = message;
    this.status = status;
  }
}

export { AppError }