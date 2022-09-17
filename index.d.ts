type SurrealType<T = any> = {
  time: string;
  status: string;
  result?: T[];
};

type SurrealError = {
  status: string;
  msg: string;
};
