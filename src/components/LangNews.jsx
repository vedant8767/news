// import React, { useEffect, useState ,useId } from "react";
// import saveNews from '../pages/savenews'
// import appwriteService from '../appwrite/config'
// import {useNavigate} from 'react-router-dom'
// import authService from "../appwrite/auth"
// import { ID } from 'appwrite'
// import {useSelector} from "react-redux"

// export default function LangNews(){
//     // https://newsdata.io/api/1/latest?apikey=pub_44541ec3ecfa2cb7c54941668e8829c17a209&category=science
//     const allcategories = ['mr','pa','ta','te','ml','hi','fr','bn']
    
//     const [LangNews,setLangNews] = useState([])
//     const [saveUserNews,setsaveNews] = useState(true)
//     const navigate = useNavigate()
//     const checkUserLogin = useSelector((state)=>state.auth.status)
//     const d = new Date()

//     const getLangNews = async(lang)=>{
//         // document.getElementById(`${id}`).style.textDecoration='underline'
//         const result = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_44541ec3ecfa2cb7c54941668e8829c17a209&language=${lang}`)
//         const data = await result.json()
//         console.log(data)
//         if(data.results.length !== 0){
//                 setLangNews(data.results)
//         }
//     }
//     const gotologin =()=>{
//         console.log("save1");
//         navigate('/login')
//     }
//     useEffect(()=>{
//         async function get(params) {
//             const result = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_44541ec3ecfa2cb7c54941668e8829c17a209&language=en`)
//             const data = await result.json()
//             console.log(data)
//             if(data.results.length !== 0){
//                     setLangNews(data.results)
//             }
//         }
//         get()
//     },[])
//     return(
//         <div>
//             <div className='flex flex-row gap-12 mt-8'>
//                 {
//                 allcategories.map((lang)=>(
//                         <h1 className="bg-violet-200 font-bold text-xl p-4 px-11 rounded-lg cursor-pointer " key={lang} onClick={()=>getLangNews(lang)}>{lang}</h1>
                
//                 ))}
//              </div>
//             {
//                 LangNews && (
//                     <div key={Date.now()} className="flex flex-wrap gap-9 mt-8">
//                         {
//                             LangNews.map((eachnews)=>(
//                                 <div key={eachnews.title} className="w-96 h-72 flex flex-col cursor-pointer bg-slate-300 rounded-lg justify-center p-5">
//                                     <img 
//                                         src={eachnews.urlToImage|| 'https://images.unsplash.com/photo-1557804506-e969d7b32a4b?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
//                                         alt="News" 
//                                         className="w-full h-48 object-cover"
//                                     />
//                                     <h1 className='font-semibold text-lg'>{eachnews.title}</h1>
//                                     <h1 className='font-semibold text-lg'>{eachnews.source_name}</h1>
//                                     <a className='font-bold text-lg text-blue-500' href={eachnews.link}>Read More</a><br /><br />
//                                     <button
//                                     className='bg-slate-500 font-bold text-lg w-28 h-9 rounded-md mt-4'
//                                     onClick={
//                                         checkUserLogin?()=>saveNews({authService,appwriteService,checkUserLogin,setsaveNews,saveUserNews,navigate,title:eachnews.title,
//                                         imageurl:eachnews.image_url,newsurl:eachnews.link,
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
import saveNews from '../pages/savenews';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import authService from "../appwrite/auth";
import { ID } from 'appwrite';
import { useSelector } from "react-redux";
import conf from '../conf/conf'

export default function LangNews() {
    const allcategories = ['mr', 'pa', 'ta', 'te', 'ml', 'hi', 'fr', 'bn'];
    
    const [LangNews, setLangNews] = useState([]);
    const [saveUserNews, setsaveNews] = useState(true);
    const navigate = useNavigate();
    const checkUserLogin = useSelector((state) => state.auth.status);
    const d = new Date();

    const getLangNews = async (lang) => {
        console.log("lang called")
        const result = await fetch(`https://newsdata.io/api/1/latest?apikey=${conf.newsdataio}&language=${lang}`);
        const data = await result.json();
        console.log(data)
        if (data.results.length !== 0) {
            setLangNews(data.results);
        }
    };

    const gotologin = () => {
        navigate('/login');
    };

    useEffect(() => {
        async function get() {
            const result = await fetch(`https://newsdata.io/api/1/latest?apikey=${conf.newsdataio}&language=en`);
            const data = await result.json();
            if (data.results.length !== 0) {
                setLangNews(data.results);
            }
        }
        get();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Language Selection */}
            <div className='flex flex-wrap justify-center gap-6 mt-6'>
                {
                    allcategories.map((lang) => (
                        <h1 
                            key={lang}
                            className="bg-purple-600 text-white font-bold text-lg px-6 py-3 rounded-full cursor-pointer hover:bg-purple-700 transition duration-200"
                            onClick={() => getLangNews(lang)}
                        >
                            {lang.toUpperCase()}
                        </h1>
                    ))
                }
            </div>

            {/* News Cards */}
            {
                LangNews && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {
                            LangNews.map((eachnews) => (
                                <div key={eachnews.title} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    {/* Image */}
                                    <img 
                                        src={eachnews.urlToImage || 'https://images.unsplash.com/photo-1557804506-e969d7b32a4b?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                                        alt="News"
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* News Content */}
                                    <div className="p-4 flex flex-col justify-between">
                                        {/* Title */}
                                        <h1 className='font-semibold text-lg text-gray-800 mb-2 truncate'>
                                            {eachnews.title}
                                        </h1>

                                        {/* Source */}
                                        <h2 className='text-sm text-gray-500 mb-4'>
                                            {eachnews.source_name ? eachnews.source_name : 'Unknown Source'}
                                        </h2>

                                        {/* Read More Link */}
                                        <a 
                                            href={eachnews.link} 
                                            className="text-blue-500 hover:underline font-bold mb-4"
                                        >
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
                                                    newsurl: eachnews.link,
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
