import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const About = (props) => {
    if (props.about === null || props.about === "") {
      return <p>اطلاعاتی درباره ی این محصول ثبت نشده است</p>;
    } else {
      return <div>{ReactHtmlParser(props.about)}</div>;
    }
  }
  export default About;