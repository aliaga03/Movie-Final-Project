const searchButton = document.querySelector(`.search-button`);
searchButton.addEventListener('click', function() {

    const inputKeyword = document.querySelector('.input-key');
    fetch('http://www.omdbapi.com/?apikey=77db67e7&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
   
            let cards = '';
            movies.forEach(mov => cards += showCards(mov));
            const movieContainer = document.querySelector('.movie-list');
            movieContainer.innerHTML = cards;

            // ketika tombol detail diklik
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => {
                btn.addEventListener('click', function() {
                    const imdbid = this.dataset.id;
                    fetch('http://www.omdbapi.com/?apikey=77db67e7&i=' + imdbid)
                        .then(response => response.json())
                        .then(mov => {
                            const movieDetail = showMovieDetail(mov);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetail;
                        })
                })
            });
        });

});

function showCards(mov) {
    return `
    <div class="movie-list-item">
    <img class="movie-list-item-img" src="${mov.Poster}" alt="">
    <span class="movie-list-item-title">${mov.Title}</span>
    <p class="movie-list-item-desc">${mov.Year}</p>
    <button class="modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${mov.imdbID}">details</button>
</div>`;
}

function showMovieDetail(mov) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${mov.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item">
                    <h4> ${mov.Title}</h4>
                </li>
                <li class="list-group-item"><strong>Released :</strong> ${mov.Released}</li>
                <li class="list-group-item"><strong>Genre :</strong> ${mov.Genre}</li>
                <li class="list-group-item"><strong>Runtime :</strong> ${mov.Runtime}</li>
                <li class="list-group-item"><strong>Director :</strong> ${mov.Director}</li>
                <li class="list-group-item"><strong>Actors :</strong> ${mov.Actors} </li>
                <li class="list-group-item"><strong>Writer :</strong> ${mov.Writer} </li>
                <li class="list-group-item"><strong>Plot :</strong> <br>${mov.Plot} </li>
            </ul>
        </div>
    </div>
</div>`;
}
