import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAccount, startAddBudget } from "../actions/userAction";
import { startRemoveCatageory } from "../actions/createAction";
import DeletedExpense from "./deletedExpence";

const Setting = (props) => {
  const dispatch = useDispatch();
  const [addBudget, setAddBudget] = useState("");

  useEffect(() => {
    dispatch(getUserAccount());
  }, [dispatch]);

  const userAccount = useSelector((state) => {
    return state.user.data;
  });

  const expenses = useSelector((state) => {
    return state.expense.data || []
  });

  const totalBudgetUsed =
    expenses.reduce((pv, cv) => {
      return pv + cv.amount;
    },0);
  

  const { budget } = userAccount;
  const unUsedBudget = budget - totalBudgetUsed;

  const formData = {
    budget: addBudget,
  };

  const handleBudget = (e) => {
    e.preventDefault();
    dispatch(startAddBudget(formData));
  };

  const categories = useSelector((state) => {
    return state.catageory.data ||[];
  });

  const handleDeleteCategory = (id) => {
    dispatch(startRemoveCatageory(id));
  };

  return (
    <div>
      <label>Add Amount</label>
      <br />
      <input
        type="Number"
        placeholder="Add you Amount"
        value={addBudget}
        onChange={(e) => {
          setAddBudget(e.target.value);
        }}
      />
      <button onClick={handleBudget}>Add Amount</button>
      <br />
      <hr />
      <div className="card " style={{ width: "400px" }}>
        <div className="card-body">
          <h1>Account details</h1>
          <h2>Total Amount- {userAccount.budget} </h2>
          <h3>Spend Amount-{totalBudgetUsed}</h3>
          <h3>Remaning Amount-{unUsedBudget}</h3>
        </div>
      </div>
      <div>
        <DeletedExpense />
      </div>
      <div className="col-md-3 my-5 card shadow">
        <h4>Listing Categories - {categories.length}</h4>
        <ul className="list-group">
          {categories &&
            categories.map((ele) => {
              return (
                <li
                  className="list-group-item list-group-item-secondary"
                  key={ele._id}
                >
                  {ele.name}-{" "}
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      handleDeleteCategory(ele._id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default Setting;


