$(function(){

    $(window).bind("resize",function(){
        console.log($(this).width())
        if($(this).width() <706){
        $('#blocks').removeClass('horizontal');
        $('#btnBox').removeClass('valign-wrapper').addClass('center-align').css('margin-top','2%');
        }
        else{
        $('div').addClass('horizontal');
        $('#btnBox').removeClass('center-align').addClass('valign-wrapper').css('margin-top', '20%');
        }
    })
    
    $("#survey").on("click", function(event){
        event.preventDefault();
        window.open("./survey.html");
    })
})
