import type { Student } from "../../utils/types";

const initialState: Student[] = [
  {
    id: "SV001",
    name: "Nguyễn Văn A",
    age: 20,
    gender: "Nam",
    birthday: "2025-11-11",
    hometown: "Hà Nội",
    address: "Hà Nội",
  },
  {
    id: "SV002",
    name: "Nguyễn Văn B",
    age: 21,
    gender: "Nữ",
    birthday: "2025-11-11",
    hometown: "Hà Nội",
    address: "Hà Nội",
  },
  {
    id: "SV003",
    name: "Nguyễn Văn C",
    age: 19,
    gender: "Nam",
    birthday: "2025-11-11",
    hometown: "Hà Nội",
    address: "Hà Nội",
  },
];

export const reducerStudent = (
  state = initialState,
  action: any
): Student[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "EDIT":
      return state.map((stu) =>
        stu.id === action.payload.id ? { ...stu, ...action.payload } : stu
      );

    case "DELETE":
      return state.filter((stu) => stu.id !== action.payload);

    default:
      return state;
  }
};
