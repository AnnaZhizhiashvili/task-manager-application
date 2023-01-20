export const ColorTypes: ColorsInterface[] = [
  {
    color: 'red',
    background: '#FD9983',
    darkBackground: '#FB6646',
  },
  {
    color: 'green',
    background: '#99E1AC',
    darkBackground: '#5F9C6E',
  },
  {
    color: 'yellow',
    background: '#F3EF97',
    darkBackground: '#E8DF04',
  },
  {
    color: 'orange',
    background: '#F3C991',
    darkBackground: '#E8A041',
  },
  {
    color: 'purple',
    background: '#DAC1FF',
    darkBackground: '#9F73E0',
  },
  {
    color: 'blue',
    background: '#A1C3E4',
    darkBackground: '#4090DF',
  },
];

interface ColorsInterface {
  color: string;
  background: string;
  darkBackground?: string;
}
