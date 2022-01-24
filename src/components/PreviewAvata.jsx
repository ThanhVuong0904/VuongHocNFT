import React, { useState, useContext } from 'react'
import { NFTContext } from '../contexts/NFTContext'
// import { contractABI } from '../abi'
import { abiMYTOKENTV } from '../abi2'
import {Moralis} from 'moralis'
import { useMoralisFile } from 'react-moralis'
import axios from 'axios'

export default function PreviewAvata() {
     // Old
     const CONTRACT_ADDRESS = '0x955276a71b0C3928309DCd0A84fe2080EA11Ade9'
     //New contract
     const MYTOKENTV = '0xb58722a57AB337e0ed3e159168182546f14da997'
     const {
          saveFile,
     } = useMoralisFile();
     //Id bây giờ không quan trọng, chỉ dùng để đặt tên cho hình
     const [id, setId] = useState(25)
     const {
          EYES, eye, 
          HEADDRESS, headdress, 
          PHONE, phone, 
          MOUTH, mouth, 
          CLOTHES, clothes, 
          ACCESSORIES, accessories,
          BACKGROUND, background,
          backgroundByUser, setBackgroundByUser,
          result,
          web3Api,
          account
     } = useContext(NFTContext)
     const createNFT = async () => {
          if(backgroundByUser.boolean) {
               //Upload background to IPFS
               const fileImage = await new saveFile("background.png", backgroundByUser.file, {saveIPFS: true})
               console.log("Background by user",fileImage._ipfs);
               //Composite Image
               const composite = await axios.post('http://localhost:5000/composite', 
                    {result: result ,id: id, backgroundByUser: fileImage._ipfs}
               )
               console.log("composite",composite);
               if(composite.data.success) {
                    //Upload image composite to IPFS
                    const res = await axios.post('http://localhost:5000/uploadImage', 
                         {id: id}
                    )
                    console.log("Upload image composite to IFPS",res);
                    //Create Metadata
                    if(res.data.success) {
                         const metadata = { image: res.data.image };
                         const nftFileMetadataFile = new Moralis.File(
                              "metadata.json", 
                              {
                                   base64 : btoa(JSON.stringify(metadata))
                              }
                         );
                         await nftFileMetadataFile.saveIPFS();
                         const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();
                         console.log("metadata",nftFileMetadataFilePath);
                         const contract = await new web3Api.web3.eth.Contract(abiMYTOKENTV, MYTOKENTV)
                         const receipt = await contract.methods.createItem(nftFileMetadataFilePath).send({from: account})
                         console.log("receipt",receipt);
                    }
               }
          }
          else {
               const composite = await axios.post('http://localhost:5000/composite', 
                    {result: result ,id: id}
               )
               console.log(composite);
               if(composite.data.success) {
                    const res = await axios.post('http://localhost:5000/uploadImage', 
                         {id: id}
                    )
                    console.log(res);
                    if(res.data.success) {
                         const metadata = { image: res.data.image };
                         const nftFileMetadataFile = new Moralis.File(
                              "metadata.json", 
                              {
                                   base64 : btoa(JSON.stringify(metadata))
                              }
                         );
                         await nftFileMetadataFile.saveIPFS();
                         const nftFileMetadataFilePath = nftFileMetadataFile.ipfs();
                         console.log("metadata",nftFileMetadataFilePath);
                         const contract = await new web3Api.web3.eth.Contract(abiMYTOKENTV, MYTOKENTV)
                         const receipt = await contract.methods.createItem(nftFileMetadataFilePath).send({from: account})
                         console.log("receipt",receipt);
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
                         {
                              backgroundByUser.boolean 
                              ? <img src={backgroundByUser.image} alt="" /> 
                              :
                              BACKGROUND.map(item => item.id === background 
                                   ?
                                   <div key={item.image} className='preview-image'>
                                        <img src={item.image} alt="" />
                                   </div> 
                                   : ''
                              )
                               
                         }
                         
                    </div>
               </div>
               <button onClick={createNFT} className='createNFT'>Create NFT</button>
          </div>
     )
}
