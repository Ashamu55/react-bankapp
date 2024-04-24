import axios from 'axios'
import React, { useState } from 'react'

export const Upload = () => {
    let endPoint = "http://localhost:5000/student/upload"
    const [myFile, setMyfile] = useState("")
    const [myImage, setMyImage] = useState("")

    const handleFile = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () =>{
            // console.log(reader.result);
            setMyfile(reader.result)
        }
    }
        const Uploadimage = async () => {
            axios.post (endPoint, { myFile })
            .then((res)=>{
                setMyImage(res.data.result.url)
            })
        }
  return (
    <>
          <div>
      <input type="file" onChange={(e)=> handleFile(e)}/>
      <button 
      onClick={Uploadimage}
      className='bg-green-500 p-6 rounded-md text-white'>UPLOAD</button>

      <img src={myImage} alt="" />
  </div>
    </>
  )
}

export default Upload