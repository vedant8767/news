import Specific_cat from "./Specific_cat";
import styles from './Category.module.css'

export default function Category({newsdata,setNewsdata,detailnews,setNews,isLoading,setLoad}){
    
    return(
        <div className={styles.category}>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="science"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="technology"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="business"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="health"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="politics"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="entertainment"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="education"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="tourism"/>
            <Specific_cat newsdata={newsdata} setNewsdata={setNewsdata} detailnews={detailnews} setNews={setNews} isLoading={isLoading} setLoad={setLoad} value="world"/>
        </div>
    )
}