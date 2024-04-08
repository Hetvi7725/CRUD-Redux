import {createStore} from 'redux';
import Crudreducer from './Reducer/Crudreducer';

const store = createStore(Crudreducer);

export default store;