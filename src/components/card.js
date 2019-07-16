import React , {Component} from 'react';
import '../style/card.css';
import {connect} from 'react-redux';

class Card extends  Component {

    componentDidMount(){
        // if(this.props){}
    }
    notDispaly =() =>{
        if(this.props.cardDisplay){
           this.props.cardDisplayChange()
        }
    }
    render(){
        return(

            <section className='card-popUp' onClick={this.notDispaly}>
                <div onClick={this.closeCard}></div>
                <div className='card'>

                </div>
            </section>

        )
    }

}
const mapStateToProps = (state) =>{
    return { cardDisplay : state.cardDisplay}
}
const mapDispatchToProps = (dispatch) => {
    return {
    cardDisplayChange : () => {dispatch({type: 'CARD_DISPLAY'})}
    //   setUser : () => {dispatch({type : 'INIT_LOGIN_USER'})}
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Card);
