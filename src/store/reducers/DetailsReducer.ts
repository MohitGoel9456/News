import { HOME_ACTIONS } from "store/actions/actionTypes"

const initialState = {
    messaage: '',

}

export const DetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case HOME_ACTIONS.SEND_HELLO_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}