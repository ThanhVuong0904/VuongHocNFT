import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useContext } from 'react/cjs/react.development'
import { NFTContext } from '../contexts/NFTContext'
import { contractABI } from '../abi'
import Web3 from "web3"; 
import axios from 'axios'
import ImageTest from '../final-images/11.png'
export default function PreviewAvata() {
     const {Moralis} = useMoralis()
     // const CONTRACT_ADDRESS = '0x08f993Bf707CdE7D9f679329d7d1c1b562461DA3'
     //new
     const CONTRACT_ADDRESS = '0x955276a71b0C3928309DCd0A84fe2080EA11Ade9'

     
     const [id, setId] = useState(14)
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
          user
     } = useContext(NFTContext)
     let promises = []
     const createImage = async (e) => {
          const composite = await axios.post('http://localhost:5000/composite', 
               {result: result ,id: id}
          )
          console.log(composite);
          if(composite.data.success) {
               setTimeout( async () => {
                    const res = await axios.post('http://localhost:5000/createMetadata', 
                         {id: id}
                    )
                    if(res.data.success) {
                         const contract = await new web3Api.web3.eth.Contract(contractABI, CONTRACT_ADDRESS)
                         const setDomain = await contract.methods.inputDomain(
                              res.data.metadata.slice(0,90))
                              .send({from: user.get('ethAddress')})
                         console.log("Domain",setDomain);
                         const receipt = await contract.methods.createNFT(id).send({from: user.get('ethAddress')})
                         console.log(receipt);
                         // if(receipt.status) {
                         //      setId(id + 1)
                         // }
                    }
               },3000)
          }
          // const res = await axios.post('http://localhost:5000/createMetadata', 
          //           {id: id}
          // )
          // console.log(res);
     }

     const handleTest = async (e) => {
          // const data = e.target.files[0]
          // const file = new Moralis.File(data.name, data)
          // await file.saveIPFS();
          // console.log(file.ipfs())
          const options = {
               "abi": [
               {
                 "path": "images/11.png",
                 "content": btoa(JSON.stringify(ImageTest))
               }
             ]
              };
             const path = await Moralis.Web3API.storage.uploadFolder(options);
             console.log(path);
     }
     return (
          <div className="preview-avatar">
               <button onClick={handleTest}>Test</button>
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
               <button onClick={createImage} className='createNFT'>Create NFT</button>
          </div>
     )
}
