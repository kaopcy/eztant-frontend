import Teacherdisplay from "./Teacherdisplay";

const Teacherdirectory =()=>{
    const data = [
        {NameTeacher:"ปิยชัย แก้วชุ่ม",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:"https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9"},

        {NameTeacher:"พิชชภา",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"นายน้อย",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"แหม่ม",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"ไก่กุ๊กๆ",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่2",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่3",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่4",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่5",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่6",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่7",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่8",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่9",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},

        {NameTeacher:"โคตรเท่0",
        FacTeacher:"คอมพิวเตอร์",
        ImgTeacher:'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gP_MEnX_hwgAX_m98sX&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT-Bn_bIjwjFWNiyGwXIb3VzsFRT2QwSYulUC6dhbLtunA&oe=62531BD9'},
    ]
    return(
        <div className="w-full min-h-screen bg-zinc-100 pb-[7%] px-[10%] ">
            <div className='flex justify-center flex-wrap '>{data.map (personalData => {
            return <Teacherdisplay NameTeachert {...personalData} key= {personalData.NameTeacher}/>
        })
            }
            </div>
        </div>
        
    );
}

export default Teacherdirectory