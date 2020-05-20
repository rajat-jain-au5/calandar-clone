import axios from "axios";


export const getCalendar = () =>
         axios.get(
           `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents`,
           {
             headers: { "x-auth-token": window.localStorage.getItem("token") },
           }
         );

export const addCalendar = (data) =>
         axios.post(
           `https://tranquil-spire-77716.herokuapp.com/calendar/add`,
           data,
           {
             headers: { "x-auth-token": window.localStorage.getItem("token") },
           }
         );

export const editCalendar = (data) =>
         axios.patch(
           `https://tranquil-spire-77716.herokuapp.com/getCalendarEvents/${data.id}`,
           data,
           {
             headers: { "x-auth-token": window.localStorage.getItem("token") },
           }
         );

export const deleteCalendar = (id) =>
         axios
           .delete(
             `https://tranquil-spire-77716.herokuapp.com/calendar/getCalendarEvents/${id}`,
             {
               headers: {
                 "x-auth-token": window.localStorage.getItem("token"),
               },
             }
           )
           .then((res) => console.log(res));
