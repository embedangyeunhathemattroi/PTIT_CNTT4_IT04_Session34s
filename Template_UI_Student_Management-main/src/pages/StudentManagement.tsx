import type { Student } from "../utils/types";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import Toolbar from "../components/Toolbar";
import { useSelector } from "react-redux";
import { useState } from "react";

const StudentManagement = () => {
  const [toggle, setToggle] = useState<string>("OFF");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<Student[] | null>(
    null
  ); // null = chưa search
  const [sortAsc, setSortAsc] = useState(true);

  const result = useSelector((data: any) => data.students);

  // ---- SORT ----
  const handleSort = () => {
    const target = filteredStudents !== null ? [...filteredStudents] : [...result];
    target.sort((a: Student, b: Student) =>
      sortAsc
        ? a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
        : b.name.localeCompare(a.name, "vi", { sensitivity: "base" })
    );

    setFilteredStudents(target);
    setSortAsc(!sortAsc);
  };

  // ---- SEARCH ----
  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setFilteredStudents(null); // reset => hiển thị toàn bộ
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    const searchResult = result.filter((s: Student) =>
      s.name.toLowerCase().includes(lowerKeyword)
    );

    setFilteredStudents(searchResult);
  };

  // ---- SHOW/HIDE FORM ----
  const isShow = (flag: string) => {
    setToggle(flag);
    if (flag === "OFF") {
      setEditingStudent(null);
    }
  };

  // ---- EDIT ----
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setToggle("ON");
  };

  // ---- DATA HIỂN THỊ ----
  const displayStudents = filteredStudents === null ? result : filteredStudents;

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar
          isShow={isShow}
          onSearch={handleSearch}
          onSort={handleSort}
        />
        <StudentList
          students={displayStudents}
          onEdit={handleEditStudent}
        />
      </div>
      <StudentForm
        isClose={isShow}
        toggle={toggle}
        onSubmit={() => {}}
        student={editingStudent}
      />
    </div>
  );
};

export default StudentManagement;
