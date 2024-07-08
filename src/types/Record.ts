export interface Record {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  score: number;
}

export interface UpdateRecord {
  level: number;
  score: number;
}
