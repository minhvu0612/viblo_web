

import "./cmt.scss";

function Cmt(props){

    return (
        <div className="cmt">
            <img src={props.val.avatar} alt="avatar" className='avt--cmt' />
            <div className="cmt--content">
                {
                    (props.val.username === localStorage.getItem("username")) ? (
                        <p className="cmt-u">Bạn</p>
                    ):(
                        <p className="cmt-u">{props.val.username}</p>
                    )
                }
                <p>{props.val.content}</p>
            </div>
        </div>
    );
}

export default Cmt;