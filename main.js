// Listen for form submit
document.getElementById('myForm').addEventListener('submit', bookmarkSaver);
// Save Bookmark
function bookmarkSaver(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
      }
    
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmarks is null

    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form

    document.getElementById('myForm').reset();


    // Re-fetch bookmarks
    fetchBookmarks();
    // Prevent form from submitting
    e.preventDefault();

}

// fetch bookmarks

function fetchBookmarks() {
    // Get bookmarks from localStorage

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id

    var bookmarkResults = document.getElementById('bookmarksResults');

    // Build output

    bookmarkResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        //The .well class adds a rounded border around an element with a gray background color and some padding
        bookmarkResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';

    }
}
 
// Delete bookmark

function deleteBookmark(url){
     // Get bookmarks from localStorage

     var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
// Loop through the bookmarks
for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url==url){
         // Remove from array
        bookmarks.splice(i,1);
    }
}
// Re-set back to localStorage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

// Re-fetch bookmarks
fetchBookmarks();

}

// Validate Form

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('please fill the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert('please enter valid URL');
        return false;
    } else {
        return true;
    }
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }