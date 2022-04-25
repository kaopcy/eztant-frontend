const CommentCard = props => {
    const { data } = props;
    return (
        <>
            <div className="item-center mt-2 flex rounded-md px-2 py-3 2md:bg-white">
                <img src={data.pic} alt="user-proflie" className="ml-1/2 h-[55px] w-[55px] shrink-0 rounded-full object-cover"></img>
                <div className="ml-4  flex flex-col flex-wrap">
                    <div className="font-bold text-secondary">{data.name}</div>
                    <div className="break-all font-medium text-text">{data.comment}</div>
                </div>
            </div>
        </>
    );
};
export default CommentCard;
