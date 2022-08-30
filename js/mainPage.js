layui.use(["layer"], function(){
    let $ = layui.jquery;
    let layer = layui.layer;

    let greetIconI = $("#greetIcon")            // 问候图标
    let greetContentI = $("#greetContent");     // 问候内容
    let chineseIconDiv = $("#chineseIconDiv");  // 中国窗体
    let chinesePoemDiv = $("#chinesePoemDiv");  // 中国诗词
    let poemSentenceI = $("#poemSentence");
    let poemInfoI = $("#poemInfo");

    // 问候语
    function setGreet() {
        let now = new Date();
        let hour = now.getHours();
        let greetContent, greetIcon;
        if (hour >= 6 && hour < 11) {
            greetContent = getMessage("greetMorning");
            greetIcon = "icon-sunrise";
        } else if (hour >= 11 && hour < 14) {
            greetContent = getMessage("greetNoon");
            greetIcon = "icon-sun_max";
        } else if (hour >= 14 && hour < 17) {
            greetContent = getMessage("greetAfternoon");
            greetIcon = "icon-sunset";
        } else if (hour >= 17 && hour < 20) {
            greetContent = getMessage("greetEvening");
            greetIcon = "icon-sunset";
        } else if (hour >= 20 && hour < 24) {
            greetContent = getMessage("greetNight");
            greetIcon = "icon-moon_stars";
        } else {
            greetContent = getMessage("greetDawn");
            greetIcon = "icon-moon_stars";
        }
        greetIconI.removeClass();
        greetIconI.addClass("iconfont " + greetIcon);
        greetContentI.html(greetContent);

        let parameters = {
            "app_id": "cicgheqakgmpjclo",
            "app_secret": "RVlRVjZTYXVqeHB3WCtQUG5lM0h0UT09",
        };
        $.ajax({
            url: "https://www.mxnzp.com/api/holiday/single/" + getDateTime(),
            type: "GET",
            data: parameters,
            success: function (result) {
                if(result.code === 1){
                    let solarTerms = result.data.solarTerms;
                    if(result.data.solarTerms.indexOf("后") === -1) {
                        solarTerms = "今日" + solarTerms;
                    }
                    greetContentI.append("&nbsp;|&nbsp;" + solarTerms)
                }
            },
            error: function (err) {

            }
        });
    }

    // 获取天气
    function setWeather() {
        $.ajax({
            url: "https://v2.jinrishici.com/info",
            type: "GET",
            success: function (result) {
                if (result.status === "success") {
                    let weatherData = result.data.weatherData;
                    greetContentI.append("&nbsp;|&nbsp;" + weatherData.weather);
                }
                else {

                }
            },
            error: function (err) {

            }
        });
    }

    // 获取诗词
    function setPoem() {
        jinrishici.load(function(result) {
            // 自己的处理逻辑
            poemSentenceI.html(result.data.content);
            poemInfoI.html("【" + result.data.origin.dynasty + "】" + result.data.origin.author + "《" + result.data.origin.title + "》")
        });
    }

    // 显示随机颜色主题
    function setColorTheme() {
        let hour = new Date().getHours();
        let theme = lightThemeArray;
        if( 18 < hour || hour < 6) {
            theme = darkThemeArray;
        }
        let randomNum = Math.floor(Math.random() * theme.length);  // 随机选择一种主题

        let frostedGlass = $(".frostedGlass")
        $("body").css("background-color", theme[randomNum].bodyBackgroundColor);
        frostedGlass.css("color", getFontColor(theme[randomNum].frostedGlassBackgroundColor));
        frostedGlass.css("background-color", theme[randomNum].frostedGlassBackgroundColor);

        //随机显示中国窗体
        let index = Math.floor((Math.random() * chineseIconArray.length));
        let tempClassName = chineseIconArray[index];
        chineseIconDiv.html("<i id='chineseIconI' class='iconfont " + tempClassName + "'></i>")

        let chineseIconI = $("#chineseIconI");
        if (chineseIconI.length > 0) {
            chineseIconI.css({
                "color": getFontColor(theme[randomNum].bodyBackgroundColor),
            });
            // 调整窗体显示效果
            if(tempClassName === "icon-chuangge2" || tempClassName === "icon-chuangge4"){
                chineseIconI.css({
                    "transform": "rotate(90deg)"
                });
            }
            if(tempClassName === "icon-chuangge6" || tempClassName === "icon-chuangge8"){
                chineseIconI.css({
                    "transform": "rotate(45deg) scale(0.8)"
                });
            }
        }

        // 设置字体颜色
        greetIconI.css({
            "color": getFontColor(theme[randomNum].bodyBackgroundColor),
        })

        greetContentI.css({
            "color": getFontColor(theme[randomNum].bodyBackgroundColor),
        })

        // 设置中国诗词字体颜色
        chinesePoemDiv.css({
            "color": getFontColor(theme[randomNum].bodyBackgroundColor),
        });
    }

    // 国际化
    function getMessage(messageName) {
        return chrome.i18n.getMessage(messageName);
    }

    setGreet();       // 显示问候语
    setWeather();     // 获取天气
    setPoem();        // 获取诗词
    setColorTheme();  // 设置随机颜色主题
});