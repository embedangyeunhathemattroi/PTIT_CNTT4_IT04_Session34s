const initialState = {
  users: [
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
  ],
};

export const reducerStudent = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD":
      return state;
    case "WATCH":
      return state;
    case "EDIT":
      return state;
    case "DELETE":
      return state;
    case "SEARCH":
      return state;
    default:
      return state;
  }
};
