import { UPDATE_RECORD ,ADD_RECORD, DELETE_RECORD, GET_RECORD} from "../Action";

export const addrecord=(Record)=>{
    return{
        type : ADD_RECORD,
        payload : Record
    }
}

export const getrecord=()=>{
    return{
        type : GET_RECORD,
    }
}

export const deleterecord=(id)=>{
    return{
        type : DELETE_RECORD,
        payload : id,
    }
}

export const updateRecord=(obj)=>{
    return{
        type : UPDATE_RECORD,
        payload:obj
    }
}