// import React,{useEffect, useState} from "react";
// import appwriteService from '../appwrite/config'
// import {useDispatch,useSelector} from "react-redux"
// import authService from "../appwrite/auth"
// import { Query } from "appwrite";

// export default function AccountNews(){

//     const [news, setNews] = useState([])
//     const checkUserLogin = useSelector((state)=>state.auth.status)

//     useEffect(()=>{
//         async function getdata() {
//             const user = await authService.getCurrentUser()
//             const userId=user.$id
//             console.log("&&&",userId)
//             const queries = [Query.equal("userId", userId)]
//             appwriteService.getNews(queries).then((news) => {
//                 if (news) {
//                     setNews(news.documents)
//                 }
//             })
//         }
//         getdata()
//     },[])

//     const getdocument = async (title)=>{
//         const allnews = await appwriteService.listNews()
//         console.log(allnews)
//         const user = await authService.getCurrentUser()
//         const userIduser=user.$id
//         const id =allnews.map((news)=>{
//             if(news.title===title && news.userId===userIduser ){
//                 // console.log(userId)
//                 console.log(news.userId,userIduser);
                
//                 return news.$id
//             }
//         })
//         console.log(id)
//         console.log(id.length)
//         console.log(typeof id);
//         let result
//         for(let i=0;i < id.length;i++){
//             console.log(":::::",id[i])
//             if(id[i] !== "undefined"){
//                 console.log(id[i])
//                 appwriteService.deleteNews(id[i])
//                 const user = await authService.getCurrentUser()
//                 const userId=user.$id
//                 console.log("&&&",userId)
//                 const queries = [Query.equal("userId", userId)]
//                 appwriteService.getNews(queries).then((news) => {
//                     if (news) {
//                         setNews(news.documents)
//                     }
//                 })
//                 result = id[i]
//             }
//         }
        
//         console.log(result);
    
//     }
//     return(
//         <div className="mb-16">
//             <h1 className="font-bold text-3xl text-center text-black mt-6">Saved News</h1>
//             <div className="flex flex-wrap gap-7 mt-7">
//             {news.map((eachnews)=>(
//                 <div className="w-96 h-full flex flex-col bg-gray-300 rounded-lg justify-center p-5 cursor-pointer">
//                     <img className="relative h-4/5 w-full" src={eachnews.imageurl} alt="News Image Not Available" />
//                     <h1 className='font-semibold text-lg mt-6'>{eachnews.title}</h1>
//                     <a className='font-bold text-lg text-blue-500' href={eachnews.newsurl}>Read More</a>
//                     <button 
//                     className='bg-slate-500 font-bold text-lg w-28 h-9 rounded-md mt-4'
//                     onClick={()=>getdocument(eachnews.title)}>
//                     Delete</button>
//                 </div>
//             ))}
//             </div>
//         </div>
//     )
// }
import React, { useEffect, useState } from "react";
import appwriteService from '../appwrite/config';
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { Query } from "appwrite";

export default function AccountNews() {
    const [news, setNews] = useState([]);
    const checkUserLogin = useSelector((state) => state.auth.status);

    useEffect(() => {
        async function getdata() {
            const user = await authService.getCurrentUser();
            const userId = user.$id;
            const queries = [Query.equal("userId", userId)];
            appwriteService.getNews(queries).then((news) => {
                if (news) {
                    setNews(news.documents);
                }
            });
        }
        getdata();
    }, []);

    const getdocument = async (title) => {
        const allnews = await appwriteService.listNews();
        const user = await authService.getCurrentUser();
        const userId = user.$id;

        const id = allnews.map((news) => {
            if (news.title === title && news.userId === userId) {
                return news.$id;
            }
        });

        for (let i = 0; i < id.length; i++) {
            if (id[i] !== "undefined") {
                await appwriteService.deleteNews(id[i]);
                const queries = [Query.equal("userId", userId)];
                appwriteService.getNews(queries).then((news) => {
                    if (news) {
                        setNews(news.documents);
                    }
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-10">
            <h1 className="font-extrabold text-4xl text-center text-gray-800 mt-10 mb-12">Your Saved News</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map((eachnews) => (
                    <div 
                        key={eachnews.title}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div>
                            <img 
                                className="w-full h-48 object-cover rounded-lg mb-4" 
                                src={eachnews.imageurl || "https://via.placeholder.com/400x300"} 
                                alt="News" 
                            />
                            <h1 className='font-bold text-xl text-gray-900 mb-2 truncate'>{eachnews.title}</h1>
                            <a 
                                className='text-blue-500 hover:text-blue-700 font-medium' 
                                href={eachnews.newsurl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Read More
                            </a>
                        </div>
                        <button 
                            className="mt-6 py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-200"
                            onClick={() => getdocument(eachnews.title)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
