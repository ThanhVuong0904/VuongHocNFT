import React, { useContext } from 'react'
import { NFTContext } from '../contexts/NFTContext'
import CheckIcon from '../assets/images/bx-check.svg'


export default function Mouth() {
     const {options, MOUTH, mouth, setMouth, result, setResult} = useContext(NFTContext)
     const handleMouth = (id) => {
          setMouth(id)
          setResult({...result, mouth: id})
     }
     return (
          <div className={`d-grid-col-3 content-list mouth ${options === 4   ? 'active' : ''}`}>
               {
                    MOUTH.map(item => {
                         return (
                              <div 
                                   className="content-item" 
                                   key={item.image}
                                   onClick={() => handleMouth(item.id)}
                              >
                                   <img src={item.image} alt="" />
                                   {item.id === mouth 
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
