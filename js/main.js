document.getElementById('form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
        name: siteName,
        url: siteURL
    }


    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //parse into String
    } else {
        //Get bookmarks from ls
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //parse into JSON
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //parse into String
    }
    console.log(bookmark);
    e.preventDefault();
}