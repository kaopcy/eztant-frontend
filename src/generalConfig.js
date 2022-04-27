export const DEPARTMENT_LINK = [
    {
        name: "รวมทุกภาควิชา",
        engName: "All Department",
        to: "/post-list/all-department",
    },
    {
        name: "การเกษตร",
        engName: "Agricultural",
        to: "/post-list/agricultural",
    },
    {
        name: "คอมพิวเตอร์",
        engName: "Computer",
        to: "/post-list/computer",
    },
    {
        name: "เคมี",
        engName: "Chemistry",
        to: "/post-list/chemistry",
    },
    {
        name: "เครื่องกล",
        engName: "Mechanical",
        to: "/post-list/mechanical",
    },
    {
        name: "อุตสาหการ",
        engName: "Industial",
        to: "/post-list/industial",
    },
    {
        name: "ชีวการแพทย์",
        engName: "Biomedical",
        to: "/post-list/biomedical",
    },
    {
        name: "โทรคมนาคม",
        engName: "Telecommunications",
        to: "/post-list/telecommunications",
    },
    {
        name: "ไฟฟ้า",
        engName: "Electrical",
        to: "/post-list/electrical",
    },
    {
        name: "โยธา",
        engName: "Civil",
        to: "/post-list/civil",
    },
    {
        name: "อาหาร",
        engName: "Food",
        to: "/post-list/food",
    },
    {
        name: "อิเล็กโทรนิคส์",
        engName: "Electronic",
        to: "/post-list/electronic",
    },
];

export const SORT_TYPE = [
    {
        label: "ตามชื่อผู้สอน",
        value: "owner_id.firstname",
    },
    {
        label: "ชั้นปีที่รับ",
        value: "requirement_year",
    },
    {
        label: "ตามจำนวนเงิน",
        value: "wage",
    },
    {
        label: "ตามชื่อวิชา",
        value: "subject_name",
    },
    {
        label: "ตามรหัสวิชา",
        value: "subject_id",
    },
];

export const DAY_COLOR = {
    sunday: "#FF1B1B",
    monday: "#FFE600",
    tuesday: "#F72FB4",
    wednesday: "#48A847",
    thursday: "#FB4214",
    friday: "#0065fb",
    saturnday: "#6600ce",
};

export const DAY_SHORT_TH = {
    sunday: "อา.",
    monday: "จ.",
    tuesday: "อ.",
    wednesday: "พ.",
    thursday: "พฤ.",
    friday: "ศ.",
    saturnday: "ส.",
};

export const DAY_FULL_TH = {
    sunday: "อาทิตย์",
    monday: "จันทร์",
    tuesday: "อังคาร",
    wednesday: "พุธ",
    thursday: "พฤหัส",
    friday: "ศุกร์",
    saturnday: "เสาร์",
};

export const DAY_SHORT_EN = {
    sunday: "SUN",
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturnday: "SAT",
};

export const GRADE_LIST = ["S", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

export const ORDER_TYPE = [
    {
        label: "น้อยไปมาก",
        value: "ascending",
    },
    {
        label: "มากไปน้อย",
        value: "descending",
    },
];

export const POSTS = [
    {
        author: "พรหมพิริยะ เจริญพานทองดี",
        department: "คอมพิวเตอร์",
        subjectName: "DATA STRUCTURE & ALGORYTHM",
        subjectID: "0100123",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/400",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_to: "09:00",
                time_from: "20:00",
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100124",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/399",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_to: "09:00",
                time_from: "20:00",
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100125",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",

        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_to: "09:00",
                time_from: "20:00",
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100126",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",

        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_to: "09:00",
                time_from: "20:00",
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100127",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",

        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
            },
        ],
    },
];

