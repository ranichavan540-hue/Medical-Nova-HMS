import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  const [searchPatient, setSearchPatient] = useState("");
  const [editingPatientId, setEditingPatientId] = useState(null);

  const [showPatientForm, setShowPatientForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showMedicalRecordForm, setShowMedicalRecordForm] = useState(false);
  const [profileName, setProfileName] = useState(
    () => localStorage.getItem("medcore_profileName") || "Admin"
  );
  useEffect(() => {
    localStorage.setItem("medcore_profileName", profileName);
  }, [profileName]);
  const [showEditProfile, setShowEditProfile] = useState(false);

  

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: ""
  });

  const [patients, setPatients] = useState(() => {
  const savedPatients = localStorage.getItem("medcore_patients");

  if (savedPatients) {
    try {
      return JSON.parse(savedPatients);
    } catch {
      // Saved data invalid asel tar default patients vapra
    }
  }

  return [
    { id: "P001", name: "Aarav Sharma", age: 32, gender: "Male", phone: "9876543210", disease: "Fever", status: "Active" },
    { id: "P002", name: "Priya Patil", age: 27, gender: "Female", phone: "9876543211", disease: "Cold", status: "Active" },
    { id: "P003", name: "Rahul Deshmukh", age: 45, gender: "Male", phone: "9876543212", disease: "Diabetes", status: "Pending" },
    { id: "P004", name: "Sneha Joshi", age: 36, gender: "Female", phone: "9876543213", disease: "Fever", status: "Active" }
  ];
});
useEffect(() => {
  localStorage.setItem("medcore_patients", JSON.stringify(patients));
}, [patients]);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    phone: "",
    experience: "",
    availability: "Available"
  });

  
const [doctorList, setDoctorList] = useState(() => {
  const savedDoctors = localStorage.getItem("medcore_doctors");

  if (savedDoctors) {
    try {
      return JSON.parse(savedDoctors);
    } catch {
      return [
        { id: "D001", name: "Dr. Amit Kulkarni", specialization: "Cardiology", phone: "9876500001", experience: "10 Years", availability: "Available" },
        { id: "D002", name: "Dr. Neha Shah", specialization: "Neurology", phone: "9876500002", experience: "8 Years", availability: "Available" },
        { id: "D003", name: "Dr. Raj Mehta", specialization: "Orthopedics", phone: "9876500003", experience: "12 Years", availability: "Busy" }
      ];
    }
  }

  return [
    { id: "D001", name: "Dr. Amit Kulkarni", specialization: "Cardiology", phone: "9876500001", experience: "10 Years", availability: "Available" },
    { id: "D002", name: "Dr. Neha Shah", specialization: "Neurology", phone: "9876500002", experience: "8 Years", availability: "Available" },
    { id: "D003", name: "Dr. Raj Mehta", specialization: "Orthopedics", phone: "9876500003", experience: "12 Years", availability: "Busy" }
  ];
});

  useEffect(() => {
    localStorage.setItem("medcore_doctors", JSON.stringify(doctorList));
  }, [doctorList]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    reason: ""
  });

  const [appointments, setAppointments] = useState([
    { id: "A001", patientName: "Aarav Sharma", doctorName: "Dr. Amit Kulkarni", date: "2026-10-05", time: "09:00", reason: "Regular Checkup" },
    { id: "A002", patientName: "Priya Patil", doctorName: "Dr. Neha Shah", date: "2026-10-05", time: "10:30", reason: "Headache" },
    { id: "A003", patientName: "Rahul Deshmukh", doctorName: "Dr. Raj Mehta", date: "2026-10-06", time: "12:00", reason: "Diabetes Checkup" }
  ]);
  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [billingSearch, setBillingSearch] = useState("");
  const [billingStatusFilter, setBillingStatusFilter] = useState("All");
  
  const [billingList, setBillingList] = useState(() => {
  const savedBills = localStorage.getItem("medcore_billing");

    return savedBills ? JSON.parse(savedBills) : [];
  });
  const totalPaidAmount = billingList
  .filter((bill) => bill.paymentStatus === "Paid")
  .reduce((total, bill) => total + Number(bill.totalAmount || 0), 0);


