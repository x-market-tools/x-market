"use client"

import React, { useMemo, Component, useState, useCallback, useEffect, useRef } from 'react';
import { apiCoreUseStoreActions, apiCoreUseStoreState } from '@/store/hooks';
import Link from 'next/link';


export const MainNavigation = () => {

  const {connect} = apiCoreUseStoreActions(state=>state.auth);
  const {session} = apiCoreUseStoreState(state=>state.auth.data);


  return (
    <div>
      
      <div className='header_block'>
      <Link href={`/`}><div className="header_block_menu_pad"><p>Home</p></div></Link>
      <div className="header_block_menu_pad"><p>About</p></div>
      <Link href={`/explorer`}><div className="header_block_menu_pad"><p>Explore</p></div></Link>
      <div className="header_block_menu_pad"><p>Blog</p></div>

      {session ? (
        <Link href={`/purchasedproducts`}><div className="header_block_menu_pad"><p>Purchased Products</p></div></Link>
      ) : (
        <div></div>
      )}

      {session ? (
        <Link href={`/creationway`}><div className="header_block_menu_pad"><p>Create a project</p></div></Link>
      ) : (
        <div></div>
      )}

      {session ? (
        <div></div>
      ) : (
        <button className="wallet_connection" onClick={()=>connect()}>Connect Wallet</button>
      )}

      <div className='login_name'><p>{session?.auth.actor.toString()}</p></div>

      </div>
    </div>
  )
}