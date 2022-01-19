import React, { useContext } from 'react'
import { NFTContext } from '../contexts/NFTContext'
import CheckIcon from '../assets/images/bx-check.svg'
export default function Phone() {
     const {options, PHONE, phone, setPhone, result, setResult} = useContext(NFTContext)
     const handlePhone = (id) => {
          setPhone(id)
          setResult({...result, phone: id})
     }
     return (
          <div className={`d-grid-col-3 content-list phone ${options === 3   ? 'active' : ''}`}>
               {
                    PHONE.map(item => {
                         return (
                              <div 
                                   className="content-item" 
                                   key={item.image}
                                   onClick={() => handlePhone(item.id)}
                              >
                                   <img src={item.image} alt="" />
                                   {item.id === phone 
                                        ? 
                                        <div className="check-icon">
                                             <img src={CheckIcon} alt="" />
                                        </div>
                                        : ''
                                   }
                              </div>
                         )
                    })
               }
          </div>
     )
}
