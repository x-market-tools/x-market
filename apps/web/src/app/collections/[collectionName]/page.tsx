

import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import Image from "next/image";
import fetch from "node-fetch";

const explorer = new ExplorerApi('https://aa-xprnetwork-test.saltant.io', 'atomicassets',{fetch: fetch});

async function getCollectionDetails(collectionName: string):Promise<ITemplate[]> {
  
  const templates = await explorer.getTemplates({ collection_name: collectionName });
  return templates

}
 
export default async function CollectionDetailsPage({ params }: { params: { collectionName: string } }) {
  
  const templatesFormCollection = await getCollectionDetails(params.collectionName);

  return <>
    <ul>
      {templatesFormCollection.map((template, index) => {
        return <li key={index}>
          <Image width={200} height={200} src={ `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${template.immutable_data.img}`} alt=""></Image>
        </li>
      })}
    </ul>  
  
</>
}