const totalPendingAmount = billingList
  .filter((bill) => bill.paymentStatus === "Pending")
  .reduce((total, bill) => total + Number(bill.totalAmount || 0), 0);
  const [editingBillId, setEditingBillId] = useState(null);
  useEffect(() => {
    localStorage.setItem("medcore_billing", JSON.stringify(billingList));
  }, [billingList]);

  const [newBill, setNewBill] = useState({
    patientName: "",
    consultationFee: "",
    medicineCharges: "",
    testCharges: "",
    paymentStatus: "Pending"
  });
  const [showBillingForm, setShowBillingForm] = useState(false);

  

  const [newMedicalRecord, setNewMedicalRecord] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    treatment: "",
    date: ""
  });

  const [medicalRecords, setMedicalRecords] = useState([
    { id: "MR001", patientName: "Aarav Sharma", doctorName: "Dr. Amit Kulkarni", diagnosis: "Fever", treatment: "Medication", date: "2026-10-03" },
    { id: "MR002", patientName: "Priya Patil", doctorName: "Dr. Neha Shah", diagnosis: "Migraine", treatment: "Tablets", date: "2026-10-04" },
    { id: "MR003", patientName: "Rahul Deshmukh", doctorName: "Dr. Raj Mehta", diagnosis: "Diabetes", treatment: "Regular Medication", date: "2026-10-04" }
  ]);

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Patients", icon: "♙" },
    { name: "Doctors", icon: "⚕" },
    { name: "Appointments", icon: "▣" },
    { name: "Medical Records", icon: "▤" },
    { name: "Billing", icon: "₹" },
    { name: "Admin Profile", icon: "👤" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setActivePage("Dashboard");
  };
  
