function colorScheme() {
    const element = document.body
    const icon = document.getElementById("icon")
    element.classList.toggle("light")
    icon.innerHTML === 'Light <i class="fas fa-sun"></i>' ? icon.innerHTML = 'Dark <i class="fas fa-moon"></i>' : icon.innerHTML = 'Light <i class="fas fa-sun"></i>';
}

function getDataAndShow() {
    const input = document.getElementById("mainInp").value
    const output = document.getElementById("output")
    const spinner = document.getElementById("spinner")
    spinner.removeAttribute('hidden')
    
    fetch("https://api.github.com/search/users?q=" + input.trim().replace(/ /gi, ""), {

    })
        .then(response => response.json())
        .then(data => {
            let loop = data.items.length //<= 15 ? data.items.length : 15
            
            spinner.setAttribute('hidden', '')
            
            // const githubCards = output.getElementsByClassName("github-card");
            // for(let i = 0; i < githubCards.length; i++) {
            //     output.removeChild(githubCards[i]);
            // }

            output.querySelectorAll(".github-card").forEach(v => v.parentElement.removeChild(v));

            for(let i = 0; i < loop; i++){
                const el = document.createElement("div")
                el.classList.add("github-card")
                fetch("https://api.github.com/users/" + data.items[i].login, {}).then(response => response.json())
                .then(d => {
                    
                    el.innerHTML = `
                    <br>
                    <div class="card">
                    <div class="flex-container">
                    <section class="col-1">
                    <div class="getCenter">
                    <br>
                        <img src="${data.items[i].avatar_url}" alt="pfp">
                    </div>
                    </section>
                    <section class="col-2">
                        <h1>${data.items[i].login}</h1>
                        <h5><a href="https://github.com/${data.items[i].login}">${d.name !== null ? d.name : '<span class="red">404</span>'}</a></h5>
                        <h5><span class="border">Bio: </span>${d.bio !== null ? d.bio : '<span class="red">404 Bio Not Found</span>'}</h5>
                        <br>
                        <div class="flex-container color-container">
                            <section class="col-1">
                                <b>Followers</b><br><br>
                                <b class="int">${d.followers}</b>
                            </section>
                            <section class="col-2">
                                <b>Following</b><br><br>
                                <b class="int">${d.following}</b>
                            </section>
                            <section class="col-3">
                                <b>Repositories</b><br><br>
                                <b class="int">${d.public_repos}</b>
                            </section>
                        </div>
                        <br>
                        <div class="color-container">
                            <div class="flex-container">
                                <section class="col-1 stuff"><i class="fas fa-map-marker-alt"></i> ${d.location !== null ? d.location : '<span class="red">404</span>'}</section>
                                <section class="col-1 stuff"><i class="fas fa-envelope"></i> ${d.email !== null ? '<a href="mailto:${d.email}">Mail</a>' : '<span class="red">404</span>'}</section>
                            </div>
                            <div class="flex-container">
                                <section class="col-1 stuff"><i class="fas fa-link"></i> <a href="${d.blog.substring(0, 8) === 'https://' || d.blog.substring(0, 7) === 'http://' ? '' : 'http://'}${d.blog}">${d.blog !== null ? 'Website' : '<span class="red">404</span>'}</a></section>
                                <section class="col-1 stuff"><i class="fas fa-building"></i> ${d.company !== null ? d.company : '<span class="red">404</span>'}</section>
                            </div>
                        </div>
                        <br>
                        <div class="getCenter">
                            <img style="border-radius: 20px; border: 2px solid white" id="stats" src="https://github-readme-stats.vercel.app/api?username=${data.items[i].login}&show_icons=true&theme=github_dark">
                        </div>
                        <br>
                    </section>
                    </div>
                    
                    </div>
                `
                })
                output.appendChild(el)
                console.log(output.innerHTML)
                
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}
