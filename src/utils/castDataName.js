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
        subjectName: postInput?.subject_name || null,
        subjectID: postInput?.subject_id || null,
        minGrade: postInput?.requirement_grade || null,
        year: postInput?.requirement_year || null,
        requirement: postInput?.description || null,
        tables: postInput?.schedules || null,
        close_date: postInput?.expired || null,
        author: `${postInput?.owner_id?.firstname} ${postInput?.owner_id?.lastname}`
    };
};
