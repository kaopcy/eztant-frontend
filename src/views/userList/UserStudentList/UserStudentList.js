import React from 'react'
import Studentsearchbar from './Studentsearchbar'
import Studentdirectory from './Studentdirectory'

const UserStudentList = () => {
  return (
    <div>
        <div>
          <Studentsearchbar/>
        </div>
        <div>
          <Studentdirectory/>
        </div>
      </div>
  )
}

export default UserStudentList