import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {errorMessage: action.payload}
        case 'fetchData':
            return {user: action.payload.user, squad: action.payload.squad, errorMessage: ""}
        default: state
    }
}

const fetchData = (dispatch) => {
    return async () => {
        try {
            const userResponse = await trackerApi.get("/user");  
            const squadResponse = await trackerApi.get("/squad", {
                params: { squadName: userResponse.data.squad },
            });
            dispatch({ type: "fetchData", payload: {user: userResponse.data, squad: squadResponse.data}})
        } catch (err) {
            console.log(err)
            dispatch({
                type: "add_error",
                payload: "Something went wrong with fetching",
            });
        }
    };
  };

export const {Provider, Context} = createDataContext(
    dataReducer,
    {fetchData},
    {user: null, squad: null, errorMessage: ''}
)