let inputEl = document.querySelector(".input");
let searchEl = document.querySelector(".search");
let resultEl = document.querySelector("#result");

// events

searchEl.addEventListener("click", () => {
    let book = "";
    let q = inputEl.value;
    q = q.split(" ").join("+");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`).then(res => res.json()).then(data => {
        let items = data.items;
        items.forEach(item => {
            let {
                authors,
                title,
                publishedDate,
                pageCount,
                description
            } = item.volumeInfo;
            let img = item.volumeInfo.imageLinks.thumbnail;
            img = img.split(":");
            img[0] = "https";
            img = img.join(":");
            let isbn = item.volumeInfo.industryIdentifiers[0].identifier;
            if (authors) authors = authors.join(", ");

            book +=
                `<div class="book">
                    <div class="img">
                        <img src="${img}"
                            alt="" srcset="">
                    </div>
                    <div class="content">
                        <h3 class="title">${title}</h3>
                        <p class="authors">Author: ${authors}</p>
                        <p class="date">Published Date: ${publishedDate}</p>
                        <p class="page">Pages: ${pageCount}</p>
                        <a target="_blank" href="book.html?isbn=${isbn}">Read</a>
                    </div>
                </div>`;

            resultEl.innerHTML = book;
        });
    });
});
