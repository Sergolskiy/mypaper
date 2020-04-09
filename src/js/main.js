$(document).ready(function(){

  // checking browser for WEBP
  hasWebP().then(function () {
    $('.webp-img').each(function () {
      var webp = $(this).data('webp');
      $(this).attr('data-blazy', webp);
    });
  }, function () {
    $('.webp-img').each(function () {
      var img = $(this).data('img');
      $(this).attr('data-blazy',  img );
    });
  });

  var bLazy = new Blazy();

  $('.owl-carousel').owlCarousel({
    margin: 20,
    loop:false,
    nav:true,
    dots: true,
    items: 1
  });

  if($('.owl-carousel').length > 0){
    var slides = $('.owl-dots').width();
    $('.owl-nav').width(slides + 64);
  }

  $(document).scroll(function () {
    var top = $(document).scrollTop();

    if($('.home-scroll').length > 0){
      if($(window).width() < 768){
        if (top == 0) {
          $(".header").removeClass('header--scrolled');
        } else {
          $(".header").addClass('header--scrolled');
        }
      }
    } else {
      if (top < 3) {
        $(".header").removeClass('header--scrolled');
      } else {
        $(".header").addClass('header--scrolled');
      }
    }

  });


  var move = false;
  if($(window).width() > 760){
    $('#fullpage').fullpage({
      navigation: true,
      slidesNavigation: true,
      controlArrows: false,
      anchors: ['1', '2', '3', '4', '5', '6', '7'],

      afterLoad: function(anchorLink, index, direction) {
        // console.log($('#fullpage .section').length);

        if(index === $('#fullpage .section').length) {
          $.fn.fullpage.setAutoScrolling(false);
          $.fn.fullpage.setFitToSection(false);
        }

        $(document).scroll(function () {
          var last = $('#fullpage').find('.section').last();
          var offset2 = last.offset();
          var w = $(window);

          if(offset2.top - w.scrollTop() > 0){
            $.fn.fullpage.setAutoScrolling(true);
            $.fn.fullpage.setFitToSection(true);
          }
        });
      },
      onLeave: function(anchorLink, index, destination){

        $('.home-slider-dot--active').removeClass('home-slider-dot--active');
        $('.home-slider-dot').eq(index -1).addClass('home-slider-dot--active');

      },
    });
  }



  $('.home-slider-dot').mousedown(function () {
    $('#fp-nav li').eq($(this).index()).find('a').click();
  });


  $('.home-screen__tabs-i').click(function () {
    $('.home-screen__tabs-i').removeClass('home-screen__tabs-i--active');
    $(this).addClass('home-screen__tabs-i--active');

    var index = $(this).index()+1;
    $('.home-screen__right-tabs-img').attr('src', $('.home-screen__right-tabs-img').attr('data-img-'+index));
  });

  $('.home-scroll__item--school').addClass('animate-on');

  if($(window).width() > 760){
    $('.has-submenu').hover(function () {
      $(this).addClass('active');
      $(this).find('.header__submenu').addClass('header__submenu--active');
    }, function () {
      $(this).removeClass('active');
      $(this).find('.header__submenu').removeClass('header__submenu--active');
    });

    $('.has-submenu-second').hover(function () {
      $(this).addClass('active');
      $(this).find('.header__submenu-second-wrap').addClass('header__submenu-second-wrap--active');
    }, function () {
      $(this).removeClass('active');
      $(this).find('.header__submenu-second-wrap').removeClass('header__submenu-second-wrap--active');
    });
  } else {
    $('.has-submenu').click(function (e) {
      if($(e.target).hasClass('header__link') || $(e.target).closest('.header__link').length > 0){
        $(this).toggleClass('active');
        $(this).find('.header__submenu').toggleClass('header__submenu--active');
      }

    });

    $('.has-submenu-second').click(function (e) {
      if($(e.target).hasClass('header__submenu-link') || $(e.target).closest('.header__submenu-link').length > 0) {
        $(this).toggleClass('active');
        $(this).find('.header__submenu-second-wrap').toggleClass('header__submenu-second-wrap--active');
      }
    });
  }


  $('.header__mobile-menu').click(function (e) {
    e.preventDefault();
    $('.header__menu').toggleClass('open');
    $(this).toggleClass('active');
    $('.has-submenu').removeClass('active');
    $('.header__submenu').removeClass('header__submenu--active');
    $('.header__submenu-second-wrap').removeClass('header__submenu-second-wrap--active');
    $('.has-submenu-second').removeClass('active');
  });

  $( ".select" ).selectmenu();

  $('.page-pricing__item').click(function () {
      $('.page-pricing__item').removeClass('active');
      $(this).addClass('active');
      $('.page-pricing__services-mobile').removeClass('active');
      $('.page-pricing__services-mobile').eq($(this).index()).addClass('active');
  });

  $('.home-screen__showing-tab').click(function () {
      $('.home-screen__showing-tab').removeClass('active');
      $(this).addClass('active');
      $('.home-screen__showing-tab-item').removeClass('active');
      $('.home-screen__showing-tab-item').eq($(this).index()).addClass('active');
  });


  $('.review__form-btn, .subscribe-form__btn').click(function (e) {
    e.preventDefault();
    $(this).closest('form').find('input').each(function () {
      if($(this).val() === ''){
        $(this).parent().addClass('error-field');
        $(this).parent().removeClass('correct');
      } else {
        $(this).parent().addClass('correct');
        $(this).parent().removeClass('error-field');
      }
    });

    $(this).closest('form').find('textarea').each(function () {
      if($(this).val() === ''){
        $(this).parent().addClass('error-field');
        $(this).parent().removeClass('correct');
      } else {
        $(this).parent().addClass('correct');
        $(this).parent().removeClass('error-field');
      }
    });

    $(this).closest('form').find('select').each(function () {
      if($(this).val() === '0'){
        $(this).parent().addClass('error-field');
        $(this).parent().removeClass('correct');
      } else {
        $(this).parent().addClass('correct');
        $(this).parent().removeClass('error-field');
      }
    });
  });

  $('input, textarea, .ui-selectmenu-button, .phone').click(function () {
      $(this).parent().removeClass('error-field');
  });

  $('.phone').inputmask("+1 999 999 99 99");

  $('.page-contact__btn').click(function () {
    if($(this).parent().find('input').val().length === 16 && $(this).parent().find('input').val().indexOf('_') === -1){
      $(this).prev().addClass('correct');
      $(this).prev().removeClass('error-field');
    } else {
      $(this).prev().addClass('error-field');
      $(this).prev().removeClass('correct');
    }
  });

});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();
