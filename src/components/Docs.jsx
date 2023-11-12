import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { addDoc, collection, doc, onSnapshot, setDoc} from 'firebase/firestore';
import db from '../firbase'
import { useNavigate } from 'react-router-dom';
function Docs({db}){
    const [title, setTitle] = useState('')
    const [open, setOpen] = React.useState(false);
    const isMounted=useRef()
    const [docsData, setDocsData] = useState([]);
    const navigate=useNavigate()
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log(title);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const collectionRef = collection(db, 'documents')
    const payload={title}
    const addData =  async () => {
        
        await addDoc(collectionRef,payload)
        .then(() => {
            alert('Data Added');
            handleClose()
        })
        .catch(() => {
            alert('Cannot add data')
        })
    }
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }))
        })
    }
    const getID = (id) => {
        navigate(`/edit/${id}`)
    }
   
    useEffect(() => {
        if(isMounted.current){
            return 
        }

        isMounted.current = true;
        getData()
    }, [])
    return (
        <div className='docs'>
            <h1 className='m-5 p-1'>Docs App</h1>

            <Button onClick={handleOpen} className='adddocs'>
                Add a Document
            </Button>
            <Modal
                setOpen={setOpen}
                open={open}
                title={title}
                setTitle={setTitle}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                  <Box sx={style}>
                    <input
                        placeholder='Add the Title'
                        className='add-input'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <div className='button-container'>
                        <button
                            className='adddocs'
                            onClick={addData}
                        >
                            Add
                        </button>
                    </div>
                </Box>
            </Modal>
            <div  className=' justify-content-evenly flex-wrap align-items-center d-flex '>
                {
                    docsData.map((doc) => {
                        return (
                            <div className='d-flex w-25 m-2 p-3 rounded flex-column flex-wrap'>
                                <div className='w-100 bg-dark text-white m-3 p-3 shadow rounded ' style={{height:'100px'}} onClick={() => getID(doc.id)}>
                                <p>{doc.title}</p>
                              
                            </div>
                           
                            </div>
                        
                        )
                    })
                }
            </div>
            
               
            
        </div>
    );
 }
export default Docs