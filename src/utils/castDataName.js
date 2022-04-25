// from front => back

export const castPost = postInput => {
    return {
        ...postInput,
        subject_name: postInput.subjectName,
        subject_id: postInput.subjectID,
        requirement_grade: postInput.minGrade,
        requirement_year: postInput.year,
        description: postInput.requirement,
        schedules: postInput.tables,
        expired: postInput.close_date,
    };
};

export const castPostFromDatabase = postInput => {
    return {
        ...postInput,
        subjectName: postInput.subject_name,
        subjectID: postInput.subject_id,
        minGrade: postInput.requirement_grade,
        year: postInput.requirement_year,
        requirement: postInput.description,
        tables: postInput.schedules,
        close_date: postInput.expired,
    };
};
