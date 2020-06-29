// 控制手機板選單顯示

$('.menu').click(function() {
    $('.hamburger').addClass('show')
})
$('.close-img').click(function() {
    $('.hamburger').removeClass('show')
})
$('.dropdown').click(function() {
    $('.bio').toggle();
})
$('.logout-rwd').click(function() {
    $('.hamburger').removeClass('show')
})
$('.login-rwd').click(function() {
    $('.hamburger').removeClass('show')
})
$('.signup-rwd').click(function() {
    $('.hamburger').removeClass('show')
})


// $(function() {
//     $('.ds').addClass('all').addClass('scale');
//     $('#combo img').addClass('img-responsive');
//     var selectedClass = "";
//     $(".select-btn>a").click(function(){
//     selectedClass = $(this).attr("data-rel");
//     $("#combo").fadeTo(100, 0.1);
//     $("#combo div").not("."+selectedClass).fadeOut().removeClass('scale');
//     setTimeout(function() {
//     $("."+selectedClass).fadeIn().addClass('scale');
//     $("#combo").fadeTo(300, 1);
//     }, 300);
//     return false;
// });
// });