const handlePrintBill = (bill) => {
  const receiptWindow = window.open("", "_blank", "width=800,height=700");

  if (!receiptWindow) {
    alert("Please allow pop-ups to print the receipt.");
    return;
  }

  receiptWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bill Receipt - ${bill.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #222;
          }
          .receipt {
            max-width: 650px;
            margin: auto;
            border: 1px solid #ddd;
            padding: 25px;
          }
          h1, h2 {
            text-align: center;
          }
          .details {
            margin: 25px 0;
            line-height: 1.8;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          .total {
            font-weight: bold;
          }
          .status {
            margin-top: 20px;
            font-weight: bold;
          }
          @media print {
            body { padding: 0; }
            .receipt { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h1>MedCore HMS</h1>
          <h2>Bill Receipt</h2>

          <div class="details">
            <div><strong>Bill ID:</strong> ${bill.id}</div>
            <div><strong>Patient Name:</strong> ${bill.patientName}</div>
            <div><strong>Payment Status:</strong> ${bill.paymentStatus}</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN")}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consultation Fee</td>
                <td>₹${bill.consultationFee}</td>
              </tr>
              <tr>
                <td>Medicine Charges</td>
                <td>₹${bill.medicineCharges}</td>
              </tr>
              <tr>
                <td>Test Charges</td>
                <td>₹${bill.testCharges}</td>
              </tr>
              <tr class="total">
                <td>Total Amount</td>
                <td>₹${bill.totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <p class="status">Payment Status: ${bill.paymentStatus}</p>
          <p style="text-align:center; margin-top:35px;">
            Thank you!
          </p>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);

  receiptWindow.document.close();
};

  const handleEditBill = (bill) => {
  setEditingBillId(bill.id);

  setNewBill({
    patientName: bill.patientName,
    consultationFee: String(bill.consultationFee),
    medicineCharges: String(bill.medicineCharges),
    testCharges: String(bill.testCharges),
    paymentStatus: bill.paymentStatus
  });

  setShowBillingForm(true);
};

const handleAddBill = (e) => {
  e.preventDefault();

  if (editingBillId) {
    if (!newBill.patientName.trim()) {
      alert("Please select a patient");
      return;
    }

    const consultation = Number(newBill.consultationFee) || 0;
    const medicine = Number(newBill.medicineCharges) || 0;
    const tests = Number(newBill.testCharges) || 0;

    const total = consultation + medicine + tests;

    setBillingList((previous) =>
      previous.map((bill) =>
        bill.id === editingBillId
          ? {
              ...bill,
              ...newBill,
              consultationFee: consultation,
              medicineCharges: medicine,
              testCharges: tests,
              totalAmount: total
            }
          : bill
        )
      );

      setEditingBillId(null);

      setNewBill({
        patientName: "",
        consultationFee: "",
        medicineCharges: "",
        testCharges: "",
        paymentStatus: "Pending"
      });

      setShowBillingForm(false);
        alert("Bill updated successfully!");
        return; 
      }

  if (!newBill.patientName.trim()) {
    alert("Please select a patient");
    return;
  }

  const consultation = Number(newBill.consultationFee) || 0;
  const medicine = Number(newBill.medicineCharges) || 0;
  const tests = Number(newBill.testCharges) || 0;

  const total = consultation + medicine + tests;

  const nextId =
    Math.max(0, ...billingList.map((bill) => Number(bill.id.slice(1)) || 0)) + 1;

  const bill = {
    id: `B${String(nextId).padStart(3, "0")}`,
    ...newBill,
    consultationFee: consultation,
    medicineCharges: medicine,
    testCharges: tests,
    totalAmount: total
  };

  setBillingList((previous) => [...previous, bill]);

  setNewBill({
    patientName: "",
    consultationFee: "",
    medicineCharges: "",
    testCharges: "",
    paymentStatus: "Pending"
  });

  setShowBillingForm(false);
  alert("Bill added successfully!");
};


  const resetPatientForm = () => {
    setNewPatient({ name: "", age: "", gender: "", phone: "", disease: "" });
    setEditingPatientId(null);
    setShowPatientForm(false);
  };

  const handleEditPatient = (patient) => {
    setEditingPatientId(patient.id);
    setNewPatient({
      name: patient.name,
      age: String(patient.age),
      gender: patient.gender,
      phone: patient.phone || "",
      disease: patient.disease || ""
    });
    setShowPatientForm(true);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();

    if (!newPatient.name.trim() || !newPatient.age || !newPatient.gender) {
      alert("Please fill all required fields");
      return;
    }

    if (editingPatientId) {
      setPatients((previous) =>
        previous.map((patient) =>
          patient.id === editingPatientId
            ? { ...patient, ...newPatient, age: Number(newPatient.age) }
            : patient
        )
      );
      alert("Patient updated successfully!");
    } else {
      const nextId = Math.max(0, ...patients.map((p) => Number(p.id.slice(1)) || 0)) + 1;
      const patient = {
        id: `P${String(nextId).padStart(3, "0")}`,
        ...newPatient,
        age: Number(newPatient.age),
        status: "Active"
      };
      setPatients((previous) => [...previous, patient]);
      alert("Patient added successfully!");
    }

    resetPatientForm();
  };
 
const handleDeletePatient = (patientId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (confirmDelete) {
    setPatients((previousPatients) =>
      previousPatients.filter(
        (patient) => patient.id !== patientId
      )
    );

    alert("Patient deleted successfully!");
  }
};

const handleEditDoctor = (doctor) => {
  setEditingDoctorId(doctor.id);

  setNewDoctor({
    name: doctor.name,
    specialization: doctor.specialization,
    phone: doctor.phone,
    experience: doctor.experience === "Not specified" ? "" : doctor.experience,
    availability: doctor.availability,
  });

  setShowDoctorForm(true);
};

const handleDeleteDoctor = (doctorId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this doctor?"
  );

  if (confirmDelete) {
    setDoctorList((previous) =>
      previous.filter((doctor) => doctor.id !== doctorId)
    );

    alert("Doctor deleted successfully!");
  }
};


  
const handleAddDoctor = (e) => {
  e.preventDefault();

  if (
    !newDoctor.name.trim() ||
    !newDoctor.specialization.trim() ||
    !newDoctor.phone.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }

  if (editingDoctorId) {
    setDoctorList((previous) =>
      previous.map((doctor) =>
        doctor.id === editingDoctorId
          ? {
              ...doctor,
              ...newDoctor,
              experience: newDoctor.experience || "Not specified",
            }
          : doctor
      )
    );
    alert("Doctor updated successfully!");
  } else {
    const nextId =
      Math.max(0, ...doctorList.map((d) => Number(d.id.slice(1)) || 0)) + 1;

    setDoctorList((previous) => [
      ...previous,
      {
        id: `D${String(nextId).padStart(3, "0")}`,
        ...newDoctor,
        experience: newDoctor.experience || "Not specified",
      },
    ]);
    alert("Doctor added successfully!");
  }

  setNewDoctor({
    name: "",
    specialization: "",
    phone: "",
    experience: "",
    availability: "Available",
  });

  setEditingDoctorId(null);
  setShowDoctorForm(false);
};


  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.patientName.trim() || !newAppointment.doctorName.trim() || !newAppointment.date || !newAppointment.time) {
      alert("Please fill all required fields");
      return;
    }

    const nextId = Math.max(0, ...appointments.map((a) => Number(a.id.slice(1)) || 0)) + 1;
    
      setAppointments((previous) => [
        ...previous,
        {
          id: `A${String(nextId).padStart(3, "0")}`,
          ...newAppointment,
          status: "Scheduled"
        }
      ]);

    setNewAppointment({ patientName: "", doctorName: "", date: "", time: "", reason: "" });
    setShowAppointmentForm(false);
    alert("Appointment added successfully!");
  };
  
  const handleDeleteAppointment = (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (confirmDelete) {
      setAppointments((previousAppointments) =>
        previousAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );

      alert("Appointment deleted successfully!");
    }
  };


  const handleAddMedicalRecord = (e) => {
    e.preventDefault();
    if (!newMedicalRecord.patientName.trim() || !newMedicalRecord.doctorName.trim() || !newMedicalRecord.diagnosis.trim() || !newMedicalRecord.date) {
      alert("Please fill all required fields");
      return;
    }

    const nextId = Math.max(0, ...medicalRecords.map((r) => Number(r.id.slice(2)) || 0)) + 1;
    setMedicalRecords((previous) => [...previous, { id: `MR${String(nextId).padStart(3, "0")}`, ...newMedicalRecord }]);
    setNewMedicalRecord({ patientName: "", doctorName: "", diagnosis: "", treatment: "", date: "" });
    setShowMedicalRecordForm(false);
    alert("Medical record added successfully!");
  };

  const stats = [
    { title: "Total Patients", value: patients.length, icon: "♙", color: "blue" },
    { title: "Total Doctors", value: doctorList.length, icon: "⚕", color: "green" },
    { title: "Today's Appointments", value: appointments.length, icon: "▣", color: "orange" },
    { 
      title: "Total Revenue", 
      value: `₹${billingList
        .filter((bill) => bill.paymentStatus === "Paid")
        .reduce((total, bill) => total + Number(bill.totalAmount || 0), 0)
        .toLocaleString("en-IN")}`, 
      icon: "₹", 
      color: "purple" 
    },
    {
    title: "Pending Payments",
    value: `₹${billingList
      .filter((bill) => bill.paymentStatus === "Pending")
      .reduce((total, bill) => total + Number(bill.totalAmount || 0), 0)
      .toLocaleString("en-IN")}`,
    icon: "⌛",
    color: "orange"
  },
    
  ];

  const filteredPatients = patients.filter((patient) => {
    const search = searchPatient.trim().toLowerCase();
    return patient.name.toLowerCase().includes(search) || patient.id.toLowerCase().includes(search);
  });
  const scheduledCount = appointments.filter(
    (appointment) => (appointment.status || "Scheduled") === "Scheduled"
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  const renderContent = () => {
    if (activePage === "Dashboard") {
      return (
        <>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>
                <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                <div><p>{stat.title}</p><h2>{stat.value}</h2></div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Scheduled Appointments</h3>
                <p>{scheduledCount}</p>
              </div>

              <div className="stat-card">
                <h3>Completed Appointments</h3>
                <p>{completedCount}</p>
              </div>

              <div className="stat-card">
                <h3>Cancelled Appointments</h3>
                <p>{cancelledCount}</p>
              </div>
            </div>

            <section className="panel">
              <div className="panel-heading">
                <h3>Recent Patients</h3>
                <button className="text-button" onClick={() => setActivePage("Patients")}>View All</button>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Patient ID</th><th>Name</th><th>Age</th><th>Status</th></tr></thead>
                  <tbody>
                    {patients.slice(-5).map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.id}</td><td>{patient.name}</td><td>{patient.age}</td>
                        <td><span className={`status ${patient.status.toLowerCase()}`}>{patient.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <h3>Upcoming Appointments</h3>
                <button className="text-button" onClick={() => setActivePage("Appointments")}>View All</button>
              </div>
              {appointments.slice(0, 5).map((appointment) => (
                <div className="appointment-item" key={appointment.id}>
                  <div className="doctor-avatar">⚕</div>
                  <div className="appointment-info"><strong>{appointment.patientName}</strong><p>{appointment.doctorName}</p></div>
                  <span className="appointment-time">{appointment.time}</span>
                </div>
              ))}
            </section>
          </div>
        </>
      );
    }

    if (activePage === "Patients") {
      return (
        <section className="panel">
          {selectedPatient && (
            <div className="patient-profile-card">
              <div className="panel-heading">
                <h3>Patient Profile</h3>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setSelectedPatient(null)}
                >
                  Close
                </button>
              </div>

              <p><strong>Patient ID:</strong> {selectedPatient.id}</p>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone || "Not provided"}</p>
              <p><strong>Disease:</strong> {selectedPatient.disease || "Not provided"}</p>
              <p><strong>Status:</strong> {selectedPatient.status}</p>
            </div>
          )}
          {showPatientForm && (
            <div className="panel patient-form">
              <div className="panel-heading">
                <h3>{editingPatientId ? "Edit Patient" : "Register New Patient"}</h3>
                <button type="button" className="text-button" onClick={resetPatientForm}>Close</button>
              </div>
              <form onSubmit={handleAddPatient}>
                <label>Patient Name *</label>
                <input type="text" placeholder="Enter patient name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} required />
                <label>Age *</label>
                <input type="number" min="1" placeholder="Enter age" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} required />
                <label>Gender *</label>
                <select value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} required>
                  <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} />
                <label>Disease</label>
                <input type="text" placeholder="Enter disease" value={newPatient.disease} onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })} />
                <button type="submit" className="primary-small">{editingPatientId ? "Update Patient" : "Save Patient"}</button>
              </form>
            </div>
          )}

          <div className="panel-heading">
            <h3>Patient Management</h3>
            <button className="primary-small" onClick={() => { resetPatientForm(); setShowPatientForm(true); }}>+ Add Patient</button>
          </div>
          <div className="patient-search">
            <input type="text" placeholder="Search Patient by Name or ID" value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)} />
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Patient ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Disease</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td><td>{patient.name}</td><td>{patient.age}</td><td>{patient.gender}</td><td>{patient.phone}</td><td>{patient.disease}</td>
                    <td><span className={`status ${patient.status.toLowerCase()}`}>{patient.status}</span></td>
                    
                      <td>

                        <button
                          type="button"
                          className="view-button"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          View Profile
                        </button>
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEditPatient(patient)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          Delete
                        </button>
                      </td>

                  </tr>
                )) : (
                  <tr><td colSpan="8">No patients found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    if (activePage === "Doctors") {
      return (
        <section className="panel">
          {showDoctorForm && (
            <div className="panel patient-form">
              <div className="panel-heading">
                <h3>{editingDoctorId ? "Edit Doctor" : "Register New Doctor"}</h3>
                <button type="button" className="text-button" onClick={() => setShowDoctorForm(false)}>Close</button>
              </div>
              <form onSubmit={handleAddDoctor}>
                <label>Doctor Name *</label>
                <input value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} placeholder="Enter doctor name" required />
                <label>Specialization *</label>
                <input value={newDoctor.specialization} onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })} placeholder="e.g. Cardiology" required />
                <label>Phone Number *</label>
                <input value={newDoctor.phone} onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })} placeholder="Enter phone number" required />
                <label>Experience</label>
                <input value={newDoctor.experience} onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })} placeholder="e.g. 5 Years" />
                <label>Availability</label>
                <select value={newDoctor.availability} onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}>
                  <option value="Available">Available</option><option value="Busy">Busy</option><option value="On Leave">On Leave</option>
                </select>
                <button type="submit" className="primary-small">
                  {editingDoctorId ? "Update Doctor" : "Save Doctor"}
                </button>
              </form>
            </div>
          )}
          <div className="panel-heading"><h3>Doctor Management</h3><button className="primary-small" onClick={() => setShowDoctorForm(true)}>+ Add Doctor</button></div>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Doctor ID</th><th>Doctor Name</th><th>Specialization</th><th>Phone</th><th>Experience</th><th>Availability</th><th>Actions</th></tr></thead>
              <tbody>{doctorList.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td><td>{doctor.name}</td><td>{doctor.specialization}</td><td>{doctor.phone}</td><td>{doctor.experience}</td>
                  <td><span className={`status ${doctor.availability.toLowerCase().replace(" ", "-")}`}>{doctor.availability}</span></td>
                  <td>
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      Edit
                    </button>
                    
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      );
    }

    if (activePage === "Appointments") {
      return (
        <section className="panel">
          {showAppointmentForm && (
            <div className="panel patient-form">
              <div className="panel-heading">
                <h3>Schedule New Appointment</h3>
                <button type="button" className="text-button" onClick={() => setShowAppointmentForm(false)}>Close</button>
              </div>
              <form onSubmit={handleAddAppointment}>
                <label>Patient Name *</label>
                <input value={newAppointment.patientName} onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })} placeholder="Enter patient name" required />
                <label>Doctor Name *</label>
                <input value={newAppointment.doctorName} onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })} placeholder="Enter doctor name" required />
                <label>Appointment Date *</label>
                <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} required />
                <label>Appointment Time *</label>
                <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} required />
                <label>Reason</label>
                <input value={newAppointment.reason} onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })} placeholder="e.g. Regular Checkup" />
                <button type="submit" className="primary-small">Save Appointment</button>
              </form>
            </div>
          )}
          <div className="panel-heading"><h3>Appointment Management</h3><button className="primary-small" onClick={() => setShowAppointmentForm(true)}>+ Add Appointment</button></div>
          
            <div className="appointment-search">
              <input
                type="text"
                placeholder="Search by patient or doctor name..."
                value={appointmentSearch}
                onChange={(e) => setAppointmentSearch(e.target.value)}
              />
            </div>

          <div className="table-wrapper">
            <table>
              <thead><tr><th>Appointment ID</th><th>Patient Name</th><th>Doctor Name</th><th>Date</th><th>Time</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
              
              <tbody>
                
                {appointments
                  .filter((appointment) => {
                    const searchText = appointmentSearch.toLowerCase().trim();

                    return (
                      appointment.patientName.toLowerCase().includes(searchText) ||
                      appointment.doctorName.toLowerCase().includes(searchText)
                    );
                  })
                  .map((appointment) => (

                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason || "Not specified"}</td>

                    <td>
                      <select
                        value={appointment.status || "Scheduled"}
                        className={`status-${appointment.status || "Scheduled"}`}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setAppointments((previous) =>
                            previous.map((item) =>
                              item.id === appointment.id
                                ? { ...item, status: newStatus }
                                  : item
                                )
                              );
                            }}
                          >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    if (activePage === "Medical Records") {
      return (
        <section className="panel">
          {showMedicalRecordForm && (
            <div className="panel patient-form">
              <div className="panel-heading">
                <h3>Add Medical Record</h3>
                <button type="button" className="text-button" onClick={() => setShowMedicalRecordForm(false)}>Close</button>
              </div>
              <form onSubmit={handleAddMedicalRecord}>
                <label>Patient Name *</label>
                <input value={newMedicalRecord.patientName} onChange={(e) => setNewMedicalRecord({ ...newMedicalRecord, patientName: e.target.value })} required />
                <label>Doctor Name *</label>
                <input value={newMedicalRecord.doctorName} onChange={(e) => setNewMedicalRecord({ ...newMedicalRecord, doctorName: e.target.value })} required />
                <label>Diagnosis *</label>
                <input value={newMedicalRecord.diagnosis} onChange={(e) => setNewMedicalRecord({ ...newMedicalRecord, diagnosis: e.target.value })} required />
                <label>Treatment</label>
                <input value={newMedicalRecord.treatment} onChange={(e) => setNewMedicalRecord({ ...newMedicalRecord, treatment: e.target.value })} />
                <label>Date *</label>
                <input type="date" value={newMedicalRecord.date} onChange={(e) => setNewMedicalRecord({ ...newMedicalRecord, date: e.target.value })} required />
                <button type="submit" className="primary-small">Save Record</button>
              </form>
            </div>
          )}
          <div className="panel-heading"><h3>Medical Records</h3><button className="primary-small" onClick={() => setShowMedicalRecordForm(true)}>+ Add Medical Record</button></div>
          
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Record ID</th><th>Patient Name</th><th>Doctor Name</th><th>Diagnosis</th><th>Treatment</th><th>Date</th></tr></thead>
              <tbody>{medicalRecords.map((record) => (
                <tr key={record.id}><td>{record.id}</td><td>{record.patientName}</td><td>{record.doctorName}</td><td>{record.diagnosis}</td><td>{record.treatment}</td><td>{record.date}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      );
    }
    
if (activePage === "Admin Profile") {
  return (
    <section className="panel admin-profile-card">
      <div className="panel-heading">
        <h3>Admin Profile</h3>
      </div>
      
      {showEditProfile && (
        <div className="edit-profile-form">
        <h3>Edit Profile Information</h3>

        <label>Full Name</label>
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          readOnly
        />

        <div className="edit-profile-actions">
          <button
            type="button"
            onClick={() => setShowEditProfile(false)}
          >
            Save Profile
          </button>

          <button
            type="button"
            onClick={() => setShowEditProfile(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    )}


      <div className="profile-avatar">
        {profileName.trim().charAt(0).toUpperCase() || "A"}
      </div>

      <h2>{profileName}</h2>

      <p>
        <strong>Email:</strong>
        <span>{email}</span>
      </p>

      <p>
        <strong>Admin</strong>
        <span>Admin</span>
      </p>

      <p>
        <strong>Account Status:</strong>
        <span>Active</span>
      </p>

      <button
        type="button"
        className="edit-profile-button"
        onClick={() => setShowEditProfile(true)}      >
        Edit Profile
      </button>
    </section>
  );
}

   
return (
  <section className="panel">
    <div className="panel-heading">
      <h3>Billing Management</h3>
      <button
        className="primary-small"
        onClick={() => setShowBillingForm(!showBillingForm)}
      >
        + Add Bill
      </button>
    </div>

    {showBillingForm && (
      <form onSubmit={handleAddBill} className="patient-form">
        <label>Patient Name *</label>
        <select
          value={newBill.patientName}
          onChange={(e) =>
            setNewBill({ ...newBill, patientName: e.target.value })
          }
          required
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.name}>
              {patient.name}
            </option>
          ))}
        </select>

        <label>Consultation Fee</label>
        <input
          type="number"
          min="0"
          value={newBill.consultationFee}
          onChange={(e) =>
            setNewBill({ ...newBill, consultationFee: e.target.value })
          }
        />

        <label>Medicine Charges</label>
        <input
          type="number"
          min="0"
          value={newBill.medicineCharges}
          onChange={(e) =>
            setNewBill({ ...newBill, medicineCharges: e.target.value })
          }
        />

        <label>Test Charges</label>
        <input
          type="number"
          min="0"
          value={newBill.testCharges}
          onChange={(e) =>
            setNewBill({ ...newBill, testCharges: e.target.value })
          }
        />

        <label>Payment Status</label>
        <select
          value={newBill.paymentStatus}
          onChange={(e) =>
            setNewBill({ ...newBill, paymentStatus: e.target.value })
          }
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button type="submit" className="primary-small">
          {editingBillId ? "Update Bill" : "Save Bill"}
        </button>
      </form>
    )}

    <p>Manage hospital invoices and payments.</p>
    
   <input
      type="text"
      placeholder="Search by Bill ID or Patient Name..."
      value={billingSearch}
      onChange={(e) => setBillingSearch(e.target.value)}
      className="search-input"
    />
    
    <select
      value={billingStatusFilter}
      onChange={(e) => setBillingStatusFilter(e.target.value)}
      className="search-input"
    >
      <option value="All">All Payments</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
   
    </select>

    <p>Total Bills: {billingList.length}</p>

    <div className="billing-summary">
      <div className="billing-summary-card">
        <h4>Total Bills</h4>
        <p>{billingList.length}</p>
      </div>

      <div className="billing-summary-card">
        <h4>Total Paid Amount</h4>
        <p>₹{totalPaidAmount}</p>
      </div>

      <div className="billing-summary-card">
        <h4>Total Pending Amount</h4>
        <p>₹{totalPendingAmount}</p>
      </div>
    </div>
    
<div className="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Bill ID</th>
        <th>Patient Name</th>
        <th>Consultation Fee</th>
        <th>Medicine Charges</th>
        <th>Test Charges</th>
        <th>Total Amount</th>
        <th>Payment Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {billingList
        .filter((bill) => {
          const matchesSearch =
            bill.id.toLowerCase().includes(billingSearch.toLowerCase()) ||
            bill.patientName.toLowerCase().includes(billingSearch.toLowerCase());

          const matchesStatus =
            billingStatusFilter === "All" ||
            bill.paymentStatus === billingStatusFilter;

          return matchesSearch && matchesStatus;
        })
        .map((bill) => (
        <tr key={bill.id}>
          <td>{bill.id}</td>
          <td>{bill.patientName}</td>
          <td>₹{bill.consultationFee}</td>
          <td>₹{bill.medicineCharges}</td>
          <td>₹{bill.testCharges}</td>
          <td>₹{bill.totalAmount}</td>
          <td>{bill.paymentStatus}</td>
          <td>
            <button
              type="button"
              className="edit-button"
              onClick={() => handleEditBill(bill)}
            >
              Edit
            </button>
            <button
              type="button"
              className="print-button"
              onClick={() => handlePrintBill(bill)}
            >
              Print Receipt
            </button>
            
            <button
              className="delete-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this bill?")) {
                  setBillingList((previous) =>
                    previous.filter((item) => item.id !== bill.id)
                  );
                }
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      {billingList.filter((bill) =>
        bill.id.toLowerCase().includes(billingSearch.toLowerCase()) ||
        bill.patientName.toLowerCase().includes(billingSearch.toLowerCase())
      ).length === 0 && (
        <tr>
          <td colSpan="8">No bills found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  </section>
);
  };


  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo">✚</div>
          <h1>MedCore HMS</h1>
          <p className="subtitle">Hospital Management System</p>
          <h2>Welcome Back</h2>
          <p className="description">Login to access your dashboard</p>
          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign In</button>
          </form>
          <p className="footer">Secure Hospital Management Platform</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">✚</div>
          <div><h2>MedCore</h2><span>HMS</span></div>
        </div>
        <p className="menu-label">MAIN MENU</p>
        <nav>
          {menuItems.map((item) => (
            <button key={item.name} className={`menu-item ${activePage === item.name ? "selected" : ""}`} onClick={() => setActivePage(item.name)}>
              <span className="menu-icon">{item.icon}</span>{item.name}
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={handleLogout}>⇥ Logout</button>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div><h2>{activePage}</h2><p>Hospital Management System</p></div>
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <div><strong>Admin</strong><p>Administrator</p></div>
          </div>
        </header>
        <div className="page-content">
          <div className="welcome-section"><div><h1>Welcome to MedCore HMS</h1><p>Here is your hospital overview.</p></div></div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
