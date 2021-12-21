import { ApiHelper } from "./api-helper.js";

export class Posts {
  constructor() {
    this.state = {
      posts: [],

      isLoadingPosts: false,
      isLike: false,
    };
    this.apiHepler = new ApiHelper();
  }
  seState(newState) {
    this.state = newState;
  }
  handleChange(e) {
    const { posts } = this.state;
    let searchValue = e.target.value;
    this.handleSearch(posts, searchValue)
  }
  handleCheckbox(checkbox){
    const checkboxes= document.querySelectorAll("#check-All")
     if(checkbox.checked==true){
      checkboxes.forEach((checki) => {
        checki.checked ===true
      })
}
else{
  checki.checked ===false
}
  }
  async getPostContacts() {
    let { posts } = this.state
    console.log(posts, "post")

    const tokenApi = await this.apiHepler.fetchFromPortal("/token",'POST');
    this.seState({ ...this.state, isLoadingPosts: false, tokenApi });
    const contactsApi = await this.apiHepler.fetchFromPortal("/contacts?count=100",'GET');
    posts = contactsApi.contacts;
    this.seState({ ...this.state, isLoadingPosts: false, posts });
    console.log(posts, "ouhoud")

    this.render(posts)
  }


  handleSearch(posts, searchValue) {
    const filterContact = posts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchValue)  || contact.phoneNumber.toLowerCase().includes(searchValue)
    })
    this.render(filterContact)
  


  }

   render(posts){
    console.log(posts)
    let taskList = document.querySelector(".task-List");
    taskList.innerHTML = ` <div  class="conts-all">
    <div class="main-div">
    <div class ="Audience-div">
    <i class="fas fa-align-right" ></i>
    <span class ="Audience">Audience</span>
    <span class="content">content 100</span>
    </div>
    <div class="tages">
    <h4>includes tages:</h4>
    <div class="greet">
    <p class="para1">greetings </p>
    </div>
    <p class="para2">greetings <i class="fas fa-check-circle" id="Audience-i"></i>  </p>
    <p class="para3">greetings </p>
    <p class="para4">greetings <i class="fas fa-check-circle" id="Audience-i"></i> </p>
    </div>
    <div class="tage-div">
    <h4>Exclude tages:</h4>
    <p class="para1">greetings </p>
    <p class="para2"> <i class="fas fa-check-circle" id="Audience-i"></i> </p>
    <p class="para3">greetings </p>
    <p class="para5">greetings <i class="fas fa-check-circle" id="Audience-i"></i> </p>
    </div>
    <div class="tage-div">
    <h4>message send</h4>
    <div class="place">
    <input  type="text" placeholder="min">
    <input class="inpt" type="text" placeholder="mix">
    </div>
    </div>
    <div class="tage-div-msg">
    <h4>message Received</h4>
    <div class="place">
    <input class  type="text" placeholder="min">
    <input class="inpt" type="text" placeholder="mix">
    </div>
    </div>
    <button class="btn">save filters</button>
    </div>
    <div class="sub-div">
    <div class="cont">
    <div class="icon">
    <h2>All Contacts(100)</h2>
    <i class="fas fa-plus-circle" id="icn"></i></span>
    </div>
    <div class="checkbox">
    <input type="checkbox" id ="check-All"> <span>select All</span>
    <button>Export All</button>
    </div>
    <div class="contacts-wrapper">
    <div class="contacts-details-wrapper">
    <div class="contacts-checkbox">
    </div>
    <div class="contacts-details">
   ${posts?.map((post) => {
      return `
    <div class="main-profile">
    <div class="profile-img">
    <div class="check">
    <input type="checkbox" id="check-All" /> 
    </div>
     <div class="img"><img  src="img/i-1.JPG"></div>
     <div class="info">
     <h4>${post.name}</h4>
      <p>${post.phoneNumber}</p>
      img>
      </div>
      </div>
      <div class="icon">
      <i class="fas fa-plus-circle" id="icn"></i></span>
      </div>
      </div>
      `

    }).join("")}

   </div>
    </div>
    <div class="contacts-icon">
    <button>+</button>
    </div>
    </div>
    <div>
    </div>
    </div>
    </div>
    </div>`

    
  }
  
  
  init() {
    let search = document.getElementById("search")
    search.addEventListener('keyup', (e) => {
      posts && this.handleChange(e)
      const checkboxes= document.querySelectorAll("#check-All")
      checkboxes.addEventListener('onclick',(checkbox)=>{
       this.handleCheckbox(checkbox)
      })

  
    })
    // this.getPosts();
    // this.getPostImages()
    const {posts}= this.state;
    this.getPostContacts()
  


  }
}