console.log("Action - Redux")

const redux=require('redux')
const reduxLogger=require('redux-logger')
const createStore=redux.createStore
const combineReducer=redux.combineReducers
const applyMiddleware=redux.applyMiddleware

const logger=reduxLogger.createLogger()

const BUY_CAKE='BUY_CAKE'
const GIVE_CAKE='GIVE_CAKE'
const BUY_ICE='BUY_ICE'
const GIVE_ICE='GIVE_ICE'

//Create an action
//An action is an object with 'type' property
//Action creator is a function that return  object
function buyCake(){
    return {
        type:BUY_CAKE,
        info: "First action"
    }
}
function giveCake(){
    return {
        type:GIVE_CAKE,
        info: "First action"
    }
}

function buyIce(){
    return {
        type:BUY_ICE,
        info: "First action"
    }
}

function giveIce(){
    return {
        type:GIVE_ICE,
        info: "First action"
    }
}
//reducer 
//(prevState,action)=>newState
const initialCakeState={
    numOfCakes:10
}
const initialIceState={
    numOfIce:12
}

const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes:state.numOfCakes-1
        }
        case GIVE_CAKE:return{
            ...state,
            numOfCakes:state.numOfCakes+1
        }
        default: return state
    }
}



const iceReducer=(state=initialIceState,action)=>{
    switch(action.type){
        case BUY_ICE: return{
            ...state,
            numOfIce:state.numOfIce-1
        }
        case GIVE_ICE:return{
            ...state,
            numOfIce:state.numOfIce+1
        }
        default: return state
    }
}


//combine the reducers 
const rootReducer=combineReducer({
    cake:cakeReducer,
    ice:iceReducer
})

const store=createStore(rootReducer,applyMiddleware(logger))
console.log(store.getState())
const unsubscribe=store.subscribe(()=>console.log("update Cake",store.getState().cake.numOfCakes,"update Ice",store.getState().ice.numOfIce))
store.dispatch(buyCake())
store.dispatch(giveCake())
store.dispatch(giveCake())
store.dispatch(buyIce())
store.dispatch(giveIce())
store.dispatch(giveIce())
store.dispatch(giveIce())
unsubscribe()

