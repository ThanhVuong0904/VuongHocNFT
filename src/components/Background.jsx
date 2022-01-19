import React, {useContext} from 'react'
import CheckIcon from '../assets/images/bx-check.svg'
import { NFTContext } from '../contexts/NFTContext'

export default function Background() {
     const {options, BACKGROUND, background, setBackground, result, setResult} = useContext(NFTContext)
     const handleBackGround = (id) => {
          setBackground(id)
          setResult({...result, background: id})
     }
     return (
          <div className={`d-grid-col-3 content-list background ${options === 7   ? 'active' : ''}`}>
               {
                    BACKGROUND.map(item => {
                         return (
                              <div 
                                   className="content-item" 
                                   key={item.image}
                                   onClick={() => handleBackGround(item.id)}
                              >
                                   <img src={item.image} alt="" />
                                   {item.id === background 
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
