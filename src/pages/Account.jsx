// import {AccountNews, Container} from '../components'
// import {useDispatch} from 'react-redux'
// import authService from '../appwrite/auth'
// import {logout} from '../store/authSlice'
// import { useEffect } from 'react'
// import {messaging} from '../firebase'
// import {getToken } from "firebase/messaging";
// import appwriteService from '../appwrite/config'
// import {useSelector} from "react-redux"
// import { ID } from 'appwrite'
// import { Query } from "appwrite";
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// import React,{useState} from 'react'

// function Account() {

//      const [tokens,setTokens] = useState([])
//      const dispatch = useDispatch()
//      const logoutHandler = () => {
//             authService.logout().then(() => {
//                 dispatch(logout())
//             })
//     }

//     const checkUserLogin = useSelector((state)=>state.auth.status)

//     const requestPermission = async () => {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission === 'granted') {
//           console.log('Notification permission granted.');

//           // Get FCM token
//           const token = await getToken(messaging,{vapidKey: "BIeNPA0jbSNvL60sBVr00GaaAU4UVpijbTTKsuF6MQ8tvSprFZ5a4la1tdGl0vF8QUdrvCUlWisE4gAV9i7d12M"});
//           console.log('FCM Token:', token);
//           // Send this token to your backend or store it in your app
//           if(checkUserLogin){
//             const user = await authService.getCurrentUser()
//             const userId=user.$id
//             const done = await appwriteService.createMessage({userId,token,slug:ID.unique()});
//             if (done) {
//                 console.log("done")
//             }
//           }
//         } else {
//           console.log('Notification permission denied.');
//         }
//       } catch (error) {
//         console.error('Error requesting notification permission:', error);
//       }
//     };
//     async function getdata() {
//       const user = await authService.getCurrentUser()
//       const userId=user.$id
//       console.log("&&&",userId)
//       const queries = [Query.equal("userId", userId)]
//       appwriteService.getToken(queries).then((token) => {
//           if (token) {
//               console.log(token)
//               setTokens([...tokens,token])
//           }
//       })
//     }

//     async function sendmsg(params) {
//       // Create a message payload for a topic
//       const registrationToken = tokens[0];
//       console.log(registrationToken)
//           const message = {
//             notification: {
//               title: 'Breaking News',
//               body: 'New article is available!',
//             },
//             token:'fZGc7IKyrTadwaE5HHaUNj:APA91bFsk3zCvRArGp4EBmr4Sl9fEcYUbSo4CeX33OChtnGywr82-eowpjWWOg-dSet0_5qvGeXL8JL2k98eCWWGmdSZVIvpEWLS-KDl0jzCLlmNngitLshz5i6HysNwtWjr56GW0VAN'
//           };

//           // Send the message to the topic
//           messaging.send(message)
//             .then((response) => {
//               console.log('Successfully sent message to topic:', response);
//             })
//             .catch((error) => {
//               console.error('Error sending message to topic:', error);
//             });
//     }

//     return (
//         <div className='w-full py-8 bg-pink-100 flex flex-col'>
//             <Container>
//                 <div className='flex flex-wrap flex-col'>
//                   <h1 className='font-bold m-auto text-3xl'>Your Profile</h1>
//                   <button className='w-56 h-11 font-bold text-lg bg-green-300 rounded-lg' onClick={requestPermission}>Set Messageing on</button>
//                   {/* <button onClick={getdata}>get</button>
//                   <button onClick={sendmsg}>send msg</button> */}
//                   <AccountNews/>
//                   <button className='w-28 h-11 font-bold text-lg bg-red-400 rounded-lg' onClick={logoutHandler}>logout</button>
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default Account
import { AccountNews, Container } from '../components'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useEffect, useState } from 'react'
import { messaging } from '../firebase'
import { getToken } from "firebase/messaging"
import appwriteService from '../appwrite/config'
import { useSelector } from "react-redux"
import { ID } from 'appwrite'
import { Query } from "appwrite"

function Account() {
    const [tokens, setTokens] = useState([])
    const dispatch = useDispatch()
    const checkUserLogin = useSelector((state) => state.auth.status)

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    const requestPermission = async () => {
        try {
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
                console.log('Notification permission granted.')

                // Get FCM token
                const token = await getToken(messaging, { vapidKey: "BIeNPA0jbSNvL60sBVr00GaaAU4UVpijbTTKsuF6MQ8tvSprFZ5a4la1tdGl0vF8QUdrvCUlWisE4gAV9i7d12M" })
                console.log('FCM Token:', token)
                // Send this token to your backend or store it in your app
                if (checkUserLogin) {
                    const user = await authService.getCurrentUser()
                    const userId = user.$id
                    const done = await appwriteService.createMessage({ userId, token, slug: ID.unique() })
                    if (done) {
                        console.log("done")
                    }
                }
            } else {
                console.log('Notification permission denied.')
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error)
        }
    }

    async function getdata() {
        const user = await authService.getCurrentUser()
        const userId = user.$id
        const queries = [Query.equal("userId", userId)]
        appwriteService.getToken(queries).then((token) => {
            if (token) {
                console.log(token)
                setTokens([...tokens, token])
            }
        })
    }

    async function sendmsg(params) {
        // Create a message payload for a topic
        const registrationToken = tokens[0]
        console.log(registrationToken)
        const message = {
            notification: {
                title: 'Breaking News',
                body: 'New article is available!',
            },
            token: 'fZGc7IKyrTadwaE5HHaUNj:APA91bFsk3zCvRArGp4EBmr4Sl9fEcYUbSo4CeX33OChtnGywr82-eowpjWWOg-dSet0_5qvGeXL8JL2k98eCWWGmdSZVIvpEWLS-KDl0jzCLlmNngitLshz5i6HysNwtWjr56GW0VAN'
        }

        // Send the message to the topic
        messaging.send(message)
            .then((response) => {
                console.log('Successfully sent message to topic:', response)
            })
            .catch((error) => {
                console.error('Error sending message to topic:', error)
            })
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 flex flex-col items-center py-8'>
            <Container>
                <div className='w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6'>
                    <h1 className='text-3xl font-bold text-center mb-6'>Your Profile</h1>
                    <div className='flex justify-center mb-6'>
                        <button className='bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-green-600 transition duration-300' onClick={requestPermission}>
                            Enable Notifications
                        </button>
                    </div>
                    {/* <div className='flex justify-center mb-6'>
                        <button className='bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300' onClick={getdata}>
                            Get Data
                        </button>
                        <button className='bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-yellow-600 transition duration-300 ml-4' onClick={sendmsg}>
                            Send Message
                        </button>
                    </div> */}
                    <AccountNews />
                    <div className='flex justify-center mt-6'>
                        <button className='bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-red-600 transition duration-300' onClick={logoutHandler}>
                            Logout
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Account
