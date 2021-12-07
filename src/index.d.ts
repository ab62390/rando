export interface PName {
  n: string;
  g: string;
}

export interface Person {
  key: number;
  value: {
    name: string;
    gender: string;
    phone?: string;
    age?: number;
  };
}
