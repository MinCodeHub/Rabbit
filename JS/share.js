const hash = '%Rabbit_test %2023토끼테스트 %2023토끼테스트 ';

function fn_sendFB(sns){
    var thisUrl = document.URL;
    var snsTitle = "[2023 토끼 테스트]";
    if( sns == 'facebook' ) {
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + thisUrl+'&t='+snsTitle+''+hash,
        'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    }
    else if( sns == 'twitter' ) {
        let name = document.querySelector('.sub_tit').innerHTML;
        switch (name) {
          case '겁이 많은 내적관종<br> 라이언헤드':
          case '연애? 하고싶은데 하고 싶지 않아<br>아메라칸 퍼지롭':
          case '매력 급 부상 중!! <br>홀랜드 롭이어':
          case '시원시원 매력쟁이 랙스':
            name;
            break;
          default:
            name;
        }
        window.open("https://twitter.com/intent/tweet?text=" + snsTitle + "&url=" + thisUrl, 'twittersharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    }

}


function copy_url(){
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    alert("URL이 복사되었습니다.");

}