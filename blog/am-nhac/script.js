let songs = [];
let filteredSongs = [];
let currentSort = {
    column: "id",
    asc: true
};

const tbody = document.querySelector("#songTable tbody");
const searchInput = document.getElementById("search");
const songCount = document.getElementById("songCount");

/* ===========================
   Load data
=========================== */

fetch("./songs.json")
    .then(res => res.json())
    .then(data => {

        songs = data.map((song, index) => ({
            id: index + 1,
            ...song
        }));

        filteredSongs = [...songs];

        renderTable(filteredSongs);

    })
    .catch(err => {

        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Failed to load songs.json
                </td>
            </tr>
        `;

        console.error(err);

    });

/* ===========================
   Render table
=========================== */

function renderTable(data){

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No songs found.
                </td>
            </tr>
        `;

        songCount.textContent = "0 songs";

        return;
    }

    data.forEach(song => {

        tbody.innerHTML += `
            <tr>

                <td>${song.id}</td>

                <td class="song-title">
                    ${song.song}
                </td>

                <td class="artist">
                    ${song.artist}
                </td>

                <td>

                    <a
                        class="listen-link"
                        href="${song.spotify}"
                        target="_blank"
                        title="Open in Spotify">

                        🎵

                    </a>

                </td>

            </tr>
        `;

    });

    const artistCount = new Set(data.map(s => s.artist)).size;

    songCount.textContent =
        `${data.length} songs • ${artistCount} artists`;

}

/* ===========================
   Search
=========================== */

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.trim().toLowerCase();

    filteredSongs = songs.filter(song =>

        song.song.toLowerCase().includes(keyword) ||

        song.artist.toLowerCase().includes(keyword)

    );

    sortData();

});

/* ===========================
   Sort
=========================== */

document.querySelectorAll("th[data-sort]").forEach(th => {

    th.addEventListener("click", () => {

        const column = th.dataset.sort;

        if(currentSort.column === column){

            currentSort.asc = !currentSort.asc;

        }else{

            currentSort.column = column;

            currentSort.asc = true;

        }

        sortData();

    });

});

function sortData(){

    filteredSongs.sort((a,b)=>{

        let x = a[currentSort.column];
        let y = b[currentSort.column];

        if(currentSort.column === "id"){

            return currentSort.asc
                ? x - y
                : y - x;

        }

        x = x.toLowerCase();
        y = y.toLowerCase();

        if(x < y)
            return currentSort.asc ? -1 : 1;

        if(x > y)
            return currentSort.asc ? 1 : -1;

        return 0;

    });

    renderTable(filteredSongs);

}

/* ===========================
   Press "/" to search
=========================== */

document.addEventListener("keydown",(e)=>{

    if(
        e.key === "/" &&
        document.activeElement !== searchInput
    ){

        e.preventDefault();

        searchInput.focus();

    }

});
