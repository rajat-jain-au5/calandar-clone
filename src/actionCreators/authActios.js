import axios from "axios";

//check token and load user

export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: "USER_LOADING" });

  //get token

  axios
    .get(
      "https://tranquil-spire-77716.herokuapp.com/user",
      tokenConfig(getState)
    )

    .then((res) => {
      //     console.log(res)
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "AUTH_ERROR",
      });
    });
};

export function registerUser(user) {
  console.log(user);
  let request = axios({
    method: "POST",
    url: "https://tranquil-spire-77716.herokuapp.com/register",
    data: user,
  });
  return (dispatch) => {
    request
      .then((res) => {
        console.log(res);
        return dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {

        dispatch({
          type: "REGISTER_FAIL",
        });
      });
  };
}

export function loginUser(user) {
  let request = axios({
    method: "POST",
    url: "https://tranquil-spire-77716.herokuapp.com/login",
    data: user,
  });
  return (dispatch) => {
    request
      .then((res) => {
        console.log(res);
         localStorage.setItem("token", res.data.token);
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
       

        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
}

export function logoutUser() {
  return {
    type: "LOGOUT_SUCCESS",
  };
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
 

  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
