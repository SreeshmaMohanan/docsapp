import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useParams} from 'react-router-dom';

function Edit({db}) {
    const isMounted = useRef()
    const params=useParams()
    console.log(params);
    const collectionRef=collection(db,'documents')
    const [docsDesc, setDocsDesc] = useState('');
    const [documentTitle, setDocumentTitle] = useState('')
    const getQuillData = (value) => {
        setDocsDesc(value)
    }
    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title)
            setDocsDesc(docs.data().docsDesc);
        })
    }
    useEffect(()=>{
        const updateData=setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc

            })
            .then(() => {
                alert('Saved')
            })
            .catch(() => {
                alert('Cannot Save')
            })
            
        },10000)
       return ()=>clearTimeout(updateData)
       
        
    },[docsDesc])
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])
    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}]
          
         
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      /* 
       * Quill editor formats
       * See https://quilljs.com/docs/formats/
       */
     const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent'
      ]
    
          
  return (
    <div>
         <div className='editDocs-main'>
            
            <div className='editDocs-inner'>
                <ReactQuill
                    className='react-quill'
                    value={docsDesc}
                    onChange={getQuillData}
                    modules={modules}
                    formats={formats}
                    
                />
               
            </div>
        </div>
        <Link to='/' className='text-secondary m-2'>Back to Home</Link>
    </div>
  )
}

export default Edit