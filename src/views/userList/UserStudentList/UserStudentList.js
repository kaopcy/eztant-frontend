import React from 'react'
import Studentsearchbar from './studentsearchbar'
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