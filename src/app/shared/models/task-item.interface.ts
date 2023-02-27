export interface TaskItemInterface {
  id: number;
  description?: string;
  type: string;
  members?: number[];
  labels?: LabelsInterface[];
}

export interface UserInterface {
  name: string;
  surname: string;
  mail?: string;
  color?: string;
  id: number;
}

interface LabelsInterface {
  color: string;
  background: string;
  darkBackground: string;
  text: string;
}
