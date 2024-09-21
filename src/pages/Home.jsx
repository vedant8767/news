import React, {useEffect, useState} from 'react'
import {Container} from '../components'
import appwriteService from '../appwrite/config'
import {useDispatch,useSelector} from "react-redux"
import {Link, useNavigate} from 'react-router-dom'
import authService from "../appwrite/auth"
import { ID } from 'appwrite'
import saveNews from './savenews'
import conf from '../conf/conf'

function Home() {

    const d = new Date()
    
    const [news,setNews] = useState([])
    const [saveUserNews,setsaveNews] = useState(true)
    const checkUserLogin = useSelector((state)=>state.auth.status)
    console.log(">>>>>>>>>>>",checkUserLogin)
    const userData = useSelector((state) => state.auth.userData);
    console.log(">>>>>>>>>>>",userData)
    const navigate = useNavigate()

    const gotologin =()=>{
        console.log("save1");
        navigate('/login')
    }
    let datauser
    useEffect(()=>{
        async function fetchData(params) {
            const result = await fetch(`https://newsdata.io/api/1/latest?apikey=${conf.newsdataio}&language=en`)
            const data = await result.json()
            console.log(data)
            if(data.results.length !== 0){
                setNews(data.results)
            }
            console.log(news)
            const user = await authService.getCurrentUser()
            console.log("[[[",user.$id);
            datauser = user.$id
        }
        fetchData()
    },[])

    const [serachNews,setSearchNews] = useState("india")
    const [serachNewsArray,setSearchNewsArray] = useState([])
    useEffect(()=>{
        const getData = setTimeout(()=>{
            async function fetch_data(){
                setSearchNewsArray([])
                console.log("?????????",serachNewsArray)
                console.log(serachNews)
                const res = await fetch(`https://api.thenewsapi.com/v1/news/all?api_token=${conf.newsapi}&search=${serachNews}`)
                const data = await res.json()
                console.log(data.data)
                setSearchNewsArray(data.data)
                console.log("////////",serachNewsArray)
            }
            fetch_data()
        },500)
        return()=>{
            clearTimeout(getData)
        }
    },[serachNews])
    let res = null
    return (
        <div className='w-full py-8'>
            <h1 className='text-4xl text-black text-center m-auto font-bold'>Express News</h1>
            <div className='flex flex-col mt-10 ml-5'>
                    <input type="text" onChange={(e)=>setSearchNews(e.target.value)} value={serachNews} className='w-2/5 h-16 ml-9 rounded-md text-2xl font-semibold text-center' />
                    <div className='mt-7 flex gap-9 flex-wrap'>
                        {
                            serachNewsArray && (
                                
                                serachNewsArray.map((newssearch)=>(
                                        <div key={newssearch.uuid} className='relative cursor-pointer w-96 h-auto flex flex-col bg-slate-100 rounded-lg shadow-lg p-5'>
                                            <img 
                                                className='w-full h-40 object-cover rounded-t-lg' 
                                                src={newssearch.image_url} 
                                                alt="News Image"
                                            />
                                            <div className='p-4 flex flex-col justify-between flex-grow'>
                                                <a 
                                                    href={newssearch.url} 
                                                    className='text-lg leading-6 font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300 mb-4'
                                                >
                                                    {newssearch.title}
                                                </a>
                                                <button 
                                                    className='font-bold text-lg w-full h-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300'
                                                    onClick={
                                                        checkUserLogin
                                                        ? () => saveNews({
                                                            authService,
                                                            appwriteService,
                                                            checkUserLogin,
                                                            setsaveNews,
                                                            saveUserNews,
                                                            navigate,
                                                            title: newssearch.title,
                                                            imageurl: newssearch.image_url,
                                                            newsurl: newssearch.url,
                                                            date: d.toDateString(),
                                                            slug: ID.unique()
                                                        })
                                                        : gotologin
                                                    }
                                                >
                                                    Save
                                                </button>
                                        </div>
                                    </div>

                                ))
                            )
                        }
                    </div>
            </div>
            <Container>
                <div className="flex w-full h-screen mt-7">
                <div className='bg-slate-200 w-2/5'>
                {
                            news.length>0 && (<div 
                                className='flex flex-col w-full h-full gap-8'
                                key={Date.now()}>
                                    <img className='w-full' src={news[0].image_url||'https://images.unsplash.com/photo-1557804506-e969d7b32a4b?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="image"/>
                                    {/* <h1 className='font-semibold text-lg'>{news[0].title}</h1> */}
                                        <a href={news[0].link} className='text-xl ml-2 mr-2 leading-6 font-bold ml-3'>{news[0].title}</a>
                                        <button 
                                        className='self-center mb-3 w-32 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200'
                                        onClick={
                                            checkUserLogin?()=>saveNews({authService,appwriteService,checkUserLogin,setsaveNews,saveUserNews,navigate,title:news[0``].title,
                                            imageurl:news[0].urlToImage,newsurl:news[0].url,
                                            date:d.toDateString(),slug:ID.unique()})
                                            :gotologin
                                        
                                        }>
                                        save</button>
                                </div>)
                        }
                </div>
                <div className='w-3/5 overflow-x-hidden overflow-y-auto bg-slate-100'>
                    {/* <div className='ml-12 mb-5 flex flex-wrap'> */}
                        {
                            news && (<div 
                                className='ml-12 mb-5 flex flex-wrap gap-5 mt-3'
                                key={Date.now()}>{news.map((eachnews)=>(
                            <div className='flex flex-col w-80 gap-4 bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                                {/* Updated image with hover effect and better fit */}
                                <div className='relative'>
                                    <img className='w-full h-52 object-cover' src={eachnews.image_url || 'https://images.unsplash.com/photo-1557804506-e969d7b32a4b?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="News Image"/>
                                    {/* Add a slight gradient overlay on the image */}
                                    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50'></div>
                                </div>

                                {/* Enhanced title styling */}
                                <a href={eachnews.link} className='text-lg px-5 pt-2 leading-6 font-bold text-gray-900 hover:text-blue-500 transition duration-200 line-clamp-2'>
                                    {eachnews.title}
                                </a>
                                
                                {/* Additional text for news date or summary (optional) */}
                                <p className='px-5 text-sm text-gray-600 line-clamp-2'>
                                    {eachnews.description || 'Click to read more details'}
                                </p>
                                
                                {/* Updated button with more elegant style */}
                                <button 
                                    className='self-center mb-3 w-32 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200'
                                    onClick={
                                        checkUserLogin ? () => saveNews({
                                            authService, 
                                            appwriteService, 
                                            checkUserLogin, 
                                            setsaveNews, 
                                            saveUserNews, 
                                            navigate, 
                                            title: eachnews.title,
                                            imageurl: eachnews.image_url, 
                                            newsurl: eachnews.link,
                                            date: d.toDateString(), 
                                            slug: ID.unique()
                                        }) : gotologin
                                    }>
                                    Save
                                </button>
                            </div>
                        ))}</div>)
                        }
                        {/* {news.map((news)=>{
                            <h1 key={Date.now()}>{news.title}</h1>
                        })} */}
                    </div>
                    {/* </div> */}
                </div>
            </Container>
        </div>
    )
}

export default Home