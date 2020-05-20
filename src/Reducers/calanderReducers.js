const intialState = {
  allevents: [],
  redirect: false,
};

export default function (state = intialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "GET_EVENTS":
    case "ADD_EVENTS":
      stateCopy.allevents = action.payload;
      console.log(stateCopy.allevents)
      return stateCopy;
    case "UPDATE_POST":
      stateCopy.redirect = true;
      return stateCopy;
    case "Event_delete":
      stateCopy.allevents = stateCopy.allevents.filter(
        (el) => el._id !== action.payload.data
      );
      stateCopy.redirect = true;
      console.log(stateCopy);
      return stateCopy;

    default:
      return stateCopy;
  }
}
