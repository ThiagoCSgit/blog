function postar(){
    var post = document.getElementById("post").value;
  
    console.log('post',
      JSON.stringify({
        userPost: post,
      })
    );
  
    fetch("/post", {
      method: "POST",
      body: JSON.stringify({
        userPost: post,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async (resp) => {
      var status = await resp.text();
      console.log('status',status);
      if (status == "conectado") {
        location.href = "/index.html";
      } else {
        alert("Erro ao criar ou alterar ou apagar post");
      }
    });
}