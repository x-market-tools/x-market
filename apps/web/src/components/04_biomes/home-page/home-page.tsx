"use client"

import { apiCoreUseStoreActions } from '@/store/hooks';
import classNames from 'classnames';
import { MainNavigation } from "@/components/header/header";
import { HomeMainBlock } from "@/components/details/home_main_block";


type HomePageProps = React.HTMLAttributes<HTMLDivElement> & {}
export const HomePage: React.FunctionComponent<HomePageProps> = ({ children,className}) => { 
const rootClasses = classNames({
[`${className}`]: className,
});
  const {connect} = apiCoreUseStoreActions(state=>state.auth)
  return (
    <div>
      <MainNavigation ></MainNavigation>
      <HomeMainBlock ></HomeMainBlock>
    </div>
  )
}