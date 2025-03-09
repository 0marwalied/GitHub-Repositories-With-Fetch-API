let repos = document.querySelector(".repos");
let container = document.querySelector(".container");
let input = document.querySelector("input");
let getBtn = document.querySelector(".get-btn");
repos.style.width = container.offsetWidth + "px";
if(repos.children.length==0){
  repos.style.display='none';
}

let username="";
input.addEventListener("input", (e) => {
  username = e.target.value;
});


getBtn.addEventListener("click", () => {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message == "Not Found") {
        repos.innerHTML = `<h2>Not Found</h2>`;
      } else {
        let output = "";
        data.forEach((repo) => {
          output += `
          <div class="repo">
            <h2>${repo.name}</h2>
            <div class="repo-info">
              <p class="stars">${repo.stargazers_count} stars</p>
              <a class="link" href="${repo.html_url}" target="_blank">Visit</a>
            </div>
          </div>
        `;
        });
        repos.style.display = "flex";
        repos.innerHTML = output;
      }
    });
  
});
