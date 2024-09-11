"use client"

import React, { useMemo, Component, useState, useCallback, useEffect, useRef } from 'react';
import { apiCoreUseStoreActions, apiCoreUseStoreState } from '@/store/hooks';
import { createClient } from '@supabase/supabase-js';
import { ExplorerApi } from "atomicassets";

// COMPONENTS
import { MainNavigation } from "@/components/header/header";

const explorer = new ExplorerApi(`${process.env.NEXT_PUBLIC_ATOMIC_ENDPOINT!}`, 'atomicassets', { fetch: fetch });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PurchasedProducts () {

  const {connect} = apiCoreUseStoreActions(state=>state.auth);
  const {session} = apiCoreUseStoreState(state=>state.auth.data);

  // PRODUCTS
  const [PurProductData, setPurProductData] = useState([]);
  const [loadingPurProductData, setloadingPurProductData] = useState(true);

  // Fetch data from Supabase table
  const fetchProductData = async () => {
    const { data, error } = await supabase
      .from('PurchasedProducts')  // Replace with your table name
      .select('*');  // Select all columns

    if (error) {
      console.log('Error fetching data:', error);
    } else {
        setPurProductData(data);  // Store fetched data in state
    }
    setloadingPurProductData(false);
  };

  useEffect(() => {
    fetchProductData();
  }, []);  // Fetch data when the component mounts


  return (
    <div>
      <MainNavigation />

        <div className='user_products_block'>
            <div className='user_products'><h1>Your Products</h1></div>

            {PurProductData
                .filter(purproductdata => purproductdata.projectOwner === session?.auth.actor.toString())
                .map((purproduct) => (
                <div key={purproduct.id}>                          
                    <div className="users_products">
                    <p>Product name: <span>{purproduct.purProductTitle}</span></p>
                    <p>Cost: <span>{purproduct.purProductPrice}$</span></p>                                            
                    <p>Buyer: <span>{purproduct.projectOwner}$</span></p>                                            
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}