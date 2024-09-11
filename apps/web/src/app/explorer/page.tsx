"use client"

import { ExplorerApi } from "atomicassets";
import { ITemplate } from "atomicassets/build/API/Explorer/Objects";
import Image from "next/image";
import Link from 'next/link';
import React, { useMemo, Component, useState, useCallback, useEffect, useRef } from 'react';

// COMPONENTS
import { MainNavigation } from "@/components/header/header";

const explorer = new ExplorerApi(`${process.env.NEXT_PUBLIC_ATOMIC_ENDPOINT!}`, 'atomicassets', { fetch: fetch });

export default function CollectionDetailsPage() {

  const [templates, setTemplates] = useState<ITemplate[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const templates = await explorer.getTemplates();
        setTemplates(templates);
      } catch (error) {
        console.error('Error fetching template details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MainNavigation />
      <div className="explorer_coockie_title"><h1>Projects</h1></div>
      <div className="exporer_project_block">
        {templates.map((template, index) => (
          <Link 
            href={`${template.template_id}/project`}
          >
            <div className="exporer_project_block_aling">
              <div className="exporer_project_block_projectname"><p>{template.collection.name}</p></div>
              <div className="exporer_project_main">
                <Image width={200} height={200} src={`${process.env.NEXT_PUBLIC_IPFS_ENDPOINT!}/${template.immutable_data.image}`} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}