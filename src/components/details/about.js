import React from 'react';

const About = (props) => {
    if (props.about === null || props.about === "") {
      return <p>اطلاعاتی درباره ی این محصول ثبت نشده است</p>;
    } else {
      return <div>{props.about}</div>;
    }
  }
  export default About;