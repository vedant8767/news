import './App.css'
import Category from './components/Category'
import DetailNews from './components/DetailNews'
import Header from './components/Header'
import { useState } from 'react';

function App() {
 
  const [newsdata,setNewsdata] = useState("")
  const [detailnews,setNews] = useState([])
  const [isLoading,setLoad] = useState(false)

  async function getdata(){
    console.log("Clicked")
    const result = await fetch('https://newsdata.io/api/1/latest?apikey=pub_44541ec3ecfa2cb7c54941668e8829c17a209&category=science')
    console.log(result)
    const data = await result.json()
    console.log(data)
  }

  return (
    <div className="App">
      {/* <button onClick={()=>getdata()}>Science</button> */}
      <Header/>
      <Category newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad}/>
      <DetailNews newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad}></DetailNews>
    </div>
  )
}

export default App
