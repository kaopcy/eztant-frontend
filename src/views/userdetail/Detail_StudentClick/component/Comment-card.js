const CommentCard = (props) => {
    const { data_user, data_comment } = props;
    return (
      <div className="bg-line rounded-md flex item-center px-2 py-3 mt-2">
        <img
          src={data_user.pic}
          alt="user-proflie"
          className="w-[55px] h-[55px] rounded-full shrink-0 ml-1/2 object-cover"
        ></img>
        <div className="ml-4  flex flex-col flex-wrap">
          <div className="text-secondary font-bold">{data_user.name}</div>
          <div className="text-text font-medium break-all">{data_comment}</div>
        </div>
      </div>
    );
  };
  export default CommentCard;