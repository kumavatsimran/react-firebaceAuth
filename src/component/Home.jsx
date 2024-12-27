import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc,onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../conig';
import {signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Home() {

  const nagivate=useNavigate()
  // 
  const [user, setUser] = useState({ Name: "", address: "" });
const [data, setData] = useState([]);
const [editId, setEditId] = useState("");


  const handleChange=(e)=>{
   const {name,value}=e.target
   setUser ({ ...user, [name]: value });  
   console.log({ ...user, [name]: value });
 
  }
  useEffect(() => {
    console.log("Fetching data on mount...");
    const unsubscribe = list();
    return () => unsubscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === "") {
        // Add a new user
        await addDoc(collection(db, "user"), user);
        console.log("User added successfully");
      } else {
        // Update existing user
        await updateDoc(doc(db, "user", editId), {
          Name: user.Name,
          address: user.address,
        });
        console.log("User updated successfully");
        setEditId(""); // Clear editId
      }
  
      // Reset the user state to empty
      setUser({ Name: "", address: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  const list = () => {
    const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
      const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(allData);
      console.log("Real-time Fetched Data:", allData);
    }, (error) => {
      console.error("Error in real-time fetching:", error);
    });
    return unsubscribe;
  };

  
  const handleDelete=async(id)=>{
    try {
      await deleteDoc(doc(db,"user",id));
      list()
    } catch (error) {
     console.log(error); 
    }
  }
  const handleEdit = (userData) => {
  setEditId(userData.id); // Set the edit ID
  setUser({ Name: userData.Name, address: userData.address }); // Set user data in form
  console.log("Editing User:", userData);
};

  
  const handleSignout=()=>{
signOut(auth).then(()=>{
  nagivate("/")
}).catch((error)=>{
  console.log(error);
})
  }
  


  return (
    <>

      <h1 className='text-center'>home page</h1>
      <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-light text-center">
                <h5 className="mb-0">{editId ? "Edit User" : "Add User"}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                      Name 
                    </label>
                    <input
  type="text"
  className="form-control"
  id="Name"
  name="Name"
  value={user.Name || ""}
  onChange={handleChange}
  placeholder="Enter Name"
/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      address
                    </label>
                    <input
  type="text"
  className="form-control"
  id="address"
  name="address"
  value={user.address || ""}
  onChange={handleChange}
  placeholder="Enter Address"
/>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      {editId ? "Update User" : "Add User"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
        <button onClick={handleSignout} className="btn  btn-primary">
          Sign Out
        </button>
      </div>
  
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="text-center mb-3">User List</h4>
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>Name</th>
                    <th>address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user,i) => (
                    <tr key={user.id}>
                      <td>{i+1}</td>
                      <td>{user.Name}</td>
                      <td>{user.address}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm me-2"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                        <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => handleEdit(user)}
>
  Edit
</button>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    </>
  );
}

export default Home;
