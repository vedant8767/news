import styles from './Specific_cat.module.css'

export default function Specific_cat({value,newsdata,setNewsdata,detailnews,setNews,isLoading,setLoad}){

    
   
    const URL = "https://newsdata.io/api/1/latest?"
    const API_KEY = import.meta.env.VITE_API_KEY


    async function get(){
        setNewsdata(value)
        console.log(value);
        const result = await fetch(`${URL}apikey=${API_KEY}&category=${value}&language=mr`)
        const data = await result.json()
        console.log(data)
        setNews(data)
        setLoad(true)
        console.log("news is"+newsdata.length)
        console.log("data"+data.results.map((key)=>key.title))
    }
    
    return(
       <div className={styles.specific_cat} onClick={get}>
            {value}
            {console.log(newsdata)}
       </div>
    )
}