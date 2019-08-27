import React, { Component } from 'react';

class Pagination extends Component {
    render(){
      // console.log('page count',this.props.list.page_count)
      const diActive = {
        display : 'none'
      }
  
    if(this.props.list.page_count > 1){
      if(this.props.list.current_page === 1){
        return (
          <div className="pagination">
          <div onClick={() =>{this.props.increase(this.props.list.next)}}>بعدی</div>
          <span>صفحه {this.props.list.current_page}</span>
          <div onClick={() => {this.props.decrease(this.props.list.previous)}} style={diActive}>قبلی</div>
        </div>
        )
      }else if(this.props.list.current_page == this.props.list.page_count){
          return (
            <div className="pagination">
            <div onClick={() =>{this.props.increase(this.props.list.next)}} style={diActive}>بعدی</div>
            <span>صفحه {this.props.list.current_page}</span>
            <div onClick={() => {this.props.decrease(this.props.list.previous)}}>قبلی</div>
          </div>
          )
      }else {
        return (
          <div className="pagination">
          <div onClick={() =>{this.props.increase(this.props.list.next)}}>بعدی</div>
          <span>صفحه {this.props.list.current_page}</span>
          <div onClick={() => {this.props.decrease(this.props.list.previous)}}>قبلی</div>
        </div>
        )
      }
    }else{
      return null
    }
  }
  }
  export default Pagination;