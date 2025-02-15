"use client"

import React, { useMemo, Component, useState, useCallback, useEffect, useRef } from 'react';
import { apiCoreUseStoreActions, apiCoreUseStoreState } from '@/store/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { ChangeEvent } from "react";

// ATOM
import { ExplorerApi } from "atomicassets";
import { IAsset } from "atomicassets/build/API/Explorer/Objects";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";

// COMPONENTS
import { MainNavigation } from "@/components/header/header";

// ICONS
import IdeaIcon from "../../interfaces/icons/ideaicon.svg";
import PrototypeIcon from "../../interfaces/icons/prototypeicon.svg";
import ProductIcon from "../../interfaces/icons/producticon.svg";
import EventIcon from "../../interfaces/icons/eventicon.svg";
import AddFileIcon from "../../interfaces/icons/addfileicon.svg";

// GET ATOM DATA
const explorer = new ExplorerApi(`${process.env.NEXT_PUBLIC_ATOMIC_ENDPOINT!}`, 'atomicassets',{fetch:fetch as any});

export default function CreationWay () {

    const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZjE3MzQ2Mi1jNWVmLTRjM2YtYTE3ZC03YTNmZDg5Zjk4Y2MiLCJlbWFpbCI6ImNvbnN0YW50aW4ucmF1dGVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMzZjMGFhZTAzYzU0NzdmZTgxZCIsInNjb3BlZEtleVNlY3JldCI6IjYwM2I1MzhjZTU3MTZlMTAzZWU3YzIwMjVkZGE1NTMxNjE1ZmUxODZlMmUwZTkxYzRhMzkxMWUyOTEyMjVhOWQiLCJpYXQiOjE2OTg0MDI1NzJ9.DNJItYEPAZV4p3oGX-nuAeHcgAgi2zEOMYHRi9O2bOY";

    const {connect} = apiCoreUseStoreActions(state=>state.auth);
    const {session} = apiCoreUseStoreState(state=>state.auth.data);

    const [creationWay, setcreationWay] = useState(true);
    const [newWorkspace, setnewWorkspace] = useState(false);
    const [newCollection, setnewCollection] = useState(false);
    const [newProject, setnewProject] = useState(false);
    const [describeConcept, setdescribeConcept] = useState(false);
    const [describeProject, setdescribeProject] = useState(false);
    const [mintProject, setmintProject] = useState(false);
    const [CollectionReadyStatus, setCollectionReadyStatus] = useState(false);

    // STEP ONE -> CREATE COLLECTION

    // COLLECTION GENERATION FUNCTION

    const [GeneratedCollectionName, setGeneratedCollectionName] = useState<string | null>(null);
    const [CollectionName, setCollectionName] = useState<string | null>(null);
    const [CollectionCoverPicture, setCollectionCoverPicture] = useState<string | null>(null);

    const generateGeneratedCollectionName = () => {
        const characters = '1234';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result.toString(); // Return the generated random string
    };


    // GET COLLECTIONS
        const [CollectionData, setCollectionData] = useState<IAsset[]>([]);
        const [FilteredCollections, setFilteredCollections] = useState<any[]>([]);
        const [FilteredTemplate, setFilteredTemplate] = useState<any[]>([]);
        const [TamplateID, setTamplateID] = useState(null);

        useEffect(() => {
            const fetchDataAsset = async () => {
              if (!session?.auth?.actor) return; // ✅ Avoid fetching if session is not available
          
              try {
                const Collections = await explorer.getAssets();
                setCollectionData(Collections);
          
                const FindCollection = Collections.filter(
                  (assets) => assets.collection.author === session.auth.actor.toString()
                );
                setFilteredCollections(FindCollection);
              } catch (error) {
                console.error('Error fetching template details:', error);
              }
            };
          
            fetchDataAsset();
          
        }, [session, explorer]); // ✅ Add `explorer` if it's an external dependency
          
        interface Template {
            template_id: string;
            collection: {
              collection_name: string;
            };
        }

        useEffect(() => {
            let isMounted = true; // ✅ Prevent state update if unmounted
          
            const fetchTemplates = async () => {
              try {
                const response = await fetch(
                  'https://proton.api.atomicassets.io/atomicassets/v1/templates'
                );
                const responseData = await response.json();
          
                if (isMounted && responseData?.data?.length > 0) {
                  setFilteredTemplate(responseData.data);
          
                  const matchingTemplate = FilteredTemplate.find((template: Template) => 
                    template.collection.collection_name === GeneratedCollectionName
                    );
          
                  setTamplateID(matchingTemplate ? matchingTemplate.template_id : null);
                } else {
                  if (isMounted) {
                    setFilteredTemplate([]);
                    setTamplateID(null);
                  }
                }
              } catch (error) {
                console.error('Error fetching data:', error);
                if (isMounted) {
                  setFilteredTemplate([]);
                  setTamplateID(null);
                }
              }
            };
          
            fetchTemplates(); // ✅ Fetch immediately
          
            // Update data every 5 seconds instead of 500ms
            const interval = setInterval(fetchTemplates, 5000);
          
            return () => {
              isMounted = false; // ✅ Prevent state update on unmount
              clearInterval(interval); // ✅ Cleanup interval on unmount
            };
          }, [GeneratedCollectionName]); // ✅ Removed `FilteredTemplate` to prevent infinite loops
          



    // CHOSE COLLECTION

        const handleChosedCollectionData = (collectionId: string, collectionName: string, collectionImg: string) => {
            setGeneratedCollectionName(collectionId);
            setCollectionName(collectionName);
            setCollectionCoverPicture(collectionImg);
        };


        const handleGeneratedCollectionName = () => {
            // Generate the random string and set it in the state
            setGeneratedCollectionName(generateGeneratedCollectionName());
            setcreationWay(false);
            setnewWorkspace(true);
        };

    // UPLOAD COLLECTION COVER

        const [FileSelection, setFileSelection] = useState<{ file: File; previewURL: string } | null>(null);

        const handleSubmissionProcess = async (file: File, setPicture: React.Dispatch<React.SetStateAction<string | null>>) => {
            try {
              const formData = new FormData();
              formData.append("file", file);
          
              const metadata = JSON.stringify({
                name: file.name,
              });
              formData.append("pinataMetadata", metadata);
          
              const options = JSON.stringify({
                cidVersion: 0,
              });
              formData.append("pinataOptions", options);
          
              const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${PINATA_JWT}`,
                },
                body: formData,
              });
          
              const resData = await res.json();
              setPicture(resData.IpfsHash);  // ✅ No type conflict now
          
              console.log(resData);
            } catch (error) {
              console.log(error);
            }
          };
          
          

          const UploadPinataCollectionCover = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]; // Ensure file exists
          
            if (!file) return; // Exit if no file is selected
          
            const reader = new FileReader();
            reader.onload = () => {
              setFileSelection({ file, previewURL: reader.result as string }); // Ensure type matches
            };
            reader.readAsDataURL(file);
          };

          const handleSubmission = async () => {
            if (FileSelection) {
              await handleSubmissionProjectProcess(FileSelection.file, setProjectCoverPicture);
            }
          };
          
          
    
        useEffect(() => {
            handleSubmission();
        }, [FileSelection]); // Run effect whenever FileSelection changes

    // CREATE COLLECTION

        // CREATE COLLECTION DATA

        const [CollectionDescription, setCollectionDescription] = useState("");

        // CREATE COLLECTION FUNCTION
        async function atomCreationCollection() {
                
                await session?.transact(
                    {
                        actions: [
                            {
                                // Create collection
                                account: "atomicassets",
                                name: "createcol",
                                data: {
                                    author: `${session?.auth.actor.toString()}`,
                                    collection_name: GeneratedCollectionName,
                                    allow_notify: true,
                                    authorized_accounts: [`${session?.auth.actor.toString()}`],
                                    notify_accounts: [],
                                    market_fee: 0.01,
                                    data: [
                                    {"key": "name", "value": ["string", CollectionName]},
                                    {"key": "img", "value": ["string", CollectionCoverPicture]},
                                    {"key": "description", "value": ["string", CollectionDescription]},
                                    {"key": "url", "value": ["string", "xmarket"]}
                                ]
                                },
                                authorization: [{ actor: `${session?.auth.actor.toString()}`, permission: `${session?.auth.permission.toString()}` }],
                                
                            }
                        ],
                        
                    },
                    {broadcast: true}),

                console.log(`Collection created!`)
                console.log(GeneratedCollectionName)
        }   

        // SCHEMA
        const SCHEMA_DATA = {
            series: "uint16",
            name: "string",
            image: "string",
            audio: "string",
            video: "string",
            model: "string",
            marketplace: "string",
            project_owners: "string",
            project_type: "string",
            project_title: "string",
            satate_of_project: "string",
            project_subtitle: "string",
            project_discribe: "string",
            project_discribe_features: "string",

            categorie_first: "string",
            categorie_second: "string",
            categorie_third: "string",

            legal_status: "string",
            location: "string",
            
            funding_goal: "string",
            funding_coverage: "string",
            funding_end_date: "string",

            page_content: "string",
            vote_yes: "string",
            vote_no: "string"
        }

        async function atomCreationSchema() {
        
            await session?.transact(
                {
                    actions: [
                        {
                            // Create Schema
                            account: "atomicassets",
                            name: "createschema",
                            data: {
                                authorized_creator: `${session?.auth.actor.toString()}`,
                                collection_name: GeneratedCollectionName,
                                schema_name: GeneratedCollectionName,
                                schema_format: Object.entries(SCHEMA_DATA).map(([key, type]) => ({
                                    name: key,
                                    type: type,
                                }))
                            },
                            authorization: [{ actor: `${session?.auth.actor.toString()}`, permission: `${session?.auth.permission.toString()}` }],
                            
                        }
                    ]
                },
                {broadcast: true}),
    
            console.log(`createschema created!`)
        }   

        // LOGS
            console.log(CollectionCoverPicture)
            console.log(CollectionName)
            console.log(GeneratedCollectionName)

    // CREATE NFT

        // CHOOSING PROJECT TYPE

        const [ProjectType, setProjectType] = useState<string | null>(null);

        // Handler function to capture the selected radio button value

        const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
          setProjectType(event.target.value);
        };
        
        // CATEGORY LIST

        const [SelectedCategory, setSelectedCategory] = useState<any[]>([]);
        const [FirstCategory, setFirstCategory] = useState<string | null>(null);
        const [SecondCategory, setSecondCategory] = useState<string | null>(null);
        const [ThirdCategory, setThirdCategory] = useState<string | null>(null);
    
        const handleSelectedCategory = (value: string) => {
            setSelectedCategory((prevSelected: string[]) =>
              prevSelected.includes(value)
                ? prevSelected.filter((item) => item !== value)
                : [...prevSelected, value]
            );
          
            // Update selected category constants based on the number of selected checkboxes
            if (SelectedCategory.length < 3) {
              if (!FirstCategory) {
                setFirstCategory(value);
              } else if (!SecondCategory) {
                setSecondCategory(value);
              } else if (!ThirdCategory) {
                setThirdCategory(value);
              }
            } else {
              // If 3 checkboxes are already selected, update the constants based on the latest choice
              if (FirstCategory === value) {
                setFirstCategory(null);
              } else if (SecondCategory === value) {
                setSecondCategory(null);
              } else if (ThirdCategory === value) {
                setThirdCategory(null);
              }
            }
          };
          
    
        // CHOOSING PROJECT FROM

        const [ProjectForm, setProjectForm] = useState<string | null>(null);

        // Handler function to capture the selected radio button value
        const handleProjectForm = (event: ChangeEvent<HTMLInputElement>) => {
            setProjectForm(event.target.value);
        };

        // PROJECT INFORMATION

        const [ProjectTitle, setProjectTitle] = useState<string | null>(null);
        const [ProjectSubtitle, setProjectSubtitle] = useState<string | null>(null);
        const [ProjectDiscribe, setProjectDiscribe] = useState<string | null>(null);
        const [ProjectConcept, setProjectConcept] = useState<string | null>(null);

        // UPLOAD PROJECT COVER

        const [ProjectFileSelection, setProjectFileSelection] = useState<{ 
            file: File; 
            previewURL: string; 
          } | null>(null);
          
        const [ProjectCoverPicture, setProjectCoverPicture] = useState<string | null>(null);

        const handleSubmissionProjectProcess = async (
            file: File,
            setProjectCoverPicture: React.Dispatch<React.SetStateAction<string | null>>
          ) => {
            try {
              const formData = new FormData();
              formData.append("file", file);
          
              const metadata = JSON.stringify({ name: file.name });
              formData.append("pinataMetadata", metadata);
          
              const options = JSON.stringify({ cidVersion: 0 });
              formData.append("pinataOptions", options);
          
              const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${PINATA_JWT}`,
                },
                body: formData,
              });
          
              const resData = await res.json();
              setProjectCoverPicture(resData.IpfsHash);
              console.log(resData);
            } catch (error) {
              console.error("Error uploading file:", error);
            }
          };
          

          const UploadPinataProjectCover = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
          
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setProjectFileSelection({
                  file,
                  previewURL: reader.result as string, // Ensure it's a string
                });
              };
              reader.readAsDataURL(file);
            }
          };
          
    
          const handleProjectSubmission = async () => {
            if (ProjectFileSelection) {
              await handleSubmissionProjectProcess(ProjectFileSelection.file, setProjectCoverPicture);
            }
          };
          
    
        useEffect(() => {
            handleProjectSubmission();
        }, [ProjectFileSelection]); 

    
    // PROJECT ATOM DATA

    const MAX_SUPPLY_TEMPLATE = 10


    // This is NFT-level specific data that can NOT be modified
    const NFT_IMMUTABLE_DATA = [
        { key: 'series', value: ['uint16', 1] },
        { key: 'marketplace', value: ['string', "xmarket"] },
        { key: 'project_type', value: ['string', ProjectType] },
        { key: 'project_title', value: ['string', ProjectTitle] },
        { key: 'satate_of_project', value: ['string', ""] },
        { key: 'image', value: ['string', ProjectCoverPicture] },
    ]

    // This is NFT-level specific data that can be modified
    const NFT_MUTABLE_DATA = [
        { key: 'model', value: ['string', ""] },
        { key: 'video', value: ['string', ""] },
        { key: 'audio', value: ['string', ""] },

        { key: 'project_owners', value: ['string', ""] },

        { key: 'project_subtitle', value: ['string', ProjectSubtitle] },
        { key: 'project_discribe', value: ['string', ProjectDiscribe] },
        { key: 'project_discribe_features', value: ['string', ProjectConcept] }, 

        { key: 'categorie_first', value: ['string', FirstCategory] },
        { key: 'categorie_second', value: ['string',SecondCategory] },
        { key: 'categorie_third', value: ['string', ThirdCategory] },

        { key: 'legal_status', value: ['string', ""] },
        { key: 'location', value: ['string', ""] },

        { key: 'funding_goal', value: ['string', ""] },
        { key: 'funding_coverage', value: ['string', ""] },
        { key: 'funding_end_date', value: ['string', ""] },

        { key: 'page_content', value: ['string', ""] },

        { key: 'vote_yes', value: ['string', ""] },
        { key: 'vote_no', value: ['string', ""] },
    ]

    // CREATE TEMPLATE FUNCTION
    async function atomCreationTemplate() {

        await session?.transact(
            {
                actions: [
                    {
                        account: "atomicassets",
                        name: "createtempl",
                        data: {
                            authorized_creator: `${session?.auth.actor.toString()}`,
                            collection_name: GeneratedCollectionName,
                            schema_name: GeneratedCollectionName,
                            transferable: true,
                            burnable: true,
                            max_supply: MAX_SUPPLY_TEMPLATE,
                            immutable_data: NFT_IMMUTABLE_DATA
                        },
                        authorization: [{ actor: `${session?.auth.actor.toString()}`, permission: `${session?.auth.permission.toString()}` }],
                        
                    }
                ]
            },
            {broadcast: true}),

        console.log(`Template created!`)     
    }

    // CREATE NFT FUNCTION
    async function atomCreationNFT() {

        await session?.transact(
            {
                actions: [
                    {
                        account: "atomicassets",
                        name: "mintasset",
                        data: {
                            authorized_minter: `${session?.auth.actor.toString()}`,
                            collection_name: GeneratedCollectionName,
                            schema_name: GeneratedCollectionName,
                            template_id: TamplateID,
                            new_asset_owner: `${session?.auth.actor.toString()}`,
                            immutable_data: NFT_IMMUTABLE_DATA,
                            mutable_data: NFT_MUTABLE_DATA,
                            tokens_to_back: []
                        },
                        authorization: [{ actor: `${session?.auth.actor.toString()}`, permission: `${session?.auth.permission.toString()}` }],
                        
                    }
                ]
            },
            {broadcast: true}),

        console.log(`NFT created!`)      
    }


    // STEPS

        const HandleCreationWay = () => {
            setcreationWay(false);
            setnewWorkspace(true);
            setCollectionReadyStatus(true)
        };

        const HandleCreationCollection = () => {
            atomCreationCollection();
            setcreationWay(false);
            setnewWorkspace(false);
            setnewCollection(true);
        };

        const HandleNoCreationCollection = () => {
            setcreationWay(false);
            setnewWorkspace(false);
            setnewCollection(true);
        };

        const HandleNewProject = () => {
            atomCreationSchema();
            setcreationWay(false);
            setnewWorkspace(false);
            setnewCollection(false);
            setnewProject(true);
        };

        const HandleDescribe = () => {
            setcreationWay(false);
            setnewWorkspace(false);
            setnewCollection(false);
            setnewProject(false);
            setdescribeConcept(true);
        };

        const HandleConcept = () => {
            atomCreationTemplate();
            setcreationWay(false);
            setnewWorkspace(false);
            setnewCollection(false);
            setdescribeConcept(false);
            setnewProject(false);
            setdescribeProject(true);
        };

        const HandleMint = () => {
            atomCreationNFT()
        };


        // SLIDER
        const [currentSlide, setCurrentSlide] = useState(0);
        
        const nextSlide = () => {
            setCurrentSlide((prev) => (prev + 1) % FilteredCollections.length);
        };
        
        const prevSlide = () => {
            setCurrentSlide((prev) => (prev - 1 + FilteredCollections.length) % FilteredCollections.length);
        };

        console.log(FirstCategory)
        console.log(SecondCategory)
        console.log(ThirdCategory)
        console.log(ProjectType)
        console.log(ProjectForm)
        console.log(ProjectCoverPicture)
        console.log(ProjectSubtitle)
        console.log(ProjectTitle)
        console.log(FilteredTemplate)
        console.log(TamplateID)
        

  return (
    <div>
      <MainNavigation />

        <div className='creation_way_block'>

            {creationWay && (
                <div>
                    <div className='creation_way_block_title_home'><p>Workspace</p></div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Choose workspace</p></div>

                        <div className='uploadInner2'>

                            {FilteredCollections.length === 0 && (
                                <p style={{position: 'absolute'}}>no spaces here</p>
                            )}
                            <div className="main">
                                <button className="prevButton" onClick={prevSlide}>Prev</button>
                                <div className="sliderContainer">
                                    {FilteredCollections
                                        .map((filteredCollections, index) => (
                                            <div>
                                                <div
                                                className="slider"
                                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                                >                                             
                                                    <div className='slide'>
                                                        <div className='chosed_collection_slide_info'>
                                                            <p>{filteredCollections.collection.collection_name}</p>
                                                            <p>{filteredCollections.collection.name}</p>
                                                        </div>
                                                        <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${filteredCollections.collection.img}`} alt="" />
                                                        <div className='chose_collection' onClick={() => handleChosedCollectionData(filteredCollections.collection.collection_name, filteredCollections.collection.name, filteredCollections.collection.img)}><p>choose collection</p></div>
                                                    </div>                                                           
                                                </div>
                                            </div>
                                    ))}
                                </div>
                                <button className="nextButton" onClick={nextSlide}>Next</button>
                            </div>
                        </div>
                    </div>

                    <div className='beTheFirst' >
                        <div className='buttonStart'>
                            <div className='text' onClick={handleGeneratedCollectionName}>Or create a new one</div>
                        </div>
                    </div>

                    {CollectionName === null ? (
                        <div className='beTheFirst' style={{opacity: 0.2}}>
                            <div className='buttonStart'>
                                <div className='text' >Next</div>
                            </div>
                        </div>
                    ) : (
                        <div className='beTheFirst'>
                            <div className='buttonStart'>
                                <div className='text' onClick={() => HandleCreationWay()}>Next</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {newWorkspace && (
                <div>
                    <div className='creation_way_block_title_home'><p>New workspace</p></div>
                    
                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Set a name for your workspace</p></div>

                        <div className='creation_way_project_type_input'>
                        <input 
  type="text" 
  onChange={(e) => setCollectionName(e.target.value)} 
  placeholder="Workspace name" 
  value={CollectionName || ''} // 👈 Converts null to an empty string
/>


                            <div className='hint'>Keep it simple</div>
                        </div>        
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Workspace  Thumbnail</p></div>

                        <div className='uploadInner2'>
                            {FileSelection === null ? (
                                <div className='uploadIcon'>
                                    <Image className='xlIcon' alt="" src={AddFileIcon} />
                                    <p className="text-center mt--10" style={{color: "#292929"}}>PNG, GIF, JPG.</p>
                                </div>
                            ) : (
                                <div className='collection_preview_cover'>
                                    {FileSelection && (
                                        <img
                                        src={FileSelection.previewURL}
                                        alt="Preview"
                                        />
                                    )}
                                </div>
                            )}


                            <input type="file" onChange={UploadPinataCollectionCover}/>

                            {CollectionCoverPicture && (
                                <img
                                className='collection_uploaded_cover'
                                src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${CollectionCoverPicture}`}
                                alt="IPFS Image"
                                />
                            )}

                        </div>
                    </div>

                    {CollectionCoverPicture === null || CollectionName === null ? (
                        <div className='beTheFirst' style={{opacity: 0.2}}>
                            <div className='buttonStart'>
                                <div className='text'>Next</div>
                            </div>
                        </div>
                    ) : (
                        <div className='beTheFirst'>
                            <div className='buttonStart'>
                                <div className='text' onClick={() => CollectionReadyStatus === true ? HandleNoCreationCollection() : HandleCreationCollection()}>Next</div>
                            </div>
                        </div>
                    )}

                </div>
            )}

            {newCollection && (
                <div>
                <div className='creation_way_block_title_home'><p>Project status</p></div>

                <div className='creation_way_project_type'>
                    <div className='creation_way_project_type_title'><p>State of project</p></div>

                    <div className='frameParent'>
                        <div className='frameGroup'>

                            <div className='frameWrapper3' style={{background: ProjectType === "Idea" ? '#0012ff' : ''}}>
                                <input
                                    className='projecttype_radio'
                                    type="radio"
                                    value="Idea"
                                    checked={ProjectType === "Project"}
                                    onChange={handleRadioChange}
                                />
                                <div className='happyParent'>
                                    <Image className='happyIcon' alt="" src={IdeaIcon} />
                                    <div className='idea'>Idea</div>
                                </div>
                            </div>

                            <div className='frameWrapper3' style={{background: ProjectType === "Prototype" ? '#0012ff' : ''}}>
                                <input
                                    className='projecttype_radio'
                                    type="radio"
                                    value="Prototype"
                                    checked={ProjectType === "Prototype"}
                                    onChange={handleRadioChange}
                                />
                                <div className='happyParent'>
                                    <Image className='happyIcon' alt="" src={PrototypeIcon} />
                                    <div className='idea'>Prototype</div>
                                </div>
                            </div>

                            <div className='frameWrapper3' style={{background: ProjectType === "Product" ? '#0012ff' : ''}}>
                                <input
                                    className='projecttype_radio'
                                    type="radio"
                                    value="Product"
                                    checked={ProjectType === "Product"}
                                    onChange={handleRadioChange}
                                />
                                <div className='happyParent'>
                                    <Image className='happyIcon' alt="" src={ProductIcon} />
                                    <div className='idea'>Product</div>
                                </div>
                            </div>

                            <div className='frameWrapper3' style={{background: ProjectType === "Event" ? '#0012ff' : ''}}>
                                <input
                                    className='projecttype_radio'
                                    type="radio"
                                    value="Event"
                                    checked={ProjectType === "Event"}
                                    onChange={handleRadioChange}
                                />
                                <div className='happyParent'>
                                    <Image className='happyIcon' alt="" src={EventIcon} />
                                    <div className='idea'>Event</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='creation_way_project_section'>
                    <div className='creation_way_project_section_title'><p>Up to 3 categories</p></div>

                    <div className='creation_way_project_section_block'>
                        <div className='uploadInner'>
                            
                            <div className='frameParent_options'>
                         
                                <div className='category_option_block'>
                                        {[
                                                "Fashion",
                                                "Games",
                                                "NFT",
                                                "AI",
                                                "Wearables",
                                                "Activism",
                                                "Events",
                                                "Music",
                                                "Children",
                                                "Toys",
                                                "STEM",
                                                "Productivity",
                                                "Art",
                                                "Doge",
                                                "Memes",
                                                "Health",
                                                "Design",
                                                "Education",
                                                "Beauty",
                                                "Space",
                                                "Food",
                                                "Plants",
                                                "Climate",
                                                "Home",
                                                "Vehicles",
                                                "Electronics",
                                                "Fitness",
                                                "Community",
                                                "Fanbases",
                                                "Energy",
                                                "Electricity",
                                                "Dating",
                                                "Cyberpunk",
                                                "Holograms",
                                                "Virtual Reality",
                                                "Culture",
                                                "Lamps",
                                                "Green Tech",
                                                "Real Estate",
                                                "Communication",
                                                "Vlog",
                                                "Blog",
                                                "Comics",
                                                "Flying",
                                                "Social",
                                                "Sports",
                                                "Movies",
                                                "News",
                                                "Engines",
                                                "Physics",
                                                "Construction",
                                                "Global Tipping Points",
                                                "Water",
                                                "Air",
                                                "Animals",
                                                "Rockets",
                                                "Longevity",
                                                "Life Quality",
                                                "Intercultural",
                                                "Safety",
                                                "Furniture"
                                        ].map((option) => (
                                            <div key={option}>
                                            <label className='frameWrapper' htmlFor={`${option}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`${option}`}
                                                    value={`${option}`}
                                                    checked={SelectedCategory.includes(`${option}`)}
                                                    onChange={() => handleSelectedCategory(`${option}`)}
                                                    disabled={SelectedCategory.length === 3 && !SelectedCategory.includes(`${option}`)}
                                                />
                                                <span className="fashionWrapper">
                                                    <div className='fashion'>
                                                        <p>{option}</p>
                                                    </div>
                                                </span>
                                        </label>
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='creation_way_project_section'>
                    <div className='creation_way_project_type_title'><p>Form of product</p></div>

                    <div className='creation_way_project_section_block'>
                        <div className='formOfProductParent'>
                            <div className='frameParent43'>
                                <div className='groupChild' />
                                    <div className='radioButtonGroup'>
                                        <div className='radioWithLabel'>
                                            <input
                                                className='projecttype_radio'
                                                type="radio"
                                                value="Digital"
                                                checked={ProjectForm === "Digital"}
                                                onChange={handleProjectForm}
                                            />
                                            <div className='radio' style={{background: ProjectForm === "Digital" ? '#0012ff' : '', border: ProjectForm === "Digital" ? '3px solid #999999' : ''}}/>
                                            <div className='digital'>Digital</div>
                                        </div>
                                        <div className='radioWithLabel'>
                                            <input
                                                className='projecttype_radio'
                                                type="radio"
                                                value="Physical"
                                                checked={ProjectForm === "Physical"}
                                                onChange={handleProjectForm}
                                            />
                                            <div className='radio' style={{background: ProjectForm === "Physical" ? '#0012ff' : '', border: ProjectForm === "Physical" ? '3px solid #999999' : ''}}/>
                                            <div className='digital'>Physical</div>
                                        </div>
                                        <div className='radioWithLabel'>
                                            <input
                                                className='projecttype_radio'
                                                type="radio"
                                                value="Hybrid"
                                                checked={ProjectForm === "Hybrid"}
                                                onChange={handleProjectForm}
                                            />
                                            <div className='radio' style={{background: ProjectForm === "Hybrid" ? '#0012ff' : '', border: ProjectForm === "Hybrid" ? '3px solid #999999' : ''}}/>
                                            <div className='digital'>Hybrid</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {ProjectType === null || ProjectForm === null || FirstCategory === null ? (
                    <div className='beTheFirst' style={{opacity: 0.2}}>
                        <div className='buttonStart'>
                            <div className='text'>Next</div>
                        </div>
                    </div>
                ) : (
                    <div className='beTheFirst' >
                        <div className='buttonStart'>
                            <div className='text' onClick={() => HandleNewProject()}>Next</div>
                        </div>
                    </div>
                )}

            </div>
            )}

            {newProject && (
                <div>
                    <div className='creation_way_block_title_home'><p>New project</p></div>
                    
                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Project title</p></div>

                        <div className='creation_way_project_type_input'>
                            <input type='email' onChange={(e)=>setProjectTitle(e.target.value === "" ? null : e.target.value)} placeholder="Project title" value={ProjectTitle || ""}/>
                            <div className='hint'>Keep it short and catchy</div>
                        </div>        
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Subtitle</p></div>

                        <div className='creation_way_project_type_input'>
                            <input type='email' onChange={(e)=>setProjectSubtitle(e.target.value === "" ? null : e.target.value)} placeholder="Subtitle" value={ProjectSubtitle || ""}/>
                            <div className='hint'>Explain in few words what you’re building</div>
                        </div>        
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Project Thumbnail</p></div>

                        <div className='uploadInner2'>
                            {ProjectFileSelection === null ? (
                                <div className='uploadIcon'>
                                    <Image className='xlIcon' alt="" src={AddFileIcon} />
                                    <p className="text-center mt--10" style={{color: "#292929"}}>PNG, GIF, JPG.</p>
                                </div>
                            ) : (
                                <div className='collection_preview_cover'>
                                    {ProjectFileSelection && (
                                        <img
                                        src={ProjectFileSelection.previewURL}
                                        alt="Preview"
                                        />
                                    )}
                                </div>
                            )}


                            <input type="file" onChange={UploadPinataProjectCover}/>

                            {ProjectCoverPicture && (
                                <img
                                className='collection_uploaded_cover'
                                src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${ProjectCoverPicture}`}
                                alt="IPFS Image"
                                />
                            )}

                        </div>
                    </div>

                    {ProjectCoverPicture === null || ProjectSubtitle === null || ProjectTitle === null ? (
                        <div className='beTheFirst' style={{opacity: 0.2}}>
                            <div className='buttonStart'>
                                <div className='text'>Next</div>
                            </div>
                        </div>
                    ) : (
                        <div className='beTheFirst' >
                            <div className='buttonStart'>
                                <div className='text' onClick={() => HandleDescribe()}>Next</div>
                            </div>
                        </div>
                    )}

                </div>
            )}

            {describeConcept && (
                <div>
                    <div className='creation_way_block_title_home'><p>Describe concept</p></div>
                    
                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>What will the product make better?</p></div>

                        <div className='creation_way_project_type_input'>
                            <textarea onChange={(e)=>setProjectDiscribe(e.target.value === "" ? null : e.target.value)} placeholder="Project title" value={ProjectDiscribe || ""}/>
                            <div className='hint'>Either there is a problem you solve or something you will make better or cooler. Keep in mind that in both cases the creativity and fun shouldn’t be missing</div>
                        </div>        
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Describe the how and it’s features</p></div>

                        <div className='creation_way_project_type_input'>
                            <textarea onChange={(e)=>setProjectConcept(e.target.value === "" ? null : e.target.value)} placeholder="Subtitle" value={ProjectConcept || ""}/>
                            <div className='hint'>Keep it simple</div>
                        </div>        
                    </div>

                    {ProjectConcept === null || ProjectDiscribe === null ? (
                        <div className='beTheFirst' style={{opacity: 0.2}}>
                            <div className='buttonStart'>
                                <div className='text'>Next</div>
                            </div>
                        </div>
                    ) : (
                        <div className='beTheFirst' >
                            <div className='buttonStart'>
                                <div className='text' onClick={() => HandleConcept()}>Next</div>
                            </div>
                        </div>
                    )}

                </div>
            )}

            {describeProject && (
                <div>
                    <div className='creation_way_block_title_home'>
                    <p>Describe concept {FilteredTemplate?.[0]?.template_id || 'N/A'}</p>
                    </div>
                    
                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>What will the product make better? </p></div>

                        <div className='creation_way_project_type_input_text'>
                            <div className='hint' style={{marginLeft: -23}}>Either there is a problem you solve or something you will make better or cooler. Keep in mind that in both cases the creativity and fun shouldn’t be missing</div>
                        </div>        
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Project Title</p></div>

                        <div className='uploadInner2'>
                            {ProjectCoverPicture && (
                                <img
                                className='collection_uploaded_cover'
                                src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${ProjectCoverPicture}`}
                                alt="IPFS Image"
                                />
                            )}
                        </div>
                    </div>

                    <div className='creation_way_project_type_thumb'>
                        <div className='creation_way_project_type_title_input'><p>Review your concept</p></div>

                        <div className='creation_way_project_type_title_input'>
                            <p>Project Concept  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. 
                            Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        </div>        
                    </div>
                    
                    {TamplateID === null ? (
                        <div className='beTheFirst' style={{opacity: 0.5}}>
                            <div className='buttonStart'>
                                <div className='text'>
                                    Loading
                                        <div className="arrows">
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>.</span>
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>.</span>
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>.</span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='beTheFirst' >
                            <div className='buttonStart'>
                                <div className='text' onClick={() => HandleMint()}>                                
                                    <div className='text' >
                                        <div className="arrows">
                                            <span className="arrow">></span>
                                            <span className="arrow">></span>
                                            <span className="arrow">></span>
                                        </div>
                                        <span style={{marginLeft: 10, marginRight: 10}}>Mint</span>
                                        <div className="arrows">
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>></span>
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>></span>
                                            <span className="arrow" style={{transform: "scaleX(-1)"}}>></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}

        </div>
  
    </div>
  )
}