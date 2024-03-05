export interface TodoInterface {
  completed: boolean;
  finish: string;
  id: number;
  name: string;
  start: string;
}

export interface DayInterface {
  date: string;
  repeated: boolean;
  todos: TodoInterface[]
}

export interface DayWithTodoInterface {
  date: string;
  todo: TodoInterface;
  repeated: boolean;
}

// export interface TodoInterfaceForChange {
//   date: string;
//   finish: string;
//   name: string;
//   start: string;
// }

export interface TodoWithoutTimeInterface {
  id: number;
  name: string;
  completed: boolean;
}

// export interface TodoRepeatedInt {
//   day: string;
//   Todos: TodoInterface[];
// }

// export interface TodoState {
//   Todos: TodoInterface[];
//   TodosRepeated: TodoRepeatedInt[];
//   TodoIdToChange: null | number;
//   TodosWithoutTimeline: TodoWithouTime[];
//   TodoName: string;
//   TodoIdToAddAfterThis: null | number;
//   TodoIdToAddBeforeThis: null | number;
// }

// export interface TodoIntForAdding {
//   days: string[];
//   Todos: TodoInterface[];
// }