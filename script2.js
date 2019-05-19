var xml = new XMLHttpRequest(), arr = [];

xml.onreadystatechange = function () {
    if (xml.status === 200 && xml.readyState === 4) {
        console.log(JSON.parse(xml.responseText));
        for (var i = 0; i < JSON.parse(xml.responseText).length; i++)
            if (JSON.parse(xml.responseText)[i].group === 'ИТД-21')
                arr.push(JSON.parse(xml.responseText)[i]);
        pushTable();
    }
};

xml.open('GET', 'https://raspisos.irinabot.ru/raspisos/raspisos/');
xml.send();

function pushTable() {
    type = ['(л)', '(пр)', '(л/р)']
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name !== null)
            if (document.getElementsByClassName(arr[i].position)[Number(arr[i].day)].innerHTML === '')
                document.getElementsByClassName(arr[i].position)[Number(arr[i].day)].innerHTML = '<ul><li class="type">' +
                    type[parseInt(arr[i].type)] + '</li><li class="caption">' + arr[i].name + '</li><li class="teacher">' +
                    arr[i].teacher + '</li><li class="cab">' + arr[i].classroom + '/' + arr[i].housing + '</li></ul>';
            else
                document.getElementsByClassName(arr[i].position)[Number(arr[i].day) + 5].innerHTML = arr[i].name;
    }


}