import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://localhost:9030/api/accounts";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [formData, setFormData] = useState({
    accountHolder: "",
    email: "",
    balance: ""
  });

  const [transaction, setTransaction] = useState({
    id: "",
    amount: ""
  });

  const [edit, setEdit] = useState(null);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setAccounts(res.data);
    } catch {
      toast.error("❌ Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const validateAccount = () => {
    if (!formData.accountHolder.trim()) return "Name required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid Email";
    if (formData.balance <= 0) return "Balance must be > 0";
    return null;
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const error = validateAccount();
    if (error) return toast.warning(error);

    try {
      await axios.post(API, formData);
      toast.success("✅ Account Created!");
      setFormData({ accountHolder: "", email: "", balance: "" });
      loadAccounts();
    } catch {
      toast.error("❌ Account creation failed");
    }
  };

  const deposit = async () => {
    if (!transaction.id || transaction.amount <= 0)
      return toast.warning("Enter valid Account ID & Amount");

    try {
      await axios.put(`${API}/${transaction.id}/deposit`, {
        amount: Number(transaction.amount),
      });
      toast.success("✅ Deposit Successful");
      setTransaction({ id: "", amount: "" });
      loadAccounts();
    } catch {
      toast.error("❌ Deposit failed");
    }
  };

  const withdraw = async () => {
    if (!transaction.id || transaction.amount <= 0)
      return toast.warning("Enter valid Account ID & Amount");

    try {
      await axios.put(`${API}/${transaction.id}/withdraw`, {
        amount: Number(transaction.amount),
      });
      toast.success("✅ Withdrawal Successful");
      setTransaction({ id: "", amount: "" });
      loadAccounts();
    } catch {
      toast.error("❌ Withdrawal failed — insufficient balance?");
    }
  };

  const deleteAccount = async (id) => {
    if (!window.confirm("Delete this account?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      toast.success("✅ Account Deleted");
      loadAccounts();
    } catch {
      toast.error("❌ Delete Failed");
    }
  };

  const updateAccount = async () => {
    if (!edit.accountHolder.trim()) return toast.warning("Name required");
    if (!/^\S+@\S+\.\S+$/.test(edit.email)) return toast.warning("Invalid Email");

    try {
      await axios.put(`${API}/${edit.id}`, edit);
      toast.success("✅ Updated Successfully");
      setEdit(null);
      loadAccounts();
    } catch {
      toast.error("❌ Update Failed");
    }
  };

  const filtered = accounts.filter((a) =>
    a.accountHolder.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a[sortField] > b[sortField] ? 1 : -1;
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const changeSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mt-4 mb-5 fadeIn">

      <ToastContainer position="top-right" theme="colored" />

      <h2 className="text-center fw-bold mb-4">🏦 Account Management System</h2>

      {/* ✅ Search */}
      <input
        type="text"
        placeholder="🔍 Search Account Holder"
        className="form-control mb-4 p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Create Account */}
      <div className="card p-4 mb-4 shadow-lg rounded-4 zoom">
        <h5 className="fw-semibold mb-3">Create New Account</h5>
        <form onSubmit={createAccount}>
          <div className="row gy-2">
            <div className="col-md-4 col-12">
              <input
                type="text"
                placeholder="Account Holder Name"
                required
                className="form-control py-2"
                value={formData.accountHolder}
                onChange={(e) =>
                  setFormData({ ...formData, accountHolder: e.target.value })
                }
              />
            </div>

            <div className="col-md-4 col-12">
              <input
                type="email"
                placeholder="Email"
                required
                className="form-control py-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="col-md-3 col-9">
              <input
                type="number"
                placeholder="Initial Balance"
                required
                className="form-control py-2"
                value={formData.balance}
                onChange={(e) =>
                  setFormData({ ...formData, balance: e.target.value })
                }
              />
            </div>

            <div className="col-md-1 col-3 d-grid">
              <button className="btn btn-primary fw-semibold">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ✅ Deposit / Withdraw */}
      <div className="card p-4 mb-4 shadow-lg rounded-4 zoom">
        <h5 className="fw-semibold mb-3">Deposit / Withdraw</h5>
        <div className="row gy-2">
          <div className="col-md-4 col-12">
            <input
              type="number"
              placeholder="Account ID"
              className="form-control py-2"
              value={transaction.id}
              onChange={(e) =>
                setTransaction({ ...transaction, id: e.target.value })
              }
            />
          </div>

          <div className="col-md-4 col-12">
            <input
              type="number"
              placeholder="Amount"
              className="form-control py-2"
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: e.target.value })
              }
            />
          </div>

          <div className="col-md-2 col-6 d-grid">
            <button className="btn btn-success fw-semibold" onClick={deposit}>
              Deposit
            </button>
          </div>

          <div className="col-md-2 col-6 d-grid">
            <button className="btn btn-warning fw-semibold" onClick={withdraw}>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Loading Spinner */}
      {loading && <div className="loading-spinner mx-auto my-3"></div>}

      {/* ✅ Accounts Table */}
      <div className="card p-3 shadow-lg rounded-4 zoom">
        <h5 className="fw-semibold mb-3">All Accounts</h5>

        {paginated.length === 0 ? (
          <div className="text-center p-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="empty"
              width="140"
            />
            <p className="mt-3 text-muted">No Accounts Found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th onClick={() => changeSort("id")} style={{ cursor: "pointer" }}>ID</th>
                  <th onClick={() => changeSort("accountHolder")} style={{ cursor: "pointer" }}>Account Holder</th>
                  <th>Email</th>
                  <th onClick={() => changeSort("balance")} style={{ cursor: "pointer" }}>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((acc) => (
                  <tr key={acc.id} className="fadeInUp">
                    <td>{acc.id}</td>
                    <td>{acc.accountHolder}</td>
                    <td>{acc.email}</td>
                    <td>₹ {acc.balance}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => setEdit(acc)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteAccount(acc.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Pagination */}
            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                className="btn btn-secondary"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              <span className="fw-semibold pt-2">{page} / {totalPages}</span>
              <button
                className="btn btn-secondary"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Edit Modal */}
      {edit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h5>Edit Account</h5>

            <input
              className="form-control my-2"
              value={edit.accountHolder}
              onChange={(e) => setEdit({ ...edit, accountHolder: e.target.value })}
            />

            <input
              className="form-control my-2"
              value={edit.email}
              onChange={(e) => setEdit({ ...edit, email: e.target.value })}
            />

            <button className="btn btn-success me-2" onClick={updateAccount}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEdit(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
