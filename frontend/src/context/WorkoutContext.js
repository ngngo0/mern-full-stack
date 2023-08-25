import { createContext, useReducer } from "react"

//creates a new context and export it
export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) =>{
    switch(action.type){
        case 'SET_WORKOUTS':
            //return new value that we want the state to be
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                //adding a new wokrout obj to the array
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state

    }
}
//children is the stuff getting wrapped, which is app
export const WorkoutsContextProvider = ({children}) =>{

    const[state, dispatch] = useReducer(workoutsReducer, {
        workouts:null
    })

    return(
        //value prop is the thing that 
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}