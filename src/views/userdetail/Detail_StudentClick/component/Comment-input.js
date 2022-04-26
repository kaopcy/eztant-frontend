import { useState, useEffect } from "react";

const Comment_Input = props => {
    const [datacomment, setComment] = useState("");
    const [formvalid, setformvalid] = useState(false);
    const { data } = props;
    const inputComment = event => {
        setComment(event.target.value);
    };
    const saveItem = event => {
        event.preventDefault();
        props.onAddItem(datacomment);
        setComment("");
    };
    useEffect(() => {
        const checkData = datacomment.trim().length > 0;
        setformvalid(checkData);
    }, [datacomment]);
    
    return (
        <div className="mt-10">
            <div className="font-bold text-text">คอมเมนท์ TA '{data.name}'</div>
            <form onSubmit={saveItem} className="flex flex-col">
                <textarea
                    className="flex-con-row border-line mt-3 h-[100px] w-[360px] resize-none rounded-md border-2 border-solid p-3 font-medium text-text outline-none lg:w-[400px] xl:w-[500px]"
                    onChange={inputComment}
                    value={datacomment}></textarea>
                <button
                    disabled={!formvalid}
                    type="submit"
                    className="hover:text-white right-0 mt-3 h-8 w-28 self-end rounded-md border-secondary text-secondary hover:border-none hover:bg-secondary">
                    คอมเมนท์
                </button>
            </form>
        </div>
    );
};

export default Comment_Input;