// Post with requset list
export const REQUEST_LIST = [
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100127",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "thursday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [],
            },
            {
                section: "102",
                max_ta: "2",
                day: "thursday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                            evidenceURL:
                                "https://c.tenor.com/1Of-DpNBmgsAAAAd/%E0%B8%9B%E0%B8%B5%E0%B9%82%E0%B8%9B%E0%B9%89-%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B8%94%E0%B8%8A%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B8%9B%E0%B8%B5%E0%B9%82%E0%B8%9B%E0%B9%89.gif",
                        },
                        is_accepted: false,
                    },
                    {
                        user: {
                            studentID: 63010648,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "พรหมพิริยะ",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: true,
                    },
                    {
                        user: {
                            studentID: 63010679,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "พิชชาภา",
                            lastname: "เวียงทอง",
                        },
                        is_accepted: false,
                    },
                    {
                        user: {
                            studentID: 63010467,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ธีรภัทร",
                            lastname: "เกตุสิงห์น้อย",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "103",
                max_ta: "2",
                day: "wednesday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "104",
                max_ta: "2",
                day: "friday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100127",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                    {
                        user: {
                            studentID: 63010648,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "พรหมพิริยะ",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: true,
                    },
                    {
                        user: {
                            studentID: 63010679,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "พิชชาภา",
                            lastname: "เวียงทอง",
                        },
                        is_accepted: false,
                    },
                    {
                        user: {
                            studentID: 63010467,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ธีรภัทร",
                            lastname: "เกตุสิงห์น้อย",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100127",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
        ],
    },
    {
        author: "ปิยชัย แก้วชุ่ม",
        department: "คอมพิวเตอร์",
        subjectName: "DATA COMMUNICATION",
        subjectID: "0100127",
        wage: "600",
        year: ["2", "3", "4"],
        minGrade: "B+",
        authorAvatar: "https://i.pravatar.cc/398",
        requirement: "-เก้าโคตรเท่\n-เก้าโคตรคูล\n-เก้าโคตรเจ๋ง\n-เก้าโคตรแจ๋ว\n-เก้าโคตร\n-เก้าโคตรเท่\n-เก้าโคตรเท่\n",
        duty: "เก็บขยะ",
        tables: [
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
            {
                section: "101",
                max_ta: "2",
                day: "monday",
                time_from: "09:00",
                time_to: "20:00",
                requested: [
                    {
                        user: {
                            studentID: 63010604,
                            imgURL: "https://i.pravatar.cc/300",
                            firstname: "ปิยชัย",
                            lastname: "แก้วชุ่ม",
                        },
                        is_accepted: false,
                    },
                ],
            },
        ],
    },
];

export const COMMUNITY = {
    author: "ปิยชัย แก้วชุ่ม",
    department: "คอมพิวเตอร์",
    subjectName: "DATA COMMUNICATION",
    subjectID: "0100127",
    wage: "600",
    year: ["2", "3", "4"],
    minGrade: "B+",
    authorAvatar: "https://i.pravatar.cc/398",
    tables: [
        {
            section: "101",
            max_ta: "2",
            day: "thursday",
            time_from: "09:00",
            time_to: "20:00",
            requested: [],
        },
        {
            section: "102",
            max_ta: "2",
            day: "thursday",
            time_from: "09:00",
            time_to: "20:00",
            requested: [
                {
                    user: {
                        studentID: 63010604,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "ปิยชัย",
                        lastname: "แก้วชุ่ม",
                        evidenceURL:
                            "https://c.tenor.com/1Of-DpNBmgsAAAAd/%E0%B8%9B%E0%B8%B5%E0%B9%82%E0%B8%9B%E0%B9%89-%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B8%94%E0%B8%8A%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B4%E0%B8%99%E0%B8%9B%E0%B8%B5%E0%B9%82%E0%B8%9B%E0%B9%89.gif",
                    },
                },
                {
                    user: {
                        studentID: 63010648,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "พรหมพิริยะ",
                        lastname: "แก้วชุ่ม",
                    },
                },
                {
                    user: {
                        studentID: 63010679,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "พิชชาภา",
                        lastname: "เวียงทอง",
                    },
                },
                {
                    user: {
                        studentID: 63010467,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "ธีรภัทร",
                        lastname: "เกตุสิงห์น้อย",
                    },
                },
            ],
        },
        {
            section: "103",
            max_ta: "2",
            day: "wednesday",
            time_from: "09:00",
            time_to: "20:00",
            requested: [
                {
                    user: {
                        studentID: 63010604,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "ปิยชัย",
                        lastname: "แก้วชุ่ม",
                    },
                },
            ],
        },
        {
            section: "104",
            max_ta: "2",
            day: "friday",
            time_from: "09:00",
            time_to: "20:00",
            requested: [
                {
                    user: {
                        studentID: 63010604,
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "ปิยชัย",
                        lastname: "แก้วชุ่ม",
                    },
                },
            ],
        },
    ],
    posts: [
        {
            id: "1231231313131312341231",
            created_at: new Date(2022, 3, 22, 1),
            body: "ให้นักเรียนทุกคนมาประชุมตอน 18.00 น. @everyone",
            user: {
                imgURL: "https://i.pravatar.cc/300",
                firstname: "ปิยชัย",
                lastname: "แก้วชุ่ม",
                role: "teacher",
            },
            comments: [
                {
                    id: "123109381093812",
                    created_at: new Date(2022, 3, 20, 18),
                    body: "ที่ไหนคะไอสัส",
                    user: {
                        imgURL: "https://i.pravatar.cc/300",
                        firstname: "พิชชาภา",
                        lastname: "เวียงทอง",
                        role: "student",
                    },
                },
            ],
        },
    ],
};

export const DEPARTMENT_MAP = {
    'All Department': "รวมทุกภาควิชา",
    Agricultural: "การเกษตร",
    Computer: "คอมพิวเตอร์",
    Chemistry: "เคมี",
    Mechanical: "เครื่องกล",
    Industial: "อุตสาหการ",
    Biomedical: "ชีวการแพทย์",
    Telecommunications: "โทรคมนาคม",
    Electrical: "ไฟฟ้า",
    Civil: "โยธา",
    Food: "อาหาร",
    Electronic: "อิเล็กโทรนิคส์",
};
