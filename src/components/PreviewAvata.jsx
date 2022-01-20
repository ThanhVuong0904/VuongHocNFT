import React, { useState, useContext } from 'react'
import { NFTContext } from '../contexts/NFTContext'
import { contractABI } from '../abi'

import axios from 'axios'

export default function PreviewAvata() {
     const CONTRACT_ADDRESS = '0x955276a71b0C3928309DCd0A84fe2080EA11Ade9'
     //Hiện tại đã có NFT ID18
     const [id, setId] = useState(19)
     const {
          EYES, eye, 
          HEADDRESS, headdress, 
          PHONE, phone, 
          MOUTH, mouth, 
          CLOTHES, clothes, 
          ACCESSORIES, accessories,
          BACKGROUND, background,
          result,
          web3Api,
          account
     } = useContext(NFTContext)
     const createNFT = async (e) => {
          const composite = await axios.post('http://localhost:5000/composite', 
               {result: result ,id: id}
          )
          console.log(composite);
          if(composite.data.success) {
               const res = await axios.post('http://localhost:5000/createMetadata', 
                    {id: id}
               )
               if(res.data.success) {
                    const contract = await new web3Api.web3.eth.Contract(contractABI, CONTRACT_ADDRESS)
                    const setDomain = await contract.methods.inputDomain(
                         res.data.metadata.slice(0,90))
                         .send({from: account})
                    console.log("Domain",setDomain);
                    const receipt = await contract.methods.createNFT(id).send({from: account})
                    console.log(receipt);
                    if(receipt.status) {
                         setId(id + 1)
                         console.log("Tạo thành công NFT với ID: ",id);
                    }
               }
          }
     }

     return (
          <div className="preview-avatar">
               <div className="preview-main">
                    <h3>Metaverse Ape</h3>
                    <div className="preview-content">
                         {EYES.map(item => item.id === eye 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {HEADDRESS.map(item => item.id === headdress 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {PHONE.map(item => item.id === phone 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {MOUTH.map(item => item.id === mouth 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {CLOTHES.map(item => item.id === clothes 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {ACCESSORIES.map(item => item.id === accessories 
                              ?
                              <div key={item.image} className='preview-image z-index2'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                         {BACKGROUND.map(item => item.id === background 
                              ?
                              <div key={item.image} className='preview-image'>
                                   <img src={item.image} alt="" />
                              </div> 
                              : '')
                         }
                    </div>
               </div>
               <button onClick={createNFT} className='createNFT'>Create NFT</button>
          </div>
     )
}
