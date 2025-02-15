"use client"

import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import { IAsset } from "atomicassets/build/API/Explorer/Objects";
import Image from "next/image";
import { MainNavigation } from '@/components/header/header';
import { CreatorFlow } from '@/components/CreatorFlow/CreatorFlow';
import React, { useMemo, Component, useState, useCallback, useEffect, useRef } from 'react';
import { apiCoreUseStoreActions, apiCoreUseStoreState } from '@/store/hooks';
import { createClient } from '@supabase/supabase-js';
import EditorJS from "@editorjs/editorjs";

// THREE
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { Group, AnimationMixer, AnimationClip } from "three";

type FetchFix = (input?: Request | string, init?: RequestInit) => Promise<Response>;
const explorer = new ExplorerApi(`${process.env.NEXT_PUBLIC_ATOMIC_ENDPOINT!}`, 'atomicassets',{fetch:fetch as any});


// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function ProfilePage (params: { params: { username: string } }) {

  const {connect} = apiCoreUseStoreActions(state=>state.auth);
  const {session} = apiCoreUseStoreState(state=>state.auth.data);

  const [TemplatesData, setTemplates] = useState<ITemplate[]>([]);
  const [AssetsData, setAssetsData] = useState<IAsset | undefined>(undefined);
  const [filteredTemplatesData, setFilteredTemplatesData] = useState<ITemplate | undefined>(undefined);

  const [Show3DModal, setShow3DModal] = useState(false);
  const [ShowEditor, setShowEditor] = useState(false);

  const handleShow3DModal = () => {
    setShow3DModal(prevState => !prevState);
  };

  const handleShowEditor = () => {
    setShowEditor(prevState => !prevState);
  };

  // 3D LOADER
  interface RotatingModelProps {
    url: string;
    scale?: number;
    rotationSpeed?: number;
    pauseDuration?: number;
  }
  
  const RotatingModel: React.FC<RotatingModelProps> = ({
    url,
    scale = 1,
    rotationSpeed = 11.01,
    pauseDuration = 1000,
  }) => {
    const { scene, animations } = useGLTF(url) as {
      scene: Group;
      animations: AnimationClip[];
    };
  
    const modelRef4 = useRef<Group>(null);
    const mixerRef = useRef<AnimationMixer | null>(null); // Typed as AnimationMixer
  
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true;
        (child as THREE.Mesh).receiveShadow = false;
      }
    });
  
    useEffect(() => {
      if (animations.length) {
        mixerRef.current = new THREE.AnimationMixer(scene);
  
        animations.forEach((clip) => {
          const action = mixerRef.current!.clipAction(clip);
          action.play();
        });
      }
  
      return () => {
        if (mixerRef.current) {
          mixerRef.current.stopAllAction();
          mixerRef.current = null;
        }
      };
    }, [animations, scene]);
  
    useFrame((_, delta) => {
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
    });
  
    return (
      <Center>
        <primitive ref={modelRef4} object={scene} scale={scale} castShadow />
      </Center>
    );
  };

  // TEMPLATE/OWNER CHECK
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const templates = await explorer.getTemplates();
        
        const TemplateCheck = templates.find(template => template.template_id === params.params.username);
        if (TemplateCheck !== undefined) {
          setFilteredTemplatesData(TemplateCheck);
        } else {
          setFilteredTemplatesData(undefined);
        }

        setTemplates(templates);

      } catch (error) {
        console.error('Error fetching template details:', error);
      }
    };

    fetchData();

    const fetchDataAsset = async () => {
      try {

        const FilteredAssetData = await explorer.getAssets();

        const AssetCheck = FilteredAssetData.find(
          (assets) => assets.template && assets.template.template_id === params.params.username
        );

        if (AssetCheck) {
          setAssetsData(AssetCheck); // Store it as an array
          setprojectID(AssetCheck.template?.template_id ? [AssetCheck.template.template_id.toString()] : []);
        } else {
          setAssetsData(undefined); // Set an empty array if no match is found
          setprojectID([]); // Provide a default empty string or a fallback value
        }

      } catch (error) {
        console.error('Error fetching template details:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchDataAsset();
    }, 1000); // Check condition every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
    
  }, []);

  useEffect(() => {
    if (session?.auth?.actor) {
      const PJOwner = session.auth.actor.toString();
      setprojectOwner(PJOwner);
    }
  }, [session]);

  console.log(AssetsData);
  // EDITOR 
  const [page_content, setPage_content] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorContentLoaded, setEditorContentLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [saveEdits, setsaveEdits] = useState(false);
  const [cid5, setCid5] = useState();
  const [editorInstance, setEditorInstance] = useState(null);
  const [contentData, setContentData] = useState('');

  const pinataJWTKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZjE3MzQ2Mi1jNWVmLTRjM2YtYTE3ZC03YTNmZDg5Zjk4Y2MiLCJlbWFpbCI6ImNvbnN0YW50aW4ucmF1dGVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMzZjMGFhZTAzYzU0NzdmZTgxZCIsInNjb3BlZEtleVNlY3JldCI6IjYwM2I1MzhjZTU3MTZlMTAzZWU3YzIwMjVkZGE1NTMxNjE1ZmUxODZlMmUwZTkxYzRhMzkxMWUyOTEyMjVhOWQiLCJpYXQiOjE2OTg0MDI1NzJ9.DNJItYEPAZV4p3oGX-nuAeHcgAgi2zEOMYHRi9O2bOY";
  const GATEWAY_URL = "coral-military-marten-346.mypinata.cloud";
  const GATEWAY_TOKEN = "t7XY-6qSHcuYCDI3H64lRv-6nLBi6sdab5pnnTCaXyQ9U1fF4tta37ZMXPR7xlYK";


  const handleChange_Editor = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPage_content(event.target.value);
  };

  const loadEditorDataFromAPI = async () => {
    if (!initialized || loading || editorContentLoaded || !AssetsData || !editorInstance) return; // ✅ Check if editorInstance is defined
    setLoading(true);
  
    try {
      const response = await fetch(`https://proton.api.atomicassets.io/atomicassets/v1/assets/${AssetsData.asset_id}`);
      const data = await response.json();
  
      if (AssetsData.mutable_data?.page_content) { // ✅ Ensure page_content exists
        const parsedData = JSON.parse(AssetsData.mutable_data.page_content);
  
        if (editorInstance) { // ✅ Check again before calling render
          await (editorInstance as EditorJS).render(parsedData);

        } else {
          console.warn("Editor instance is not initialized.");
        }
      }
  
      setEditorContentLoaded(true);
      console.log('Editor content set from API data successfully');
    } catch (error) {
      console.error('Error fetching editor data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    loadEditorDataFromAPI();
  }, [initialized, loading, editorContentLoaded]);
  
  // Initialize Editor.js instance
  const initializeEditor = async () => {
              setLoading(true);
              setDataLoaded(true);
              try {
              const { default: Header } = await import('@editorjs/header');
              const { default: EditorJs } = await import('@editorjs/editorjs');
              const { default: Quote } = await import('@editorjs/quote');
              const { default: Table } = await import('@editorjs/table');
              const { default: NestedList } = await import('@editorjs/nested-list');
              const { default: InlineCode } = await import('@editorjs/inline-code');
              const { default: Delimiter } = await import('@editorjs/delimiter');
  
              const editor = new EditorJs({
                holder: 'editorjs',
                tools: {
                  header: { class: Header, inlineToolbar: true },
                  list: { class: NestedList, inlineToolbar: true },
                  // FIXME: some fix need
                  image: {
                      class: require('@editorjs/image'),
                      inlineToolbar: true,
                      config: {
                          buttonContent: '<img src={`https://coral-military-marten-346.mypinata.cloud/ipfs/${cid5}?pinataGatewayToken=t7XY-6qSHcuYCDI3H64lRv-6nLBi6sdab5pnnTCaXyQ9U1fF4tta37ZMXPR7xlYK`} alt="_"/>',
                          uploader: {
                              uploadByFile(file) {
                                  return new Promise(async (resolve, reject) => {
                                      try {
                                          console.log('Starting file upload...');
                              
                                          // Create FormData object to prepare file upload
                                          const formData = new FormData();
                                          formData.append("file", file, { filename: file.name });
                              
                                          // Prepare metadata and options as JSON strings
                                          const metadata = JSON.stringify({
                                              name: file.name,
                                          });
                                          formData.append("pinataMetadata", metadata);
                              
                                          const options = JSON.stringify({
                                              cidVersion: 0,
                                          });
                                          formData.append("pinataOptions", options);
                              
                                          // Log FormData contents (for debugging purposes)
                                          for (const [key, value] of formData.entries()) {
                                              console.log(`${key}: ${value}`);
                                          }
                              
                                          // Make a POST request to Pinata API for file upload
                                          const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                                              method: "POST",
                                              headers: {
                                                  Authorization: `Bearer ${pinataJWTKey}`, // Ensure 'pinataJWTKey' is defined and valid
                                              },
                                              body: formData,
                                          });
                              
                                          // Check if the request was successful (HTTP status 200-299)
                                          if (!res.ok) {
                                              throw new Error(`File upload failed with status: ${res.status}`);
                                          }
                              
                                          // Extract the IPFS hash from the response
                                          const ipfsHash = await res.json();
                                          console.log('File upload successful. IPFS Hash:', ipfsHash);
  
                                          const WE = ipfsHash.IpfsHash;
  
                                          resolve({ success: 1, file: { url: `https://coral-military-marten-346.mypinata.cloud/ipfs/${WE}?pinataGatewayToken=t7XY-6qSHcuYCDI3H64lRv-6nLBi6sdab5pnnTCaXyQ9U1fF4tta37ZMXPR7xlYK` } });
  
                                          setCid5(WE)
                                      } catch (error) {
                                          console.error('File upload error:', error);
                                          reject('Upload failed');
                                      }
                                  });
                              },
                              
                          },
                      },
                  },
                  quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: "CMD+SHIFT+O",
                    config: {
                      quotePlaceholder: "Enter a quote",
                      captionPlaceholder: "Quote's author",
                    },
                  },
                  table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                      rows: 2,
                      cols: 3,
                    },
                  },
                  inlineCode: {
                    class: InlineCode,
                    shortcut: "CMD+SHIFT+M",
                  },
                  code: {
                    class: require('@editorjs/code'),
                    shortcut: "CMD+SHIFT+M",
                  },
                  attaches: {
                    class: require('@editorjs/attaches'),
                    inlineToolbar: true,
                    config: {
                      // FIXME: fix the path
                      endpoint: "/api/uploadImage",
                    },
                  },
                  delimiter: Delimiter,
                },
                onChange: () => {
                  // Handle changes here if needed
                },
              });
  
              setEditorInstance(editor);
              setInitialized(true);
  
              } catch (error) {
                  console.error('Error initializing editor:', error);
              } finally {
                setLoading(false);
              }
  
  };

  // Save content function
  const saveContent = async () => {
    if (editorInstance) {
      const savedData = await editorInstance.save();
      const jsonData = JSON.stringify(savedData);
      setContentData(jsonData);
      setsaveEdits(true);
    }
  };

  const NFT_MUTABLE_DATA = [
    { key: 'model', value: ['string', ""] },
    { key: 'video', value: ['string', ""] },
    { key: 'audio', value: ['string', ""] },

    { key: 'project_owners', value: ['string', ""] },

    { key: 'project_subtitle', value: ['string', `${AssetsData?.mutable_data?.project_subtitle}`] },
    { key: 'project_discribe', value: ['string', `${AssetsData?.mutable_data?.project_discribe}`] },
    { key: 'project_discribe_features', value: ['string', `${AssetsData?.mutable_data?.project_discribe_features}`] }, 

    { key: 'categorie_first', value: ['string', `${AssetsData?.mutable_data?.categorie_first}`] },
    { key: 'categorie_second', value: ['string', `${AssetsData?.mutable_data?.categorie_second}`] },
    { key: 'categorie_third', value: ['string', `${AssetsData?.mutable_data?.categorie_third}`] },

    { key: 'legal_status', value: ['string', ""] },
    { key: 'location', value: ['string', ""] },

    { key: 'funding_goal', value: ['string', ""] },
    { key: 'funding_coverage', value: ['string', ""] },
    { key: 'funding_end_date', value: ['string', ""] },

    { key: 'page_content', value: ['string', contentData] },

    { key: 'vote_yes', value: ['string', ""] },
    { key: 'vote_no', value: ['string', ""] },
  ]

  async function UpdateMutableData() {

    await session.transact(
        {
            // Create Template
            actions: [
                {
                    account: "atomicassets",
                    name: "setassetdata",
                    data: {
                        authorized_editor: `${session?.auth.actor.toString()}`,
                        asset_owner: `${session?.auth.actor.toString()}`,
                        asset_id: `${AssetsData.asset_id}`,
                        new_mutable_data: NFT_MUTABLE_DATA
                    },
                    authorization: [{ actor: `${session?.auth.actor.toString()}`, permission: `${session?.auth.permission.toString()}` }],
                    
                }
            ]
        },
        {broadcast: true})    
  }

  const renderContentBlocks = () => {
    if (!AssetsData || !AssetsData.mutable_data || !AssetsData.mutable_data.page_content) {
      return null; // Return null if asset data or page_content is missing or not yet loaded
    }

    // Parse blocks from page_content, handle potential parsing errors
    let blocks = [];
    try {
      const parsedData = JSON.parse(AssetsData.mutable_data.page_content);
      blocks = parsedData.blocks || []; // Use an empty array if blocks are null or undefined
    } catch (error) {
      console.error('Error parsing page content:', error);
      // Optionally handle parsing error here (e.g., set blocks to empty array)
      blocks = [];
    }

    return blocks.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index}>{block.data.text}</p>;
        case 'header':
          return <h2 key={index}>{block.data.text}</h2>;
        case 'link': <h2 key={index}>{block.data.text}</h2>;
        case 'quote':
          return (
            <div style={{marginBottom: 20}} key={index} dangerouslySetInnerHTML={{ __html: block.data.text }}></div>
          );
        case 'list':
          return (
            <ul key={index}>
              {block.data.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.content}</li>
              ))}
            </ul>
          );
        case 'image':
          return <img key={index} src={block.data.file.url} alt={block.data.caption} />;
        case 'code':
          return <pre key={index}>{block.data.code}</pre>;
        case 'rawHtml':
          return <div key={index} dangerouslySetInnerHTML={{ __html: block.data.html }} />;
        case 'delimiter':
          return <hr key={index} />;
        case 'table':
            if (block.data && block.data.content && Array.isArray(block.data.content)) {
                return (
                    <table key={block.id} style={{background: '#6b6b6b'}}>
                        <tbody>
                            {block.data.content.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            }
        case 'warning':
          return (
          <div key={block.id} className="warning">
              <h3>{block.data.title}</h3>
              <p>{block.data.message}</p>
          </div>
          );
        default:
          return null; // Handle unrecognized block types gracefully
      }
    });
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      renderContentBlocks();
    }, 1000); // Check condition every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Run effect whenever selectedFile1 changes 


  // TASKS
  const [taskTitle, settaskTitle] = useState('');
  const [taskContent, settaskContent] = useState('');
  const [taskLink, settaskLink] = useState('');
  const [taskEmail, settaskEmail] = useState('');
  const [taskPriority, settaskPriority] = useState('');
  const [taskStatus, settaskStatus] = useState('');
  const [taskPrice, settaskPrice] = useState('');
  const [projectID, setprojectID] = useState<string[]>([]); // ✅ Ensure it's an array
  const [projectOwner, setprojectOwner] = useState('');
  const [messageTask, setmessageTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert data into the 'posts' table
    const { data, error } = await supabase
      .from('Tasks')  // Replace with your table name
      .insert([{ taskTitle, taskContent, taskLink, taskEmail, taskPriority, taskStatus, taskPrice, projectID, projectOwner }]);

    if (error) {
      setmessageTask(`Error: ${error.message}`);
    } else {
      setmessageTask('Task added successfully!');
      settaskTitle('');
      settaskContent('');
      settaskLink('');
      settaskEmail('');
      settaskPriority('');
      settaskStatus('');
      settaskPrice('');
      setprojectID([]);
    }
  };

  const handleTaskDelete = async (e, id) => {
    e.preventDefault();

    // Delete data into the 'posts' table
    const response = await supabase
    .from('Tasks')
    .delete()
    .eq('id', id)

  };

  const [tasks, setTasks] = useState([]);
  const [loadingSupa, setloadingSupa] = useState(true);
  const [ShowCreateTask, setShowCreateTask] = useState(false);

  const handleShowCreateTask = () => {
    setShowCreateTask(prevState => !prevState);
  };

  // Fetch data from Supabase table
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('Tasks')  // Replace with your table name
      .select('*');  // Select all columns

    if (error) {
      console.log('Error fetching data:', error);
    } else {
      setTasks(data);  // Store fetched data in state
    }
    setloadingSupa(false);
  };

  useEffect(() => {
    fetchData();

    // Update data every 5ms
    const interval = setInterval(() => {
        fetchData();
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval
  }, [tasks]);  // Fetch data when the component mounts


  // REWARD
  const [ProductData, setProductData] = useState([]);
  const [loadingProductData, setloadingProductData] = useState(true);
  const [ShowCreateProduct, setShowCreateProduct] = useState(false);
  const [messageReward, setmessageReward] = useState('');

  const handleShowCreateProduct = () => {
    setShowCreateProduct(prevState => !prevState);
  };

  // Fetch data from Supabase table
  const fetchProductData = async () => {
    const { data, error } = await supabase
      .from('Products')  // Replace with your table name
      .select('*');  // Select all columns

    if (error) {
      console.log('Error fetching data:', error);
    } else {
      setProductData(data);  // Store fetched data in state
    }
    setloadingProductData(false);
  };

  useEffect(() => {
    fetchProductData();

    // Update data every 5ms
    const interval = setInterval(() => {
      fetchProductData();
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval
  }, [ProductData]);  // Fetch data when the component mounts

  const [productTitle, setproductTitle] = useState("");
  const [productPrice, setproductPrice] = useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    // Insert data into the 'posts' table
    const { data, error } = await supabase
      .from('Products')  // Replace with your table name
      .insert([{ productTitle, productPrice, projectID, projectOwner }]);

    if (error) {
      setmessageReward(`Error: ${error.message}`);
    } else {
      setmessageReward('Reward added successfully!');
      setproductTitle('');
      setproductPrice('');
      setprojectID([]);
    }
  };

  const handleBuyProduct = async (e, productTitle, productPrice) => {
    e.preventDefault();

    // Insert data into the 'posts' table
    const { data, error } = await supabase
      .from('PurchasedProducts')  // Replace with your table name
      .insert([{ purProductTitle: productTitle, purProductPrice: productPrice, projectID, projectOwner }]);

    if (error) {
      setmessageReward(`Error: ${error.message}`);
    } else {
      setmessageReward('Post added successfully!');
      setproductTitle('');
      setproductPrice('');
      setprojectID([]);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);  // State for selected product
  const [isModalOpen, setIsModalOpen] = useState(false);         // State for modal visibility

  const handleOpenModal = (product) => {
    setSelectedProduct(product);    // Set the clicked product data
    setIsModalOpen(true);           // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);          // Close the modal
    setSelectedProduct(null);       // Clear the selected product
  };

  return (
    <div>
      <MainNavigation />
      {TemplatesData
      .filter(templates => templates.template_id === params.params.username)
      .map((template, index) => (
            <div className="exporer_project_block_aling_project">

              <div className="exporer_project_title_block">
                <div className="exporer_project_title_name_block">
                  <div className="exporer_project_title_name"><p>Project Name: <span>{template.immutable_data.project_title}</span></p></div>
                  <div className="exporer_project_title_author"><p>Owner: {template.collection.author}</p></div>
                  <div className="exporer_project_title_project_id"><p>Project id: {template.template_id}</p></div>
                </div>

                <div className="exporer_project_title_pads_block">
                  <div className="exporer_project_title_pad_img">IMG</div>
                  <div className="exporer_project_title_pad_3d" onClick={handleShow3DModal}>3D</div>
                  <div className="exporer_project_title_pad_video">VIDEO</div>
                  <div className="exporer_project_title_pad_editor" onClick={() => {handleShowEditor()}}>Project Page</div>
                </div>
              </div>

              <div className="project_budget_pad"><p>Budjet: <span>{AssetsData?.mutable_data?.funding_goal}$</span></p></div>
              <div className="project_budget_type_pad"><p>Product Type: <span>{template.immutable_data.project_type}</span></p></div>

              <div className="project_progressline_block">
                <div className="project_tasks_title_info">
                  <p>Crowdfunding progress</p>
                </div>
                <div className="project_bonusitems_bonuce">
                  <div className="project_progressline_bar">
                    <div className="project_progressline_bar_live" style={{width: AssetsData?.mutable_data?.funding_goal / AssetsData?.mutable_data?.funding_coverage}}><p>{AssetsData?.mutable_data?.funding_coverage}$ of {AssetsData?.mutable_data?.funding_goal}$</p></div>
                  </div>
                </div>
              </div>

              <div className="project_vote_block">
                <div className="project_tasks_title_info">
                  <p>Voting</p>
                </div>
                <div className="project_bonusitems_bonuce">
                  <p>voted yes: <span>{AssetsData?.mutable_data?.vote_yes}</span></p>
                  <div className="project_buybonuce_pad"><p>yes</p></div>
                </div>
                <div className="project_bonusitems_bonuce">
                  <p>voted no: <span>{AssetsData?.mutable_data?.vote_no}</span></p>
                  <div className="project_buybonuce_pad"><p>no</p></div>
                </div>
                <div></div>
              </div>

              <div className="project_bonuceitems_block">
                <div className="project_tasks_title_info">
                  <p>Rewards</p>

                    {AssetsData?.owner === session?.auth.actor.toString() && (
                        <h4 onClick={() => handleShowCreateProduct()}>add option</h4>
                    )}
  
                </div>

                {ProductData
                  .filter(product => product.projectID === template.template_id)
                  .map((products) => (
                    <div key={products.id}>
                      <div className="project_bonusitems_bonuce">
                        <p>Tilte: <span>{products.productTitle}</span></p>
                        <p>Price: <span>{products.productPrice}$</span></p>
                        {session ? (                      
                          <div className="project_buybonuce_pad" onClick={() => handleOpenModal(products)}><p>buy</p></div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>                  
                ))}

                <div></div>
              </div>

              <div className="exporer_project">
                <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${template.immutable_data.image}`} alt="" />
              </div>

              {AssetsData?.mutable_data?.model ? (<div className='model_styling_block_dd' style={{display: Show3DModal ? 'block' : 'none'}}>
              <Canvas
                shadows // Enable shadow rendering
                camera={{ position: [0, 0.4, 7], fov: 28 }}
                style={{ width: '111px', height: '111px', borderRadius: '50%', position: 'absolute', marginTop: 15, marginLeft: 40, pointerEvents: 'none' }} // Set the canvas size here
              >
                {/* Lighting */}
                <ambientLight intensity={1.5} />

                <pointLight
                  position={[-1.1, 1.0, 3.9]} // Place the light above the model
                  intensity={3.6}
                  distance={10} // Set the distance for shadows to soften
                  decay={0.1} // Add decay for a more natural effect
                  castShadow // Enable shadow casting
                  shadow-mapSize={[500, 500]} // Resolution of the shadow map
                  shadow-bias={-0.005} // Control the bias to avoid shadow artifacts
                  shadow-radius={20} // Adjust shadow softness
                  shadow-color="black" // Set shadow color (usually black, but can be adjusted)
                  color="white"
                />

                {/* Flat Plane */}
                <mesh
                  position={[0, 0, -1.1]} // Lower the plane slightly
                  rotation={[-Math.PI / 90, 0, 0]} // Keep the plane flat
                  receiveShadow // Enable shadow reception for the plane
                >
                  <planeGeometry args={[8, 8]} />
                  <meshStandardMaterial 
                  color="white" 
                  emissive="white" // Make the plane glow
                  emissiveIntensity={0.1} // Adjust brightness of emissive color (higher = brighter)
                  />
                </mesh>

                {/* Rotating Model */}
                <RotatingModel url="https://api.iplayer.network/media/models/globe4.gltf"
                  scale={1.5}
                />

                {/* Orbit Controls */}
                <OrbitControls />
              </Canvas>
              </div>): (<div className='model_styling_block_dd' style={{display: Show3DModal ? 'block' : 'none'}}>
              </div>)}

              <div className="project_tasks_project_info">

                <div className="project_tasks">
                  <div className="project_tasks_title">
                    <p>Project Tasks</p>

                    {AssetsData?.owner === session?.auth.actor.toString() && (
                      <div className="project_createtasks_pad" onClick={() => handleShowCreateTask()}><p>Create task</p></div>
                    )}                      
       
                  </div>

                  {loadingSupa ? (
                      <p>Loading...</p>
                    ) : (
                      <ul>
                        {tasks
                        .filter(taskdata => taskdata.projectID === template.template_id)
                        .map((task) => (
                          <div key={task.id}>
                            
                            <div className="project_task">
                              <p>Tilte: <span>{task.taskTitle}</span></p>
                              <p>Content: <span>{task.taskContent}$</span></p>
                              <p>Link: <span>{task.taskLink}</span></p>
                              <p>Email: <span>{task.taskEmail}</span></p>
                              <p>Priority: <span>{task.taskPriority}</span></p>
                              <p>Status: <span>{task.taskStatus}</span></p>
                              <p>Budget: <span style={{color: '#ffbe84'}}>{task.taskPrice}</span></p>
                              
                              {task.projectOwner === session?.auth.actor.toString() && (
                                <div className="project_deletetasks_pad" onClick={(e) => handleTaskDelete(e, task.id)}><p>Delete</p></div>
                              )}
                                                               
                            </div>
                          </div>
                        ))}
                      </ul>
                  )}
                </div>

                <div className="project_project_info">
                  <div className="project_tasks_title_info">
                    <p>Project Info</p>
                  </div>

                  <div className="exporer_project_details_block">

                            <div className="property-wrapper tag_of_tags_box_aling">
                              <div className="exporer_project_details">
                                  <div className="exporer_project_details_tag"> </div>
                                  <div className="exporer_project_details_tag_info">
                          
                                  {AssetsData?.mutable_data?.project_subtitle} <br/>
                                  {AssetsData?.mutable_data?.project_discribe_features} <br/>
                                  {AssetsData?.mutable_data?.legal_status} <br/>
                                  {AssetsData?.mutable_data?.location} <br/>
                                  {AssetsData?.mutable_data?.categorie_first} <br/>
                                  {AssetsData?.mutable_data?.categorie_second} <br/>
                                  {AssetsData?.mutable_data?.categorie_third} <br/>
                                  </div>
                              </div>
                            </div>

                  </div>
                </div>

              </div>

              <div className="project_description_block">
                  <h4>About Project</h4>

                  <div className="project_description">
                            <div  className="property-wrapper tag_of_tags_box_aling">
                              <div className="exporer_project_details">
                                  <div className="project_description_aboutproject">

                                  <p>{AssetsData?.mutable_data?.project_discribe}</p>
                                  </div>
                              </div>
                            </div>
                  </div>

                  {ShowCreateTask && (
                    <div className="createtask_modal_block">
                      <div className="createtask_modal">
                        <h1>Add a New Post</h1>

                        <div className="createtask_modal_close" onClick={() => handleShowCreateTask()}><p>close</p></div>

                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            value={projectID}
                            placeholder="Project ID"
                            readOnly
                            style={{cursor: 'default'}}
                          />
                          <input
                            type="text"
                            value={session?.auth.actor.toString()}
                            placeholder="Project Owner"
                            readOnly
                            style={{cursor: 'default'}}
                          />
                          <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => settaskTitle(e.target.value)}
                            placeholder="Title"
                            required
                          />
                          <input
                            type="text"
                            value={taskContent}
                            onChange={(e) => settaskContent(e.target.value)}
                            placeholder="Content"
                            required
                          />
                          <input
                            type="text"
                            value={taskLink}
                            onChange={(e) => settaskLink(e.target.value)}
                            placeholder="Link"
                            required
                          />
                          <input
                            type="text"
                            value={taskEmail}
                            onChange={(e) => settaskEmail(e.target.value)}
                            placeholder="Email"
                            required
                          />
                          <input
                            type="text"
                            value={taskPriority}
                            onChange={(e) => settaskPriority(e.target.value)}
                            placeholder="Priority"
                            required
                          />
                          <input
                            type="text"
                            value={taskStatus}
                            onChange={(e) => settaskStatus(e.target.value)}
                            placeholder="Status"
                            required
                          />
                           <input
                            type="text"
                            value={taskPrice}
                            onChange={(e) => settaskPrice(e.target.value)}
                            placeholder="Price"
                            required
                          />
                          <button type="submit">Submit</button>
                        </form>
                        <p>{messageTask && messageTask}</p>
                      </div>
                    </div>
                  )}

                  {ShowCreateProduct && (
                    <div className="createtask_modal_block">
                      <div className="createtask_modal">
                        <h1>Add a New Product</h1>

                        <div className="createproduct_modal_close" onClick={() => handleShowCreateProduct()}><p>close</p></div>

                        <form onSubmit={handleProductSubmit}>
                          <input
                            type="text"
                            value={projectID}
                            placeholder="Project ID"
                            readOnly
                            style={{cursor: 'default'}}
                          />
                          <input
                            type="text"
                            value={session?.auth.actor.toString()}
                            placeholder="Product Owner"
                            readOnly
                            style={{cursor: 'default'}}
                          />
                          <input
                            type="text"
                            value={productTitle}
                            onChange={(e) => setproductTitle(e.target.value)}
                            placeholder="Product Title"
                            required
                          />
                          <input
                            value={productPrice}
                            onChange={(e) => setproductPrice(e.target.value)}
                            placeholder="Product Price"
                            required
                          />
                          <button type="submit">Submit</button>
                        </form>
                        <p>{messageReward && messageReward}</p>
                      </div>
                    </div>
                  )}

                  {/* Render modal if isModalOpen is true */}
                  {isModalOpen && (
                    <div className="createtask_modal_block">
                      <div className="buyproduct_modal">
                        <h1>Product name: {selectedProduct?.productTitle}</h1>
                        <p>Product price: <span>{selectedProduct?.productPrice}</span>$</p>
                        <button onClick={handleCloseModal}>Close</button>
                        <button onClick={(e) => handleBuyProduct(e, selectedProduct?.productTitle, selectedProduct?.productPrice)}>Buy</button>
                        <p>{messageReward && messageReward}</p>
                      </div>
                    </div>
                )}
              </div>

              {ShowEditor && (
                  <div className="editor_modal_block">
                  <div className="project_content_title">
                    <p>Project Content</p>
                    {session ? (
                      <div>
                        {dataLoaded ? (
                          <div></div>
                        ) : (
                          <div className="project_createtasks_pad" onClick={() => initializeEditor()}><p>Show Editor</p></div>
                        )}

                        {saveEdits ? (
                          <div className="project_createtasks_pad" onClick={() => UpdateMutableData()}><p>Pull Changes</p></div>
                        ) : (
                          <div>
                            {dataLoaded && (
                              <div className="project_createtasks_pad" onClick={() => saveContent()}><p>Save Edit</p></div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button className="project_editor_pad" onClick={()=>connect()}><p>Authorize Editor</p></button>
                    )}
                    
                  </div>
                  <div id="editorjs" style={{background: '#ffebcd', height: 1630, overflowY: 'scroll'}}></div>
                    {renderContentBlocks()}
                  </div>
              )}

            </div>
        ))}
    </div>
  );
}
