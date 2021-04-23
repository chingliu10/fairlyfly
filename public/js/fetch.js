
    console.log("window has fully loaded")

    window.addEventListener("load", function () {
        fetch(`/getposts`)
        .then(response => response.json())
        .then(output => {
            document.querySelector(".contentLoader").style.display = "none"
            let parent = document.querySelector(".content")
            
            for (let x =0; x < output.data.length; x++) {
                let card = document.createElement("div")
                // card.setAttribute("class", "card")
                parent.appendChild(card)
                card.innerHTML = `
                <div class="innerCard">
                <div class="topInner">
                            <span class="pin ${output.data[x].postStatus}"><i class="fas fa-dot-circle"></i></span>
                            <span class="cardTitle">${ output.data[x].title }</span>
                </div>
                <hr>
                <div class="innerContent">
                    <p>
                        ${ output.data[x].explanation }
                    </p>
                </div>
                </div>
                <div class="edit" onClick="popEdit(this)">
                <i class="far fa-edit"></i>
                </div>
                </div>  
                <div class="statusContent">
                    ${(function () {
                    
                        if (output.data[x].postStatus === 'pending'){
                            return `<div class="pendingInterface">
                                        <span class="backToPost" onClick="dropStatus(this)">
                                            <i class="fas fa-caret-down fa-2x"></i>
                                        </span>
                                        <div class="pendingBox">
                                            <button onClick="updatePost(this)"></button>
                                        </div>
                                    </div>`
                        }
                        else {
                            return `<div class="clearedInterface">
                                    <span class="backToPost" onClick="dropStatus(this)">
                                        <i class="fas fa-caret-down fa-2x"></i>
                                    </span>
                                    <h3 style="color: white">
                                        This Post Has Been Cleared
                                        <span class="deletePost" onClick="deletePost(this)">Delete</span>
                                    </h3>
                                    </div>`
                        }

                    })()}
                </div>
                `
                card.classList.add("card")
                setTimeout(function () {

                    card.classList.add("addCardTransition")
                    }, 50)
                }

             })

    })

    
    
