export interface TaskItemInterface {
  id: number;
  description: string;
  type: string;
  members?: UserInterface[];
}

interface UserInterface {
  name: string;
  surname: string;
  mail: string;
  color: string;
}
