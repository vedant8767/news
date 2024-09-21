// import React, { useEffect, useState ,useId } from "react";
// import saveNews from '../pages/savenews'
// import appwriteService from '../appwrite/config'
// import {useNavigate} from 'react-router-dom'
// import authService from "../appwrite/auth"
// import { ID } from 'appwrite'
// import {useSelector} from "react-redux"

// export default function CategoryNews(){
//     // https://newsdata.io/api/1/latest?apikey=pub_44541ec3ecfa2cb7c54941668e8829c17a209&category=science
//     const allcategories = ['business','entertainment','general','health','science','sports','technology',]
    
//     const [categoryNews,setcategoryNews] = useState([])
//     const [saveUserNews,setsaveNews] = useState(true)
//     const navigate = useNavigate()
//     const checkUserLogin = useSelector((state)=>state.auth.status)
//     const d = new Date()

//     const getCategoryNews = async(category)=>{
//         // document.getElementById(`${id}`).style.textDecoration='underline'
//         const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=30352850f7f44451a417caffce7fd9fc&category=${category}&language=en`)
//         const data = await result.json()
//         console.log(data)
//         if(data.articles.length !== 0){
//                 setcategoryNews(data.articles)
//         }
//     }
//     const gotologin =()=>{
//         console.log("save1");
//         navigate('/login')
//     }
//     useEffect(()=>{
//         async function get(params) {
//             const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=30352850f7f44451a417caffce7fd9fc&category=health&language=en`)
//             const data = await result.json()
//             console.log(data)
//             if(data.articles.length !== 0){
//                     setcategoryNews(data.articles)
//             }
//         }
//         get()
//     },[])
//     return(
//         <div>
//             <div className='flex flex-row gap-16 mt-4'>
//                 {
//                 allcategories.map((category)=>(
//                         <h1 className="bg-violet-200 font-bold text-xl p-4 rounded-lg cursor-pointer " key={category} onClick={()=>getCategoryNews(category)}>{category}</h1>
                
//                 ))}
//              </div>
//             {
//                 categoryNews && (
//                     <div className="flex flex-wrap gap-9 mt-8" key={Date.now()}>
//                         {
//                             categoryNews.map((eachnews)=>(
//                                 <div key={eachnews.title} className="w-96 h-72 flex flex-col bg-slate-300 rounded-lg justify-center p-5 cursor-pointer">
//                                     <img src={eachnews.urlToImage} alt="" srcset="" />
//                                     <h1 className='font-semibold text-lg'>{eachnews.title}</h1>
//                                     <h1 className='font-semibold text-lg'>{eachnews.author}</h1>
//                                     <a className='font-bold text-lg text-blue-500' href={eachnews.url}>Read More</a>
//                                     <button
//                                     className='bg-slate-500 font-bold text-lg w-28 h-9 rounded-md mt-4'
//                                     onClick={
//                                         checkUserLogin?()=>saveNews({authService,appwriteService,checkUserLogin,setsaveNews,saveUserNews,navigate,title:eachnews.title,
//                                         imageurl:eachnews.urlToImage,newsurl:eachnews.url,
//                                         date:d.toDateString(),slug:ID.unique()})
//                                         :gotologin
                                    
//                                     }>save</button>
//                                 </div>
//                             )
//                             )
//                         }
//                     </div>
//                 )
//             }
//         </div>
//     )
// }
import React, { useEffect, useState } from "react";
import saveNews from '../pages/savenews'
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import authService from "../appwrite/auth"
import { ID } from 'appwrite'
import { useSelector } from "react-redux"
import conf from '../conf/conf'

export default function CategoryNews() {
    const allcategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    
    const [categoryNews, setcategoryNews] = useState([]);
    const [saveUserNews, setsaveNews] = useState(true);
    const navigate = useNavigate();
    const checkUserLogin = useSelector((state) => state.auth.status);
    const d = new Date();

    const getCategoryNews = async (category) => {
        const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${conf.news}&category=${category}&language=en`);
        const data = await result.json();
        if (data.articles.length !== 0) {
            setcategoryNews(data.articles);
        }
    };

    const gotologin = () => {
        navigate('/login');
    };

    useEffect(() => {
        async function get() {
            const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${conf.news}&category=health&language=en`);
            const data = await result.json();
            if (data.articles.length !== 0) {
                setcategoryNews(data.articles);
            }
        }
        get();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className='flex flex-wrap justify-center gap-6 mt-4'>
                {
                    allcategories.map((category) => (
                        <h1 
                            key={category}
                            className="bg-violet-600 text-white font-bold text-lg px-6 py-3 rounded-full cursor-pointer hover:bg-violet-700 transition duration-200"
                            onClick={() => getCategoryNews(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h1>
                    ))
                }
            </div>

            {/* Category News */}
            {
                categoryNews && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {
                            categoryNews.map((eachnews) => (
                                <div key={eachnews.title} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    {/* Image */}
                                    <img 
                                        src={eachnews.urlToImage|| 'https://images.unsplash.com/photo-1557804506-e969d7b32a4b?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                                        alt="News" 
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* News Content */}
                                    <div className="p-4 flex flex-col justify-between">
                                        {/* Title */}
                                        <h1 className="font-semibold text-lg text-gray-800 mb-2">
                                            {eachnews.title}
                                        </h1>
                                        {/* Author */}
                                        <h2 className="text-sm text-gray-500 mb-4">
                                            By {eachnews.author ? eachnews.author : 'Unknown'}
                                        </h2>

                                        {/* Read More Link */}
                                        <a href={eachnews.url} className="text-blue-500 hover:underline font-bold mb-4">
                                            Read More
                                        </a>

                                        {/* Save Button */}
                                        <button
                                            className="bg-blue-500 text-white font-bold text-lg px-4 py-2 rounded-md mt-auto hover:bg-blue-600 transition duration-200"
                                            onClick={
                                                checkUserLogin ? () => saveNews({
                                                    authService, 
                                                    appwriteService, 
                                                    checkUserLogin, 
                                                    setsaveNews, 
                                                    saveUserNews, 
                                                    navigate, 
                                                    title: eachnews.title,
                                                    imageurl: eachnews.urlToImage, 
                                                    newsurl: eachnews.url,
                                                    date: d.toDateString(), 
                                                    slug: ID.unique()
                                                }) : gotologin
                                            }
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
