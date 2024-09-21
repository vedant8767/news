import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //*********************** Database operations related to news *************************/

    //method to store news in particular user account
    async createNews({title, imageurl, newsurl, date, userId,slug}){
        
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    imageurl,
                    newsurl,
                    date,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createNews :: error", error);
        }
    }

    //method to delete a news from particular user account
    async deleteNews(slug){
        console.log(slug,"////");
        
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteNews :: error", error);
            return false
        }
    }

    //method returns list of news saved in all users account
    async listNews(){
        try {
            const result=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                
            )
            const documents = result.documents
            return documents
        } catch (error) {
            console.log("Appwrite serive :: deleteNews :: error", error);
            return false
        }
    }

    //return saved news of a particular user account
    async getNews(queries = [Query.equal("userId", "")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getNews :: error", error);
            return false
        }
    }

    //*******************  Firebase Cloud Messaging  **************************/
    
    //method which store fcm token of user 
    async createMessage({userId,token,slug}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMessageCollectionId,
                slug,
                {
                    userId,
                    token
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createMessage :: error", error);
        }
    }

    //return list of all fcm tokens available
    async getToken(queries = [Query.equal("userId", "")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteMessageCollectionId,
                // queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getNews :: error", error);
            return false
        }
    }

    
}


const service = new Service()
export default service