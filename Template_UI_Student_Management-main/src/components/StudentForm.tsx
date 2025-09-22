import {
  Button,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import React from "react";
import type { Student } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";

interface StudentFormProps {
  onSubmit: (student: Student) => void;
  toggle: string;
  isClose: (key: string) => void;
  student?: Student | null; // thêm student vào props
}

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
  toggle,
  isClose,
  student,
}) => {
  const [form, setForm] = React.useState<Student>({
    id: "",
    name: "",
    age: 18,
    gender: "Nam",
    birthday: "",
    hometown: "",
    address: "",
  });

  const [errors, setErrors] = React.useState<any>({});
  const [editMode, setEditMode] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const students = useSelector((state: any) => state.students);

  // Nếu có student từ props -> gán vào form (sửa)a
  React.useEffect(() => {
    if (student) {
      setForm(student);
      setEditMode(true);
    } else {
      setForm({
        id: "",
        name: "",
        age: 18,
        gender: "Nam",
        birthday: "",
        hometown: "",
        address: "",
      });
      setEditMode(false);
    }
  }, [student]);

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = (form: Student, students: Student[], editMode: boolean) => {
    let newErrors: any = {};

    if (!form.id.trim()) {
      newErrors.id = "Mã sinh viên không được để trống";
    } else if (
      students.some((s) => s.id === form.id && (!editMode || s.id !== form.id))
    ) {
      newErrors.id = "Mã sinh viên đã tồn tại";
    }

    if (!form.name.trim()) {
      newErrors.name = "Tên sinh viên không được để trống";
    } else if (
      students.some((s) => s.name === form.name && (!editMode || s.id !== form.id))
    ) {
      newErrors.name = "Tên sinh viên đã tồn tại";
    }

    if (!form.age || form.age <= 0) {
      newErrors.age = "Tuổi phải lớn hơn 0";
    }

    if (!form.birthday) {
      newErrors.birthday = "Ngày sinh không được để trống";
    } else if (new Date(form.birthday) > new Date()) {
      newErrors.birthday = "Ngày sinh không được trong tương lai";
    }

    if (!form.hometown.trim()) {
      newErrors.hometown = "Nơi sinh không được để trống";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate(form, students, editMode);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (editMode) {
        dispatch({ type: "EDIT", payload: form });
      } else {
        dispatch({ type: "ADD", payload: form });
      }

      // reset form
      setForm({
        id: "",
        name: "",
        age: 18,
        gender: "Nam",
        birthday: "",
        hometown: "",
        address: "",
      });
      setEditMode(false);

      // đóng form
      isClose("OFF");

      // focus lại input
      inputRef.current?.focus();
    }
  };

  const handleClick = () => {
    isClose("OFF");
  };

  return (
    <>
      {toggle === "ON" ? (
        <div className="w-1/3 p-4 border rounded-xl shadow">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="font-semibold mb-4">
              {editMode ? "Sửa Thông Tin Sinh Viên" : "Thêm Sinh Viên"}
            </h2>
            <button className="font-semibold mb-4" onClick={handleClick}>
              X
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <TextField
              inputRef={inputRef}
              label={errors.id ? errors.id : "Mã sinh viên"}
              name="id"
              value={form.id}
              onChange={handleChange}
              fullWidth
              error={!!errors.id}
              disabled={editMode} // khi sửa thì không cho đổi ID
            />

            <TextField
              label={errors.name ? errors.name : "Tên sinh viên"}
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
            />

            <TextField
              label={errors.age ? errors.age : "Tuổi"}
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              fullWidth
              error={!!errors.age}
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
              label={errors.birthday ? errors.birthday : "Ngày sinh"}
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.birthday}
            />

            <TextField
              label={errors.hometown ? errors.hometown : "Nơi sinh"}
              name="hometown"
              value={form.hometown}
              onChange={handleChange}
              fullWidth
              error={!!errors.hometown}
            />

            <TextField
              label={errors.address ? errors.address : "Địa chỉ"}
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              error={!!errors.address}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {editMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StudentForm;
