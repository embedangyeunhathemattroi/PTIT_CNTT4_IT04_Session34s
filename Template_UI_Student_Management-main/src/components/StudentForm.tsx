import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";

import React from "react";
import type { Student } from "../utils/types";

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  toggle: string;
  isShow: (key: string) => void;
}

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
  toggle,
  isShow,
}) => {
  const [form, setForm] = React.useState<Student>({
    id: "SV001",
    name: "Nguyễn Văn A",
    age: 20,
    gender: "Nam",
    birthday: "2025-11-11",
    hometown: "Hà Nội",
    address: "Hà Nội",
  });

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.name) return;
    onSubmit(form);
    setForm({
      id: "",
      name: "",
      age: 0,
      gender: "Nam",
      birthday: "",
      hometown: "",
      address: "",
    });
  };
  const handleClick = () => {
    isShow("OFF");
  };
  return (
    <>
      {toggle == "ON" ? (
        <div className="w-1/3 p-4 border rounded-xl shadow">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="font-semibold mb-4">Thông Tin Sinh Viên</h2>
            <button className="font-semibold mb-4" onClick={handleClick}>
              X
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <TextField
            // error={false}
              label="Tên sinh viên"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Tuổi"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              fullWidth
            />
            <Select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
            <TextField
              type="date"
              label="Ngày sinh"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Địa chỉ"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StudentForm;
