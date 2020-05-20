import axios from "axios";

export function getCalendar(data){
  // console.log(data)
  return {
    type:"GET_EVENTS",
    payload:data.data
  }
}
// export const getCalendar = () =>
//   axios.get(
//     `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents`,
//     {
//       headers: {
//         "x-auth-token": window.localStorage.getItem("token"),
//       },
//     }
//   );
//  .then((res) => console.log(res));



// export const addCalendar = (data) =>
//   axios.post(`https://tranquil-spire-77716.herokuapp.com/calendar/add`, data, {
//     headers: {
//       "x-auth-token": window.localStorage.getItem("token"),
//     },
//   });

// export const editCalendar = (data) =>
//   axios.post(
//     `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents/${data.id}`,
//     data,
//     {
//       headers: {
//         "x-auth-token": window.localStorage.getItem("token"),
//       },
//     }
//   );
export function editCalendar(data) {
  console.log(data)
  let request = axios({
    method: "POST",
    url: `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents/${data.id}`,
    data: data,
    headers: {
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch) => {
    request.then((res) => {
      console.log(res);
      return dispatch({
        type: "UPDATE_POST",
        payload: res.data.events,
      });
    });
  };
}
export function addCalendar(data){
  return function (dispatch) {
    return axios
      .post(
        "https://tranquil-spire-77716.herokuapp.com/calendar/add",
        data,
        {
          headers: {
            "x-auth-token": window.localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        // console.log(data);
        dispatch(add(data));
      });
  };
}
function add(data) {
  return {
    type: "ADD_EVENTS",
    payload: data.data,
  };
}
export function deleteCalendar(id) {
  return function (dispatch) {
     return axios
       .delete(`https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents/${id}`, {
         headers: {
           "x-auth-token": window.localStorage.getItem("token"),
         },
       })
       .then(({ data }) => {
        //  console.log(data);
         dispatch(deleteEvent(data));
       });
   };
};
function deleteEvent(data){
  return{
    type:"Event_delete",
    payload:data
  }
}

// https://tranquil-spire-77716.herokuapp.com
