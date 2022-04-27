export const subjectNameValidate = {
    validate: {
        require: value => value.length > 0 || "กรุณากรอกชื่อวิชา",
        lengthLimil: value => value.length < 50 || "ชื่อวิชาห้ามเกิน 50 ตัวอักษร",
        format: value => /^[A-Za-z\s0-9]*$/g.test(value) || "กรุณากรอกเป็นภาษาอังกฤษและตัวเลขเท่านั้น",
    },
};

export const subjectIDValidate = {
    onChange: e => (e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""),
    validate: {
        length: value => value.length === 8 || "รหัสวิชาต้องเป็นตัวเลข 8 ตัว เช่น 01000000",
    },
};

export const wageValidate = {
    onChange: e => {
        if(e.target.value?.[1] && e.target.value[0] === '0') {
            e.target.value = e.target.value.slice(1)
        }
        e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""
    },
    validate: {
        length: value => (value && value.length > 0) || "กรุณากรอกค่าจ้าง",
        moreThan1: value => value >= 0 || "ค่าจ้างต้องมากกว่า 0 บาท",
        lessThanMax: value => value < 99999 || "ค่าจ้างต้องไม่เกิน 99999 บาท",
    },
};

export const yearValidate = {
    validate: {
        length: value => value.length > 0 || "กรุณาเลือกอย่างน้อย 1 ชั้นปี",
    },
};

export const minGradeValidate = {
    validate: {
        isNull: value => (value ? true : "กรุณาเลือก 1 ตัวเลือก"),
    },
};

export const fieldValidate = {
    validate: {
        maxLength: value => value.length < 500 || 'ความยาวไม่เกิน 300 ตัวอักษร'
    }
}