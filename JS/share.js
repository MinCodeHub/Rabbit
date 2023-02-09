function fn_sendFB(sns){
    var thisUrl = document.URL;
    var snsTitle = "2023 토끼 테스트";
    if( sns == 'facebook' ) {
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + thisUrl);
    }
    else if( sns == 'twitter' ) {
        window.open("https://twitter.com/intent/tweet?text=" + snsTitle + "&url=" + thisUrl);
    }

}