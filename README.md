# 🖥️ Computer Lab Management System (CLMS)

The **Computer Lab Management System (CLMS)** is a web-based application designed to manage and monitor computer lab infrastructure efficiently.  
It helps administrators track the status and availability of PCs and their components across multiple tables in a computer lab.

---

## 🎯 Objectives

- Maintain real-time status of lab PCs
- Track component availability and working condition
- Simplify maintenance and fault detection
- Provide centralized monitoring through a dashboard

---

## 🚀 Features

### 🔹 Dashboard
- Total number of tables, PCs, and components
- Count of faulty and working components
- Table-wise lab health overview

### 🔹 PC Management
- Supports 5 lab tables (TABLE1 – TABLE5)
- Each table contains 4 PCs
- Each PC contains CPU, Monitor, Keyboard, Mouse
- Visual PC representation
- Update component status using checkboxes

### 🔹 Maintenance Module
- Lists faulty components
- Allows marking components as repaired

### 🔹 Reports
- Table-wise component summary
- Fault frequency tracking

---

## 🛠️ Technology Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** SQLite
- **DB Library:** better-sqlite3
- **Styling:** Tailwind CSS
- **Icons:** react-icons

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── api/
 │   ├── dashboard/
 │   ├── table/[id]/
 │   ├── maintenance/
 │   └── reports/
 ├── components/
 ├── lib/
 └── public/
```

---

## 🗃️ Database Schema

```sql
CREATE TABLE component_status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT,
  pc_name TEXT,
  components_name TEXT,
  avalibility TEXT,
  working TEXT
);
```

---

## 🔌 API Endpoints

- `GET /api/dashboard`
- `GET /api/pc-status?table=TABLE1&pc=PC1`
- `POST /api/update-status`

---

## ⚙️ Installation & Setup

```bash
npm install
npm install better-sqlite3
npm run dev
```

---

## 🎓 Academic Use

Suitable for:
- Final Year Project
- Mini Project
- Web Technology & DBMS Labs

---

## 📜 License

Educational use only.
