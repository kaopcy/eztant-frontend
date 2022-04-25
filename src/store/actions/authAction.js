import { REQUEST_LOGIN, REQUEST_LOGIN_FAILURE, REQUEST_LOGIN_SUCCESS, LOGOUT, VIEW_NOTIFICATION } from "./type";
import * as api from "../../api/authApi";
import { v4 as uuid } from "uuid";

export const login = (userinput, cb) => async dispatch => {
    console.log("fetching...");
    const { email, password } = userinput;
    try {
        dispatch({ type: REQUEST_LOGIN });
        const { data } = await api.fetchUser({ email, password });
        const user = data.results[0] || null;
        if (!user) throw new Error();

        const shapedUser = {
            ...user,
            id: "oiawdjaiojdoadoawdjoiawdjoadjioajdiowa",
            role: user.name.first === "Tobias" ? "teacher" : "student",
            imgURL: user.picture.large,
            studentID: "6310604",
            firstname: "ปิยชัย",
            lastname: "แก้วชุ่ม",
            department: "computer",
            notification: [
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "พรหมพิริยะ",
                    type: "all",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "พรหมพิริยะ",
                    type: "post",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "พรหมพิริยะ",
                    type: "post",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "พรหมพิริยะ",
                    type: "post",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "พรหมพิริยะ",
                    type: "all",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ไกไฟก",
                    type: "all",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ไกไฟก",
                    type: "community",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ไกไฟก",
                    type: "community",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ไกไฟก",
                    type: "community",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ไกไฟก",
                    type: "community",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
                {
                    id: uuid(),
                    isWatched: true,
                    firstname: "ฟไกไฟ",
                    type: "all",
                    lastname: "เจริญพานทองดี",
                    created_at: new Date(2022, 3, 22).getTime(),
                    imgURL: "https://i.pravatar.cc/300",
                    body: "สมัครโพสต์ของคุณ",
                },
            ],
            community: [
                {
                    id: "123465",
                },
                {
                    id: "23131",
                },
                {
                    id: "124124",
                },
            ],
            transcript: [
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 4,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 4,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 4,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 4,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 2,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 2,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 1,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 2,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 2,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 2,
                    studySemestry: 1,
                    grade: 'A',
                },
                {
                    subjectID: '0100123',
                    subjectName: 'DATA COMMUNICATION',
                    studyYear: 2,
                    studySemestry: 2,
                    grade: 'A',
                },
            ]
        };

        localStorage.setItem("user", JSON.stringify(shapedUser));
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: shapedUser });
        if (cb) cb();
    } catch (error) {
        dispatch({ type: REQUEST_LOGIN_FAILURE });
        console.log(error.message);
    }
};

export const logout = () => {
    localStorage.clear("user");
    return { type: LOGOUT };
};

export const viewNotification = ()=>{
    return { type: VIEW_NOTIFICATION }
}
