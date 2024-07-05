import styles from './DetailNews.module.css'

export default function DetailNews({newsdata,setNewsdata,detailnews,setNews,isLoading,setLoad}){
    
    // function get(){
    //     console.log(detailnews)
    // }
    
    return(
        <div className={styles.mainnews}>
            {/* <button onClick={get}></button> */}
            {isLoading?((<div>{detailnews.results.map((key)=><div className={styles.eachnews} key={key.article_id}>
                <h2>{key.title}</h2>
                <h3>{key.source_id}</h3>
                <img className={styles.src} src={key.source_icon} alt="" />
                <img className={styles.img} src={key.image_url} alt="" />
                <p>{key.description}</p>
                <a href={key.link}>Read Complete</a>
            </div>)}</div>)):(<p className={styles.load}>Loading</p>)
            }
            {isLoading?(<h3>{detailnews.results.length===0 ?(<b>Data Not Found</b>):(<b>Data Found</b>)}</h3>):(<h2></h2>)}
            
        </div>
    )
}