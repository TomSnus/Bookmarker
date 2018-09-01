document.getElementById('form').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }

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

    document.getElementById('form').reset();
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); //parse into JSON

    //Get output id
    var bookmarkResults = document.getElementById('bookmarksResults');

    //output
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="wall">' +
            '<h3>'+name
            + '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '
            + '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
            +'</h3>'
            + '</div>';

    }
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //refetch
    fetchBookmarks();
}

function validateForm(siteName, siteURL) {
    if(!siteName || !siteURL){
        alert('Please fill in the form')
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}