import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

const Doctors = () => {

    const { speciality } = useParams()
    const [filterDoc,setFilterDoc] = useState([])

    const {doctors} = useContext(AppContext)

    const applyFilter= ()=>{
      if (speciality){
        setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
      }
      else{
        setFilterDoc(doctors)
      }
    }

    useEffect(()=>{
      applyFilter()
        },[doctors,speciality])
  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <div>
        <div>
          <p>General physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div>
          {
            filterDoc.map((item, index) => (
          <div onClick={()=>navigate(`/appointment/${item._id}`)}
            className="bg-[#f4f9ff] border border-blue-200 rounded-xl overflow-hidden
                       cursor-pointer hover:-translate-y-2 transition-all duration-500"
          >
            <img className='bg-blue-50' src={item.image} alt="" />
            

            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available
              </div>

              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))

          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
