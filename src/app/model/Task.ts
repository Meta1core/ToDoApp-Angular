export class Task {
  description: string;
  header: string;
  dateOfTask;
  directory_Id: Number;

  constructor(description: string, header: string, dateOfTask, directory_Id: Number) {
    this.description = description;
    this.header = header;
    this.dateOfTask = dateOfTask;
    this.directory_Id = directory_Id;
  }
}