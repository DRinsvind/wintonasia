(function($) {
  "use strict"; // Start of use strict

  // Old browser notification
  $(function() {
    $.reject({
      reject: {
        msie: 10
      },
      imagePath: 'img/icons/jReject/',
      display: [ 'chrome','firefox','safari','opera' ],
      closeCookie: true,
      cookieSettings: {
        expires: 60*60*24*365
      },
      header: 'Ваш браузер устарел!',
      paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
      paragraph2: 'Пожалуйста, установите современный браузер:',
      closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
      closeLink: 'Закрыть это уведомление',
    });
  });
  var indexPaymentSwiper,
      indexClientsSwiper,
      navbarBreakpoint = 1025;

  var init = {

    click:function(){
      $('#hamburger').click(function () {
        $(this).toggleClass('open');
        $('.nav-list').toggleClass('mobile');
      });
    },
    adventuresCustomSlider:function(){
      var ww = $(window).width();
      $(window).resize(function(){
          stopMove();
      })
      var id = 0;
      var initial = true;
      var timer;

      function add(){
          $('#adventage-block--'+id).addClass('adventage-block--active');
          $('#adventage-line--'+id).addClass('adventage-line--active');
          $('#adventage-item--'+id).addClass('adventage-item--active');
          $('.adventage-line--last-child').removeClass('adventage-line--left-1 adventage-line--left-2 adventage-line--left-3 adventage-line--left-4').addClass('adventage-line--left-'+id);
      }
      function remove(){
          $('.adventage-block').removeClass('adventage-block--active');
          $('.adventage-line').removeClass('adventage-line--active');
          $('.adventage-item').removeClass('adventage-item--active');
      }
      function startMove(){
          if(ww>800){
              $('.adventages-wrapper').removeClass('adventages-wrapper--mobile')
              timer = setInterval(function() {
                  advenrageMove();
              }, 3000);
          }else{
              if(timer) stopMove();
              $('.adventages-wrapper').addClass('adventages-wrapper--mobile')
          }
      }
      function stopMove(){
          clearInterval(timer);
      }
      function advenrageMove()
      {
          remove();
          id=id!==4?id+1:1;
          add();
       }
      $('.adventage-block').click(function () {
          stopMove();
          id = $(this).data('id');
          remove();
          initial = true;
          add();
          startMove();
      });
      $('.adventage-item').hover(function(){
          stopMove();
      });
      $('.adventage-item').mouseleave(function(){
          startMove();
      });
        startMove();
    },
    custom:function(){
        $('select').niceSelect();
    },
    swiper: function () {
        var ww = $(window).width(),mySwiper1,mySwiper2;

        function indexSwiper($wrapper,$swiper,$statusSwiper){
            if(ww>575){
                if($statusSwiper){
                    $('.'+$wrapper+'-list')[0].swiper.destroy();
                    $('.'+$wrapper+'-list .col-24').unwrap().removeClass('swiper-slide');
                    $('.'+$wrapper+'-list').removeClass('swiper-container');
                    $('.'+$wrapper+'-list .swiper-button-prev').remove();
                    $('.'+$wrapper+'-list .swiper-button-next').remove();
                    $('.'+$wrapper+'-wrapper').removeClass($wrapper+'-wrapper--margin');
                    $('.'+$wrapper+'-wrapper .arrow-default').addClass('arrow-default--close');
                    if($wrapper==='clients') indexClientsSwiper = false;
                    else if($wrapper==='payment') indexPaymentSwiper=false;
                }
            }else{
                if(!$statusSwiper){
                    $('.'+$wrapper+'-list .col-24').addClass('swiper-slide').wrapAll('<div class="swiper-wrapper"></div>')
                    $('.'+$wrapper+'-list').addClass('swiper-container').append('<div class="swiper-button-prev"></div>').append('<div class="swiper-button-next"></div>');
                    $('.'+$wrapper+'-wrapper').addClass($wrapper+'-wrapper--margin');
                    $('.'+$wrapper+'-wrapper .arrow-default').removeClass('arrow-default--close');
                    var $swiper = new Swiper('.'+$wrapper+'-list.swiper-container', {
                        speed: 400,
                        spaceBetween: 0,
                        centeredSlides: true,
                        slidesPerView: 1,
                        navigation: {
                            nextEl: '.'+$wrapper+' .arrow-default--right',
                            prevEl: '.'+$wrapper+' .arrow-default--left',
                        }
                    });
                    if($wrapper==='clients') indexClientsSwiper = true;
                    else if($wrapper==='payment') indexPaymentSwiper=true;
                }
            }
        }
        indexSwiper('clients',mySwiper1,indexClientsSwiper);
        indexSwiper('payment',mySwiper2,indexPaymentSwiper);
        var $swiper = new Swiper('.reviews-list.swiper-container', {
            speed: 400,
            spaceBetween: 30,
            centeredSlides: true,
            slidesPerView: 3,
            slideToClickedSlide:true,
            breakpoints: {
                // when window width is <= 320px
                1260: {
                    slidesPerView: 1
                }
            },
            pagination: {
                el: '.reviews-list .swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.reviews .review-wrapper__right-arrow',
                prevEl: '.reviews .review-wrapper__left-arrow',
            }
        });
    },
    navbar: function() {
      var delayTimer = undefined;
      if (matchMedia('only screen and (min-width: ' + navbarBreakpoint + 'px)').matches) {
        $('#hamburger').removeClass('open');
        $('.nav-list').removeClass('mobile');

        $('.nav-list__child').hover(function() {
          console.log(delayTimer);
          if (delayTimer !== undefined) clearTimeout(delayTimer);
          var self = this;
          $(self).find('.nav-list__dropdown').stop(true).addClass('nav-list__dropdown--show');
        }, function() {
          var self = this;
          delayTimer = setTimeout(function() {
            $(self).find('.nav-list__dropdown').stop(true).removeClass('nav-list__dropdown--show');
          }, 300);
        });
      }
    },
  }

  init.click();
  init.custom();
  init.adventuresCustomSlider();
  init.swiper();
  init.navbar();
  $(window).resize(function(){
    init.adventuresCustomSlider();
    init.swiper();
    init.navbar();
  })

})(jQuery); // End of use strict

/////ajax-contacts//////////
var cont_id;
var url_controller = "/ajax-adres.php";

$('.id-cont').on('change', function() {
  cont_id = $('.id-cont').val();
  //alert(cont_id);
  // e.preventDefault();   
  $.ajax({
    type: "POST",
    data: {
      cont_id: cont_id
    },
    dataType: "html",
    url: url_controller,
    success: function(data) {
      var $data = $(data);
      $('.cont-list').empty();
      $('.cont-list').html($data);
    }
  });

  $.ajax({
    type: "POST",
    data: {
      cont_id: cont_id
    },
    dataType: "html",
    url: "/ajax-map.php",
    success: function(data) {
      var $data = $(data);
      $('.map').html($data);
    }
  });
});
  /////////////////////////////////
