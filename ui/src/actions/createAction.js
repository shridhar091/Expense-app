import axios from "axios";
import { toast } from "react-toastify";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORY = "SET_CATEGORY";
export const REMOVE_CATEGORY='REMOVE_CATEGORY'

const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: category,
  };
};

const setCategory = (catageory) => {
  return {
    type: SET_CATEGORY,
    payload: catageory,
  };
};

const removeCategory=(category)=>{
  return{
    type:REMOVE_CATEGORY,
    payload:category
  }
}

export const startAddCategory = (formData) => {
  return (dispatch) => {
    (async () => {
      const newCategory = await axios.post(
        "http://localhost:3091/user/category",
        formData,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      console.log(newCategory.data);
      if (newCategory.data._id) {
        toast.success('Category Added succesfully', {
          position: "top-right",
          autoClose: 1000,
          theme: "colored"
          });
        dispatch(addCategory(newCategory.data));
      } else if (newCategory.data?.keyValue) {
        alert("category already exist");
      }
    })();
  };
};

export const startGetUserCatagory = () => {
  return (dispatch) => {
    (async () => {
      try {
        const category = await axios.get(
          "http://localhost:3091/user/category",
          { headers: { authorization: localStorage.getItem("token") } }
        );
        // console.log(category.data,"ft4ft")
        dispatch(setCategory(category.data));
      } catch (err) {
        // alert(err.message);
        console.log(err,'err-user-catagory')
      }
    })();
  };
};

export const startRemoveCatageory=(id)=>{
  return(dispatch)=>{
    (
      async()=>{
        const data= await Promise.all([
          axios.delete(`http://localhost:3091/user/category/${id}`, { headers: { authorization: localStorage.getItem("token") } }),
          axios.delete(`http://localhost:3091/user/expenses/${id}`, { headers: { authorization: localStorage.getItem("token") } })
        ])
        const catageoryData=data[0]
        dispatch(removeCategory(catageoryData.data))
      }
    )()
  }
}

