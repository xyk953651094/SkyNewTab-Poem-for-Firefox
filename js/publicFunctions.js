// 根据背景颜色改变字体颜色效果
function getFontColor(color) {
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    let r = parseInt(rgb[1], 16);
    let g = parseInt(rgb[2], 16);
    let b = parseInt(rgb[3], 16);
    let gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
    if (gray > 128) {
        return '#000000';
    } else {
        return '#ffffff';
    }
}

// 判断设备型号
function deviceModel() {
    let ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > -1) { return 'iPhone' }
    else if(ua.indexOf('iPad') > -1) { return 'iPad' }
    else if(ua.indexOf('Android') > -1) { return 'Android' }
    else { return '' }
}

// 获取日期时间
function getDateTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    if (month < 10) { month = '0' + month }
    if (day < 10) { day = '0' + day }
    return year.toString() + month.toString() + day.toString();
}