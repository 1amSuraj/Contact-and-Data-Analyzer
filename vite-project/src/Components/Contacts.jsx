import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import CircleLoader from 'react-spinners/CircleLoader'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const customStyles= {
  headCells: {
    style: {
      fontSize: 15 + "px",
      fontWeight: 600
    },
  },
  cells: {
    style: {
      fontSize: 13 + "px",
      fontWeight: 500
    },
  },
};

const MySwal = withReactContent(Swal)

const Contacts = () => {

  const [contacts,setContacts]=useState([])
  const [loading, setLoading]=useState(false)

  const deleteRecord = (id) => {

    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/contactmsyt/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setContacts(res.data.contacts);
          MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
        .catch((err) => {
          MySwal.fire({
            title: "Error!",
            text: "Error Occured!!!",
            icon: "error",
          });
        });
      }
    });
  }

  const columns=[
    {
      name: 'Name',
      selector: (row) => row.name
    },
    {
      name: 'Email',
      selector: (row) => row.email
    },
    {
      name: 'Phone',
      selector: (row) => row.phone
    },
    {
      name: 'Action',
      selector: (row) => <>
      <Link to={`/dashboard/edit-contact/${row._id}`}>
        <FaPenToSquare className='table-icon1'/>
      </Link>
        <FaRegTrashCan className='table-icon2' onClick={() => deleteRecord(row._id)}/>
      </>
    }
  ]
  useEffect(()=> {
    setLoading(true)
    axios.get('http://127.0.0.1:3000/contactmsyt/contacts',{
        headers: {
          Authorization: `Berear ${localStorage.getItem('token')}`
      }
    })
      .then(res=> {
        if(res.data.success){
        setContacts(res.data.contacts)
        setLoading(false)
      }
      }).catch((err) => {
            console.log(err); 
            setLoading(false)
      });
  },[]);
  return (
    <> 
    {
      loading ? (
        <div className='loader'>
      <CircleLoader 
      loading={loading}
      size={50}
      aria-label='Loading Spinner'
      data-testid="loader"
      />
      </div>
       ) :(
      <div className='contact-list'>
      <DataTable 
      columns={columns}
      data={contacts}
      customStyles ={customStyles}
      pagination
      />
      {contacts.length === 0 ? <h1>Add a Contact</h1> : <></>}
    </div>
    )}
    </>
  )
}

export default Contacts
