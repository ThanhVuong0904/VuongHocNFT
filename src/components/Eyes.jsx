import React, { useContext, useEffect } from 'react'
import { useMoralisFile } from 'react-moralis'
import CheckIcon from '../assets/images/bx-check.svg'
import { NFTContext } from '../contexts/NFTContext'
import axios from 'axios'
export default function Eyes() {
     const {options, EYES, eye, setEye,result, setResult} = useContext(NFTContext)
     const handleEye = (id) => {
          setEye(id)
          setResult({...result, eye: id})
     }
     return (
          <section className={`d-grid-col-3 content-list eyes ${options === 1 ? 'active' : ''}`}>
               {/* <button onClick={handle}>test</button> */}
               {
                    EYES.map(item => {
                         return (
                              <div 
                                   className="content-item" 
                                   key={item.image}
                                   onClick={() => handleEye(item.id)}
                              >
                                   <img src={item.image} alt="" />
                                   {item.id === eye 
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
          </section>
     )
}
