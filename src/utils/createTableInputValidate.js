export const timeValidate = {
    onChange: e => {
        const temp = e.target.value
            .replaceAll(":", "")
            .replace(/[^0-9]/g, "")
            .replace(/(\..*)\./g, "$1")
            .replace(/(..?)/g, "$1:")
            .slice(0, -1);
        e.target.value = temp.slice(0, 5);
    },
    validate: {
        minute: value => {
            value = value
                .replaceAll(":", "")
                .replace(/[^0-9]/g, "")
                .replace(/(\..*)\./g, "$1")
                .replace(/(..?)/g, "$1:")
                .slice(0, -1);
            const [hour, minute] = value.split(":");
            return parseInt(minute) ? parseInt(minute) < 60 || "นาทีต้องน้อยกว่า 60" : true;
        },
        hour: value => {
            value = value
                .replaceAll(":", "")
                .replace(/[^0-9]/g, "")
                .replace(/(\..*)\./g, "$1")
                .replace(/(..?)/g, "$1:")
                .slice(0, -1);
            const [hour, minute] = value.split(":");
            return parseInt(hour) ? parseInt(hour) < 24 || "ชั่วโมงต้องน้อยกว่า 24" : true;
        },
        equal: value => {
            value = value
                .replaceAll(":", "")
                .replace(/[^0-9]/g, "")
                .replace(/(\..*)\./g, "$1")
                .replace(/(..?)/g, "$1:")
                .slice(0, -1);
            return value.length === 5 || "กรอกให้ถูกฟอร์แมท";
        },
    },
};

export const sectionValidate = {
    onChange: e => (e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""),
    validate: {
        min_Length: value => value.length === 3 || "เซคต้องมี 3 ตัวอักษรเช่น 101",
    },
};

export const max_taValidate = {
    onChange: e => (e.target.value = /[0-9]+/g.exec(e.target.value)?.[0] || ""),
    validate: {
        min_Length: value => value.length > 0 || "กรุณากรอกจำนวน TA",
        max: value => (value.length <= 0 ? true : parseInt(value) < 15 || "จำนวน TA ไม่เกิน 15 คน"),
        min: value => (value.length <= 0 ? true : parseInt(value) > 0 || "ต้องมี TA อย่างน้อย 1 คน"),
    },
};

const isMoreDay = date => {
    const getRoundedDate = date => {
        const oneDay = 60 * 60 * 24 * 1000;
        return date - (date % oneDay);
    };
    const selectedDate = new Date(date);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 0);
    return getRoundedDate(currentDate.getTime()) <= getRoundedDate(selectedDate.getTime());
};

const isEqualDay = date => {
    const getRoundedDate = date => {
        const oneDay = 60 * 60 * 24 * 1000;
        return date - (date % oneDay);
    };
    const selectedDate = new Date(date);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 0);
    return getRoundedDate(currentDate.getTime()) !== getRoundedDate(selectedDate.getTime());
};

const isLessDay = date => {
    const getRoundedDate = date => {
        const oneDay = 60 * 60 * 24 * 1000;
        return date - (date % oneDay);
    };
    const selectedDate = new Date(date);
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 365);
    return getRoundedDate(currentDate.getTime()) > getRoundedDate(selectedDate.getTime());
};

const wrongFormat = date =>{
    const splitDate = date.split('-')
    if (splitDate.length !== 3) return "กรอกให้ถูกฟอร์แมท"
    if (splitDate[0].length !== 4) return "กรอกให้ถูกฟอร์แมท"
    if (splitDate[1].length !== 2) return "กรอกให้ถูกฟอร์แมท"
    if (splitDate[2].length !== 2) return "กรอกให้ถูกฟอร์แมท"
    return true
}

export const closeDateValidate = {
    validate: {
        wrongFormat: value=> wrongFormat(value),
        isMore: value => isMoreDay(value) || "ห้ามกรอกเลขในอดีต",
        isLess: value => isLessDay(value) || "ห้ามกรอกเลขมากกว่า 1 ปี",
        isEqual: value => isEqualDay(value) || "ห้ามกรอกวันนี้",
    },
};
