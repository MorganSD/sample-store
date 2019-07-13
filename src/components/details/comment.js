import React from 'react';
import noPhoto from "../../Icon Simplestore/noPhoto.png";



const Comments = (props) => {
    if (props.comment.answered_questions) {
      if (props.comment.answered_questions.length === 0) {
        return <p>نظری ثبت نشده است</p>;
      } else {
        return (
          <>
            {props.comment.answered_questions.map(comment => (
              <div className="comment-box">
                <img src={noPhoto} />
                <div>
                  <p>
                    <span>نام و نام خانوادگی</span>
                    <span>rate</span>
                  </p>
  
                  <div>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                    استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                    مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد.
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