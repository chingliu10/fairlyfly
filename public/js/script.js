document.querySelector(".add").addEventListener("click", function(e) {

    document.querySelector(".popUpPosts").style.display = "grid"
    

    setTimeout(function(){
        document.querySelector(".newPost").classList.toggle("np")
    }, 100)

})

document.querySelector(".exitPost").addEventListener("click", function(e){
    document.querySelector(".newPost").classList.toggle("np")

    setTimeout(() => {
    document.querySelector(".popUpPosts").style.display = "none"   
    }, 1200)

})

document.querySelector(".createPostForm").addEventListener("submit", function (e){
    e.preventDefault()
    
    let formDetails = new FormData(this)
    let myForm = this
    let formJsonData = {
        "status" : "pending"
    }
    
    for (let x of formDetails.keys()) {
        
        formJsonData[x] = formDetails.get(x) 
    }

   
    
    btn.style.display = "inline-block"
    let loading = setInterval(myTimer, 250)
    fetch(`/createPost`, {
        method : "post",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(formJsonData)
    })
    .then(response => response.text())
    .then(output => {

        btn.style.display = "none"
        clearInterval(loading)
        console.log(output)
        myForm.reset()

    }) 


})


var x = 0
var state = 0
var btn = document.querySelector("#loading")
function myTimer () {

    if (state === 0) {

        switch (x) {

        case 0: 
            btn.style.borderTop = "5px solid green"
            x = x + 1
            break;
        case 1:
            btn.style.borderRight = "5px solid green"
            x = x + 1
            break
        case 2: 
            btn.style.borderBottom = "5px solid green"
            x = x + 1
            break;
        case 3:
            btn.style.borderLeft = "5px solid green"
            state = 1
            x = 0
            break
        default:
            console.log("an error occured")	
        }

    }else{

        switch (x) {

            case 0: 
                btn.style.borderTop = "5px solid white"
                x = x + 1
                break;
            case 1:
                btn.style.borderRight = "5px solid white"
                x = x + 1
                break
            case 2: 
                btn.style.borderBottom = "5px solid white"
                x = x + 1
                break;
            case 3:
                btn.style.borderLeft = "5px solid white"
                state = 0
                x = 0
                break
            default:
                console.log("an error occured")	
            }

    }

}


function popEdit(x) {

    let cardTitle = x.parentElement.children[0].children[0].children[1].textContent
    x.parentElement.children[2].classList.add("toggleStatusContent")
}
// document.querySelector(".loading").addEventListener("")

function updatePost (x) {
    let postTitle = x.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].textContent
    console.log(postTitle)
    x.textContent = "updating..."
    fetch(`/updatepost`, {
        method : "post",
        headers : {
            "content-type" : "application/json"
        },
        body: JSON.stringify({name : postTitle})
    })
    .then( res => res.json() )
    .then( output => {
        
        console.log(output)
        x.style.marginLeft = "75px"
        x.parentElement.style.backgroundColor = "#21BF73"
        x.textContent = "DONE"
        //change pin color
        let pin = x.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0]
        pin.style.backgroundColor = "#21BF73"
        x.removeAttribute("onClick")
        
    })

}


function dropStatus (x) {
    let drop = x.parentElement.parentElement
    drop.classList.remove("toggleStatusContent")

}


function deletePost (x) {
    let title = x.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[1].textContent
    x.textContent = "deleting..."
    fetch(`/deletepost`, {
        method : "post",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({post : title})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        x.parentElement.parentElement.parentElement.parentElement.remove()
    })

    
}