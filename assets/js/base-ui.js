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
        var colors = ["grey", "blue", "blueDeep", "green", "red", "cyan", "cyanDeep", "goldenrod", "brown", "gray", "light-gray", "pink"];
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

function Ltree(tree, tarEle){
    this.treeDatas = [];

    var init = function (treeArr, tarEle, cloneTree, isChild){
        var $ul = $("<ul>", {
            class: "tree-folder-content"
        });
        if(!isChild){
            $ul.addClass("l-tree tree");
        }

        $.each(treeArr, function(i, ele){
            cloneTree.push(ele);

            var $input = $("<input>", {
                type: "checkbox",
                checked: ele.checked,
                class: "ace ace-checkbox-2",
                "data-index": ele.index,
                name:"auth_id",
                value:ele.value
            });
            var $label = $("<label>", {
                index: ele.index
            }).prepend($input, $("<span>", {class: "lbl", text: ele.name}));

            var $li = $("<li>", {id: ele.index}).append($label);
            if(!isChild){
                $li.addClass("role-wapper");
            }

            var children = ele.children;
            if(children && children.length > 0){
                $li.addClass("tree-folder");
                $label.addClass("tree-folder-header");
                var cloneChildren = cloneTree[i].children = [];
                init(children, $li, cloneChildren, true);
            }else{
                $li.addClass("tree-item");
            }

            $ul.append($li);
        });
        tarEle.append($ul);
    };

    var checkAll = function(id, checked){
        $("#"+id).find("ul :checkbox").prop("checked", checked);
        var children = treeDatas[id].children;
        if(!children){
        	return;
        }
        $.each(children, function(i, ele){
            ele.checked = checked;
        });
    };

    var checkParent = function(id, checked){
        var $parentLi = $("#"+id);
        var $checkbox = $parentLi.find("ul :checkbox");
        var $checkedbox = $parentLi.find("ul :checkbox:checked");
        var parCheckbox = $parentLi.find("label :checkbox")[0];
        if($checkedbox.length < $checkbox.length){
            // parCheckbox.checked = false;
            treeDatas[id].checked = false;
        }else{
            parCheckbox.checked = true;
            treeDatas[id].checked = true;
        }
    };

    var treeDatas = this.treeDatas;
    init(tree, tarEle, treeDatas);

    $(document).on("change", ":checkbox", function(e){
        $.each(treeDatas, function(i, ele){
            var tarChecked = e.target.checked,
                checkedIdArr = $(e.target).data("index").toString().split("-"),
                lev1Id = checkedIdArr[0],
                lev2Id = checkedIdArr[1];
            // select level 1
            if(checkedIdArr.length === 1){
                treeDatas[lev1Id].checked = tarChecked;
                checkAll(lev1Id, tarChecked);
            // select level 2
            }else if(checkedIdArr.length === 2){
                treeDatas[lev1Id].children[lev2Id].checked = tarChecked;
                checkParent(lev1Id, tarChecked);
            }
        });
    });
    return treeDatas;
}
