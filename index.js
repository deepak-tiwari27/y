import {tweetsData} from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


// tweetBtn.addEventListener("click",()=>{
   
// })
document.addEventListener("click",(event)=>{
   if(event.target.dataset.like){
    
    handleLikeClick(event.target.dataset.like)
   }

    else if(event.target.dataset.retweet){
    handleRetweetClick(event.target.dataset.retweet)
   }
   else if(event.target.dataset.reply){
    handleReplyClick(event.target.dataset.reply)
   }
   else if(event.target.id ==="tweet-btn"){
    handleTweetBtnClick()
   }

})

function handleLikeClick(tweetId){
    const targetTweetObject = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]
   

  if(targetTweetObject.isLiked){
    targetTweetObject.likes--
    
  }else{

    targetTweetObject.likes++
            
}
    targetTweetObject.isLiked = !targetTweetObject.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObject = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObject.isRetweeted){
        targetTweetObject.retweets--
    }else{
        targetTweetObject.retweets++
    }
    targetTweetObject.isRetweeted = !targetTweetObject.isRetweeted
    render()

}
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}
function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input")
    if(tweetInput.value){
    tweetsData.push({
        handle: `@tiwariDeepak`,
        profilePic: `./deepak.jpg`,
        likes: 3,
        retweets: 2,
        tweetText: `${tweetInput.value}`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    })}
    render()
    tweetInput.value=''

}





function getFeedHtml(){
    let  feedHtml =''
    
      tweetsData.forEach((tweet)=>{
        let likeIconClass=''
        if(tweet.isLiked){
            likeIconClass = "liked"
        }
           let retweetIconClass = ''
          if(tweet.isRetweeted){
            retweetIconClass = "retweeted"
          }
           
          let repliesHtml =''
          
          if(tweet.replies.length>0){
            tweet.replies.forEach((reply)=>{
                repliesHtml+=`
                <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
                `
                
                
                
                
                
          })
          }






          feedHtml += `<hr>
          <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                       <i class = "fa-regular fa-comment-dots " data-reply ="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class = "fa-solid fa-heart ${likeIconClass} " 
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                
                    </span>
                    <span class="tweet-detail">
                    <i class = "fa-solid fa-retweet ${retweetIconClass} " 
                    data-retweet = "${tweet.uuid}"
                    ></i>
                       ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        
        <div id="replies-${tweet.uuid}">
        <hr style="width:70%;text-align:left; margin-left:50px; border:.5px solid orange;" >
        
        ${repliesHtml}
       
    </div>   


    </div>`
    
      }) 
    return feedHtml
}


function render(){
    document.getElementById("feed").innerHTML = getFeedHtml()
}


render()





 