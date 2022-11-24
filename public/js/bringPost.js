function bringPost(){
    var postArea = document.getElementById('previousPosts')

    fetch("/getPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
    }).then(async (resp) => {
        console.log('resp:',resp)
        resp.json().then(response => {
            console.log('response:',response)
            response.forEach((item, index) => {
                postArea.innerHTML +=  `<p>${item.post} <a onclick="deletePost(${index})" href="javascript:void(0);">Excluir</a> <br></p>`
            })
        })
    })
}

function deletePost(index){
    fetch("/deletePost", {
        method: "POST",
        body:
            JSON.stringify({
                posPost: index
            })
        ,
        headers: { "Content-Type": "application/json" },
    }).then(() => window.location.href = '/')
}