export interface VoteType {
  choices: {
    [key: string]: string;
  };
  duration: {
    date: number | undefined;
    hour: number | undefined;
    min: number | undefined;
  };
}
