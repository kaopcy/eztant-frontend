const max_MB = 30;

const MB_to_Byte = mb => {
    return mb * 1024 * 1024;
};

export const fileValidate = {
    require: { value: false },
    validate: {
        max_length: value => {
            if (!value[0]) return true;
            return value[0].size < MB_to_Byte(max_MB) || `ไฟล์ต้องน้อยกว่า ${max_MB}MB`;
        },
    },
};
