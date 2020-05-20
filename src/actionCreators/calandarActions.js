import axios from "axios";


export const getCalendar = () => 
  axios.get(`/calendar/getCalendarEvents`, {
    headers: { "x-auth-token":window.localStorage.getItem("token")  },
  });

export const addCalendar = (data) => 
  axios.post(`/calendar/add`, data, {
    headers: { "x-auth-token": window.localStorage.getItem("token") },
  });

export const editCalendar = (data) => 
  axios.patch(
    `/getCalendarEvents/${data.id}`,
    data,
    {
      headers: { "x-auth-token": window.localStorage.getItem("token") },
    }
  );

export const deleteCalendar = (id) => 
  axios
    .delete(`/calendar/getCalendarEvents/${id}`, {
      headers: { "x-auth-token": window.localStorage.getItem("token") },
    })
    .then((res) => console.log(res));
