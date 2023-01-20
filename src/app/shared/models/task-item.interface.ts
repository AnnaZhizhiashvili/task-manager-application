export interface TaskItemInterface {
  id: number;
  description: string;
  type: string;
  members?: UserInterface[];
  labels?: LabelsInterface[];
}

interface UserInterface {
  name: string;
  surname: string;
  mail: string;
  color: string;
}

interface LabelsInterface {
  color: string;
  background: string;
  darkBackground: string;
  text: string;
}
