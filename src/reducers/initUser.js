import axios from '../axios';


const initialState =  {
   
     cardDisplay : false,
     currentUser : [],
     cardProduct :[]
}

const InitUserReducer = (state = initialState, action) => {

     switch(action.type) {
          case 'INIT_GUEST': {
               axios.post("/profiles/guest/").then(res => {
                    localStorage.setItem("jwtToken", JSON.stringify(res.data.data))  
               })
               let guset = JSON.parse(localStorage.getItem('jwtToken')) 
               return {
                    ...state,
                    currentUser : guset
               
               }
          }
            
          case 'INIT_LOGIN_USER':
           {
               return {
                    ...state,
                    currentUser : JSON.parse(localStorage.getItem('jwtToken')) 
               }  
           }
          case 'CARD_DISPLAY':
               {
                    const display = !state.cardDisplay
     return {
          ...state,
          cardDisplay : display

     }
          }
            
          default:
            return state;
        }



//   if (action.type === "INIT_GUEST") {
//           axios.post("/profiles/guest/").then(res => {
//           localStorage.setItem("jwtToken", JSON.stringify(res.data.data))  
//      })
//      let guset = JSON.parse(localStorage.getItem('jwtToken')) 
//      return {
//           ...state,
//           currentUser : guset
     
//      }
// }else if (action.type === 'INIT_LOGIN_USER'){
//      return {
//           ...state,
//           currentUser : JSON.parse(localStorage.getItem('jwtToken')) 
//      }
// }else if (action.type === 'CARD_DISPLAY'){
//      const display = !state.cardDisplay
//      return {
//           ...state,
//           cardDisplay : display

//      }
// }


// return state;
}

export default InitUserReducer;
