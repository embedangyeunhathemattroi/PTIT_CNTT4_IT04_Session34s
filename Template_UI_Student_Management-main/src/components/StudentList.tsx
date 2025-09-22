import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";
import type { Student } from "../utils/types";
import { useDispatch } from "react-redux";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void; // thêm prop onEdit
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mã sinh viên</TableCell>
            <TableCell>Tên sinh viên</TableCell>
            <TableCell>Tuổi</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Không có sinh viên nào được tìm thấy
              </TableCell>
            </TableRow>
          ) : (
            students.map((s, i) => (
              <TableRow key={s.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.age}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="contained" color="error">
                      Xem
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => onEdit(s)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
                          dispatch({ type: "DELETE", payload: s.id });
                        }
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
