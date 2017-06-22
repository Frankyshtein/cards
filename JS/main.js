var cards = [], doings = [], tips = [], currentArray = [], metka = [], z=0, currentDate = new Date(), bufer = [];
cards = [1,["HTML теги",['div','Элемент div является универсальным блочным элементом и предназначен для группирования элементов документа с целью изменения вида содержимого через стили. Для этого добавляется атрибут class или id с именем класса или идентификатора. Как и при использовании других блочных элементов, содержимое div всегда начинается с новой строки, после него также добавляется перенос строки.'],['html','Элемент html является контейнером, который заключает в себе всё содержимое веб-страницы, включая элементы head и body. Открывающий и закрывающий теги html в документе не обязательны, но хороший стиль диктует непременное их использование. Как правило, html идёт в документе вторым, после определения типа документа (Document Type Definition, DTD), устанавливаемого через !DOCTYPE. Закрывающий тег html всегда стоит в документе последним.',1],['head','Элемент <head> предназначен для хранения других элементов, цель которых — помочь браузеру в работе с данными. Также внутри контейнера head находятся метатеги, которые используются для хранения информации предназначенной для браузеров и поисковых систем. Например, механизмы поисковых систем обращаются к метатегам для получения описания сайта, ключевых слов и других данных. Содержимое <head> не отображается напрямую на веб-странице, за исключением элемента title, он задаёт заголовок окна веб-страницы.',1],['body','Элемент <body> предназначен для хранения содержимого веб-страницы (контента), отображаемого в окне браузера. Информацию, которую следует выводить в документе, следует располагать именно внутри контейнера body. К такой информации относится текст, изображения, теги, скрипты JavaScript и т. д.',1],['link','Устанавливает связь с внешним документом вроде файла со стилями или со шрифтами. Элемент link обычно размещается внутри контейнера head и не создаёт ссылку, в отличие от элемента a.',1],['p','Определяет текстовый абзац. Элемент  является блочным, всегда начинается с новой строки, абзацы текста идущие друг за другом разделяются между собой отбивкой. Величиной отбивки можно управлять с помощью стилей. Если закрывающего тега нет, считается, что конец абзаца совпадает с началом следующего абзаца или другого блочного элемента.',1],['ul','Элемент ul устанавливает маркированный (неупорядоченный) список. Каждый пункт списка должен начинаться с элемента li.',1],['ol','Элемент ol устанавливает нумерованный (упорядоченный) список. Каждый элемент списка должен начинаться с li. Если к ol применяется таблица стилей, то элементы li наследуют эти свойства.',1],['li','Элемент li определяет отдельный пункт списка. Внешний элемент ul или ol устанавливает тип списка — маркированный или нумерованный.',1]],['CSS селекторы',[],[]]];


function dateSet() {
    for(i = 0; i < cards.length; i++) {
        var a = cards[i];
        for(j = 1; j < a.length; j++) {
            var b = a[j];
            b[2] = new Date();
            b[2] = JSON.stringify(b[2]);
            b[2] = JSON.parse(b[2]);
            console.log(b[2]);
            a[j] = b;
        }
        cards[i] = a;
    }
}

if(localStorage.getItem('cards') == null) {
    console.log(localStorage.getItem('cards'));
    dateSet();
    var a = JSON.stringify(cards);
    console.log(a);
    localStorage.setItem('cards',a);
} else {
    console.log(localStorage.getItem('cards'))
    cards=JSON.parse(localStorage.getItem('cards'));
    console.log(cards);
    for(i = 0; i < cards.length; i++) {
        for(j = 1; j < cards[i].length; j++) {
            cards[i][j][2] = new Date(Date.parse(cards[i][j][2]));
        }
    }
}
$(".container").customScroll({horizontal: false});

function cardStart(c) {
    for(i = 0;i < cards.length;i++) {
        if ($.inArray(c,cards[i]) != -1) {
            metka[0] = i;
            currentArray = cards[i];
            nextCard();
            $(".popap").html("<div>" + bufer[0] + "</div>");
        }
    }
}
function nextCard() {
    for(i =0;i < currentArray.length; i++){
        var a = currentArray[i];
        metka[1] = i;
        if(a[2] <= currentDate) {
            bufer[0] = a[0];
            console.log(bufer[0]);
            bufer[1] = a[1];
            return;
        } else {
            bufer[0] = "Нет карт для изучения";
            bufer[1] = "Нет карт для изучения";
        }
    }
}
function nextOne() {
    nextCard();
    $(".popap").children().fadeOut(250,function(){
        $(".popap").children().remove();
        $(".popap").html("<div>" + bufer[0] + "</div>");
        $(".popap").children().css("display","none");
        $(".popap").children().fadeIn();
    });
    $(".popap").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
        $(".popap").removeClass("flip");
    })
}
$(".deck").on('click', function() {
    $(".modal").fadeIn();
    var c = $(this).children("p").text();
    cardStart(c);
})
$(".modal").on('click', function(e) {
    var target = $(e.target);
    if(target.hasClass('modal') && !target.parents().hasClass('modal')){
        $(".modal").fadeOut();
        $(".popap").removeClass("flip");
        z=0;
  }
})
$(".popap").on('click',function() {
    if($(this).hasClass("flip")){return}
    $(this).addClass("flip");
    $(".popap").children().fadeOut(250,function(){
        $(".popap").children().remove();
        $(".popap").html("<div class=\"popapCont\">"+bufer[1]+"</div><ul><li>1</li><li>2</li><li>3</li><li>5</li><li>7</li></ul>");
        $(".popap").children().css("display","none");
        $(".popap").children().fadeIn();
        $(".popapCont").customScroll({horizontal: false});
        $(".popap li").on('click', function(){
            $(".popap").removeClass("flip");
            var a = cards[metka[0]], b = a[metka[1]];
            console.log(b);
            b[2].setDate(b[2].getDate()+Number($(this).text()));
            a[metka[1]] = b;
            cards[metka[0]] = a;
            localStorage.setItem('cards',JSON.stringify(cards));
            nextOne();
        });
    });
})























