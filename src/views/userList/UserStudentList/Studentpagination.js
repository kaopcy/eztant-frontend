import React from 'react'

const Studentpagination = ({ usersPerPage, totalUsers }) => {
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage ); i++){
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}> 
                        <a href='123'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Studentpagination