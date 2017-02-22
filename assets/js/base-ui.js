$(document).ready(function(e) {
    //用户名的title
    $(".account-name").attr("title",$(".account-name").text());
});

function tooltip(){    //tooltip 自定义工具提示
    $(".table").on("mouseenter",".l-tooltip-toggle",function(){
        var $the = $(this);
        var title = $the.attr("title") || $the.data("title");
        $the.data("title", title);
        $the.removeAttr("title");
        // 可选的颜色
        var colors = ["blue", "blueDeep", "green", "red", "cyan", "cyanDeep", "goldenrod", "brown", "gray", "light-gray", "pink"];
        var Ltooltip_bg = (function(){
            var color = null;
            for (var i = 0, len = colors.length; i < len; i++) {
                color = colors[i];
                if($the.hasClass(color)){return color;}
            }
        }());

        // 获取操作按钮位置
        var x = $the.offset();
        // tooltip 的属性
        var Ltooltip_attr = {"class": ("l-tooltip " + Ltooltip_bg), "id": "Ltooltip"};
        var Ltooltip_css = {"fontSize":12,"left":x.left-16,"top":x.top-32};
        var $Ltooltip = $("#Ltooltip");
        if($Ltooltip.length){
            $Ltooltip.text(title).attr(Ltooltip_attr).css(Ltooltip_css).show();
        }else{
            // 创建提示元素
            $Ltooltip = $("<div>",{attr: Ltooltip_attr, css: Ltooltip_css});
            $Ltooltip.text(title);
            $(document.body).append($Ltooltip);
        }
    });
    $(".table").on("mouseleave",".l-tooltip-toggle",function(){
        $("#Ltooltip").hide();
    });  //tooltip
}
function iePlaceholder(className, css){
    var isPlaceholderSupport = (function() {   //判断浏览器是否支持 placeholder 属性
        return 'placeholder' in document.createElement('input');  
    }());
    function displayToggle(input){
        var input_tip = $(input).parents("label").find("."+className);
        if(input.value!==""){
            input_tip.hide();
        }else{
            input_tip.show();
        }
    }
    if (!isPlaceholderSupport){
        $(".search-items :text").each(function(index, element) {
            var placeholder = $(element).attr("placeholder");
            if(!placeholder){return;}
            var inputTip = $("<span>",{
                  attr:{"class": className}
            });
            if(css){inputTip.css(css);}
            inputTip.text(placeholder);
            $(element).after(inputTip);
            displayToggle(element);
        });
        $(".search-items").on("keyup blur input",":text",function(){displayToggle(this);});
    }
}
function configLayer(){     //配置layer的第三方皮肤
    if(typeof layer=="undefined"){
        return false;
    }else{
        layer.config({
            extend: ['skin/myskin/style.css',
                     'extend/layer.ext.js'] //加载您的扩展样式
        });
    }
}
