import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startEditUserExpense } from "../actions/expenseAction";


const EditForm = (props) => {
    const { editData } = props;

    const { note: n, date: d, amount: a } = editData;
    const dispatch=useDispatch()
    const [btnClicked, setBtnClicked] = useState(false)
    const [note, setNote] = useState(n);
    const [date, setDate] = useState(d);
    const [amount, setAmount] = useState(a);

    const formData ={
        note:note,
        date:date,
        amount:amount
    }

    const handleSubmit = () => {
        dispatch(startEditUserExpense(formData,editData._id))
        setBtnClicked(!btnClicked)
    };

    return (
        <div className="container" border='1'>
            <hr />
            <h3>Make your changes on your specific expense:</h3>
            <hr />
            <center>
            <form onSubmit={handleSubmit} style={{width:'300px'}} >
                
                <div className="mb-3" >
                    <label htmlFor="note" className="form-label">Note</label>
                    <input
                        type="text"
                        className="form-control"
                        id="note"
                        placeholder="Note"
                        value={note}
                        onChange={(e) => { setNote(e.target.value) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            </center>
        </div>
    );
};

export default EditForm;
