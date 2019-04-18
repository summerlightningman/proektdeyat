var date = new Date(), month = '', dayOfWeek = '',
    table = new Array(new Array());


switch (date.getMonth() + 1) {
    case 1:
        month = 'Января';
        break;
    case 2:
        month = 'Февраля';
        break;
    case 3:
        month = 'Марта';
        break;
    case 4:
        month = 'Апреля';
        break;
    case 5:
        month = 'Мая';
        break;
    case 6:
        month = 'Июня';
        break;
    case 7:
        month = 'Июля';
        break;
    case 8:
        month = 'Августа';
        break;
    case 9:
        month = 'Сентября';
        break;
    case 10:
        month = 'Октября';
        break;
    case 11:
        month = 'Ноября';
        break;
    case 12:
        month = 'Декабря';
        break;
}
switch (date.getDay()) {
    case 1:
        dayOfWeek = 'Понедельник';
        break;
    case 2:
        dayOfWeek = 'Вторник';
        break;
    case 3:
        dayOfWeek = 'Среда';
        break;
    case 4:
        dayOfWeek = 'Четверг';
        break;
    case 5:
        dayOfWeek = 'Пятница';
        break;
    case 6:
        dayOfWeek = 'Суббота';
        break;
    case 7:
        dayOfWeek = 'Воскресенье';
        break;
}

setTimeout(function () {
    document.getElementsByTagName('p')[0].innerHTML = dayOfWeek + ' ' + date.getDate() + ' ' + month + ' ' +
        date.getFullYear() + ' года  ';
}, 500);



