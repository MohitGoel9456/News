import { HOME_ACTIONS } from "./actionTypes";

const helloMessage = () => ({
    type: HOME_ACTIONS.SEND_HELLO_MESSAGE,
    payload: "Hi this is from Redux."
})

export const fetchHelloMessage = () => (dispatch) => {
    dispatch({
        type: HOME_ACTIONS.SEND_HELLO_MESSAGE,
        payload: "Hi this is from Redux."
    })
}