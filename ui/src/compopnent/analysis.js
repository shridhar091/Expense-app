import PieChart from "./pieChart"
import { useSelector } from "react-redux";

const Analysis = (props) =>{

    const userAccount = useSelector((state) => {
        return state.user.data;
      });
    
      const expenses = useSelector((state) => {
        return state.expense.data;
      });
    
      const totalBudgetUsed = expenses.reduce((pv, cv) => {
        return pv + cv.amount;
      }, 0);
    
      const { budget } = userAccount;
      const unUsedBudget = budget - totalBudgetUsed;

    return (
        <div>
            <PieChart spend={totalBudgetUsed} unUsed={unUsedBudget}/>
        </div>
    )
}

export default Analysis

