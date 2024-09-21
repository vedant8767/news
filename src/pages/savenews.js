const saveNews = async ({authService,appwriteService,checkUserLogin,setsaveNews,saveUserNews,
    navigate,title, imageurl, newsurl, date, userId,slug})=>{
    console.log("save2");
    let check = true
    if(checkUserLogin){
        const user = await authService.getCurrentUser()
        const userId=user.$id
        const allnews = await appwriteService.listNews()
        const userprevallnews = allnews.map((news)=>{
            if(news.userId === userId){
                return news.title
            }
        })
        console.log(userprevallnews)
        for(let i=0;i<userprevallnews.length;i++){
            if(userprevallnews[i]===title && userprevallnews[i]!== 'undefined'){
                console.log(userprevallnews[i]);
                console.log(title)
                setsaveNews(false)
                check = false
                console.log(saveUserNews)
            }
        }
        if(check){
            console.log(saveUserNews)
            const news = await appwriteService.createNews({title, imageurl, newsurl, date ,userId ,slug });
            if (news) {
                navigate(`/account`);
            }
            setsaveNews(true)
        }
    }
    else{
        navigate('/login')
    }
}

export default saveNews;