import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

const emptyForm = { name: '', email: '', position: '', department: '', salary: '' };

export default function Dashboard() {
  const { token, user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEmployees = async () => {
    try {
      setEmployees(await api('/api/employees', { token }));
    } catch (err) {
      if (err.message.toLowerCase().includes('token')) logout(); // token expired, log the user out
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEmployees(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => { setForm(emptyForm); setEditId(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const body = { ...form, salary: Number(form.salary) || 0 };
    try {
      if (editId) {
        await api(`/api/employees/${editId}`, { method: 'PUT', body, token });
      } else {
        await api('/api/employees', { method: 'POST', body, token });
      }
      resetForm();
      loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setForm({
      name: emp.name,
      email: emp.email,
      position: emp.position,
      department: emp.department,
      salary: emp.salary,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api(`/api/employees/${id}`, { method: 'DELETE', token });
      loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = employees.filter((e) =>
    `${e.name} ${e.department} ${e.position}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h2>Hi, {user?.name} 👋</h2>
        <button className="secondary" onClick={logout}>Logout</button>
      </header>

      <form className="card" onSubmit={handleSubmit}>
        <h3>{editId ? 'Edit Employee' : 'New Employee'}</h3>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="position" placeholder="Position (e.g. Developer)" value={form.position} onChange={handleChange} required />
        <input name="department" placeholder="Department (e.g. IT)" value={form.department} onChange={handleChange} required />
        <input name="salary" type="number" min="0" placeholder="Salary" value={form.salary} onChange={handleChange} />
        <button>{editId ? 'Update Employee' : 'Add Employee'}</button>
        {editId && <button type="button" className="secondary" onClick={resetForm}>Cancel</button>}
      </form>

      <input
        className="search"
        placeholder="Search (name, department, position)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && employees.length === 0 && <p>No employees yet. Add your first employee!</p>}
      {!loading && employees.length > 0 && filtered.length === 0 && <p>No employees match your search.</p>}

      {filtered.map((emp) => (
        <div className="card note" key={emp._id}>
          <h3>{emp.name}</h3>
          <p>{emp.position} · {emp.department}</p>
          <p>{emp.email}</p>
          <p>Salary: {emp.salary}</p>
          <div className="actions">
            <button className="secondary" onClick={() => handleEdit(emp)}>Edit</button>
            <button className="danger" onClick={() => handleDelete(emp._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
