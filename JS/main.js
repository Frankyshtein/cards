$("li").on('click',function(){
    if($(this).hasClass("active")){return 0;}
    $(".active div").animate({height:0,top:50+"%"},200);
    $(".active").removeClass("active");
    $(this).children("div").animate({height:100+"%",top:0},300);
    $(this).addClass("active");
})
$(".second").on('click',function(){
    $(".wrapper .main").addClass("out");
})
$(".first").on('click',function(){
    $(".wrapper .main").removeClass("out");
    $(".wrapper .main").addClass("in");
})
$(".wrapper .calendar").datepicker({
 monthNames: ['Январь', 'Февраль', 'Март', 'Апрель',
'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
'Октябрь', 'Ноябрь', 'Декабрь'],
 dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
 firstDay: 1,
});
