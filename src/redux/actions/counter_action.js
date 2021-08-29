export const createIncrement = (value) => ({
  type: "add",
  data: value,
});

export const createDecrement = (value) => ({
  type: "jian",
  data: value,
});

export const createIncrementAsync = (value, delay) => {
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(createIncrement(value))
    },delay)
  }
};
