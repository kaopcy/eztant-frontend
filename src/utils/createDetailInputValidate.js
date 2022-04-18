export const subjectNameValidate = {
    validate: {
        require: value => value.length > 0 || "กรุณากรอกชื่อวิชา",
        lengthLimil: value => value.length < 30 || "ชื่อวิชาห้ามเกิน 20 ตัวอักษร",
        format: value => /^[A-Za-z\s0-9]*$/g.test(value) || "กรอกเป็นภาษาอังกฤษและตัวเลขเท่านั้น",
    },
};
export const subjectIDValidate = {
    onChange: e => (e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""),
    validate: {
        length: value => value.length === 8 || "รหัสวิชาต้องมี 8 ตัวอักษรเช่น 01006030",
    },
};

export const wageValidate = {
    onChange: e => (e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""),
    validate: {
        length: value => (value && value.length > 0) || "กรุณากรอกค่าจ้าง",
        moreThan1: value => value > 0 || "ค่าจ้างต้องมากกว่า 0 บาท",
        lessThanMax: value => value < 99999 || "ค่าจ้างต้องต่ำกว่า 99999 บาท",
    },
};

export const yearValidate = {
    validate: {
        length: value => value.length > 0 || "เลือกอย่างน้อย 1 ชั้นปี",
    },
};

export const minGradeValidate = {
    validate: {
        isNull: value => (value ? true : "เลือก 1 เกรด"),
    },
};
