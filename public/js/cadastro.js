function cadastro(){
    var newName = document.getElementById("newName").value;
    var newPassword = document.getElementById("newPassword").value;
  
    console.log('cadastro',
      JSON.stringify({
        nome: newName,
        senha: newPassword,
      })
    );
  
    fetch("/cadastro", {
      method: "POST",
      body: JSON.stringify({
        nome: newName,
        senha: newPassword,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async (resp) => {
      var status = await resp.text();
      console.log('status',status);
      if (status == "conectado") {
        location.href = "/index.html";
      } else {
        alert("Erro ao criar usuário");
      }
    });
}