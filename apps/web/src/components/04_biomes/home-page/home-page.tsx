"use client"
import { apiCoreUseStoreActions } from '@/store/hooks';
import classNames from 'classnames';
type HomePageProps = React.HTMLAttributes<HTMLDivElement> & {}
export const HomePage: React.FunctionComponent<HomePageProps> = ({ children,className}) => { 
const rootClasses = classNames({
[`${className}`]: className,
});
  const {connect} = apiCoreUseStoreActions(state=>state.auth)
  return <div className={`${rootClasses}`}>
     <button onClick={()=>connect()}>Connect proton</button>
   </div>
}