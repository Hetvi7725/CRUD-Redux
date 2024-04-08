import { ADD_RECORD, DELETE_RECORD, GET_RECORD, UPDATE_RECORD } from "../Action";

const initialvalue={
    pro: []
}

const Crudreducer = (state=initialvalue , action)=>{
    switch(action.type){
        case ADD_RECORD :
            return{
                ...state , pro : [...state.pro,action.payload]
            }
        case DELETE_RECORD :
            return{
                ...state , pro : state.pro.filter((v,i)=>v.id!=action.payload)
            }
        case UPDATE_RECORD :
            return{
                ...state ,pro : state.pro.map((v,i) => v.id == action.payload.id ? {...v, image:action.payload.image , title:action.payload.title , price:action.payload.price , oprice:action.payload.oprice ,description:action.payload.description}:v)
            }
        case GET_RECORD : 
            return state;
        default : 
            return state;
    }
}

export default Crudreducer;