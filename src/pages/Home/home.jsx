import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
 
const home = () => {

  const [category, setCategory] = useState("All");

  return (
  <>
  <Header/>
  <ExploreMenu category={category} setCategory={setCategory}/>
  <FoodDisplay/>
  </>
  )
}

export default home