const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteMessageCollectionId: String(import.meta.env.VITE_APPWRITE_MESSAGE_COLLECTION_ID),
    newsdataio:String(import.meta.env.VITE_NEWSDATAIO),
    newsapi:String(import.meta.env.VITE_NEWSAPI),
    news:String(import.meta.env.VITE_NEWS),
}

export default conf