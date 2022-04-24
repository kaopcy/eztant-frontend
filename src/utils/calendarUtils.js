import { DAY_SHORT_EN } from "../generalConfig";

export const MONTH_MAP = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const MONTH_MAP_TH = [
    "มกราคม ",
    "กุมภาพันธ์ ",
    "มีนาคม ",
    "เมษายน ",
    "พฤษภาคม ",
    "มิถุนายน ",
    "กรกฎาคม ",
    "สิงหาคม ",
    "กันยายน ",
    "ตุลาคม ",
    "พฤศจิกายน ",
    "ธันวาคม ",
];

export const DAY_MAP = Object.values(DAY_SHORT_EN);
export const getNumberOfDays = (year, month) => {
    return 40 - new Date(year, month, 40).getDate();
};

export const getDayDetails = args => {
    let date = args.index - args.firstDay; // มีโอกาสติดลบเพราะถ้า first day ไม่ใช่วันอาทิตย์ (0) ก็ะติดลบ
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    // ถ้าเดือนน้อยกว่ามกราก็ให้เป็นธันวา แล้วลบ year
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth); // จำนวนวันของเดือนที่แล้ว
    // หาว่าเป็นวันไหน เพราะ index  0-29 ถ้า index - จำนวนวันของเดือนก่อน < 0
    // ก็ให้ return จำนวลนวันของเดือนก่อน - วันที่ติดลบของปฏิทินนี้
    let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    // month จะมีแค่ 3 ค่า [-1 , 0 , 1]
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    // timestamp ที่ได้จะเป็น rounded day (ไม่มีชั่วโมง นาที วินาที มิลลิ)
    const realMonth = args.month + month;
    let timestamp = new Date(args.year, realMonth > 11 ? 0 : realMonth < 0 ? 11 : realMonth, _date).getTime();
    return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: DAY_MAP[day],
    };
};

export const getMonthDetails = (year, month) => {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month,
            });
            monthArray.push(currentDay);
            index++;
        }
    }
    return monthArray;
};

export const getWeekDetail = (selectedDay) => {


};
