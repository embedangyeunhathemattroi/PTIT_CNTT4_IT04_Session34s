import type { Student } from '../utils/types';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import Toolbar from '../components/Toolbar';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const StudentManagement = () => {
  const [toggle,setToggle] = useState<string>("OFF")
  const result = useSelector((data:any)=>{
    console.log("data",data);
    return data.students.users
  })

  const handleAddStudent = (student: Student) => {
    // setStudents([...students, student]);
  };

  const handleSearch = (keyword: string) => {
    // setStudents((prev) =>
    //   prev.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase())),
    // );
  };
  const isShow =(flag:string) =>{
    setToggle(flag)
    
  }
  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar isShow={isShow} onSearch={handleSearch} />
        <StudentList students={result} />
      </div>
      <StudentForm isShow={isShow} toggle={toggle} onSubmit={handleAddStudent} />
    </div>
  );
};

export default StudentManagement;
