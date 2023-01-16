export interface TaskItemInterface {
  description: string;
  members: UserInterface[];
}

interface UserInterface {
  name: string;
  surname: string;
  mail: string;
  color: string;
}
