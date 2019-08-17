import React from 'react';
import noPhoto from "../../Icon Simplestore/noPhoto.png";
import Rate from '../rate';;


const Comments = (props) => {
    if (props.comment.rates) {
      if (props.comment.rates.length < 1) {
        return <p>نظری ثبت نشده است</p>;
      } else {
        return (
          <>
            {props.comment.rates.map(c => (
              <div className="comment-box">
                <div>
                  <p>
                    <span>{c.user.first_name} </span>
                    <span className='user_rate'><Rate product={c}/></span>
                  </p>
  
                  <div>
                   {c.comment}
                  </div>
                </div>
              </div>
            ))}
          </>
        );
      }
    }
  }
  export default Comments;