import React from 'react';

const Technical = (props) => {
    if (props.tech.data) {
      if (props.tech.data.length === 0) {
        return <p>مشخصاتی درباره این محصول ثبت نشده است</p>;
      } else {
        return (
          <table>
            <tbody>
              {props.tech.data.map(data => (
                <tr key={data.slug}>
                  <td>{data.title}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    } else {
      return <p>مشخصاتی درباره این محصول ثبت نشده است</p>;
    }
  }
  export default Technical;