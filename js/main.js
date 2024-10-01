$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;

  $(".fullscreen").css("height", window_height);
  $(".fitscreen").css("height", fitscreen);

  // Niceselect js
  if (document.getElementById("default-select")) {
    $("select").niceSelect();
  }
  if (document.getElementById("default-select2")) {
    $("select").niceSelect();
  }

  // Lightbox js
  $(".img-gal").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  $(".play-btn").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  // Datepicker js
  $(function () {
    $("#datepicker").datepicker();
    $("#datepicker2").datepicker();
    $("#datepicker3").datepicker();
  });

  // Superfish nav menu js
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Radio Button Functionality for Trip Type
  const tripTypeRadios = $('input[name="tripType"]');
  const pickupLocationInput = $("#pickupLocation");
  const dropoffLocationInput = $("#dropoffLocation");

  function updateLocations() {
    const selectedTripType = $('input[name="tripType"]:checked').val();

    if (selectedTripType === "fromAirport") {
      // From Airport: Pickup is Barcelona Airport, Dropoff can be anywhere
      pickupLocationInput.val("Barcelona Airport").prop("readonly", true);
      dropoffLocationInput
        .val("")
        .prop("readonly", false)
        .attr("placeholder", "Drop-off Location (anywhere in Spain)");
    } else if (selectedTripType === "toAirport") {
      // To Airport: Pickup can be anywhere, Dropoff is Barcelona Airport
      pickupLocationInput
        .val("")
        .prop("readonly", false)
        .attr("placeholder", "Pickup Location (anywhere in Spain)");
      dropoffLocationInput.val("Barcelona Airport").prop("readonly", true);
    } else if (selectedTripType === "pointToPoint") {
      // Point to Point: Both can be anywhere
      pickupLocationInput
        .val("")
        .prop("readonly", false)
        .attr("placeholder", "Pickup Location (anywhere in Barcelona)");
      dropoffLocationInput
        .val("")
        .prop("readonly", false)
        .attr("placeholder", "Drop-off Location (anywhere in Spain)");
    }
  }

  // Set default to "From Airport"
  updateLocations();

  // Update fields based on the selected trip type
  tripTypeRadios.change(updateLocations);

  // Header Scroll Class js
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  // Mobile Nav js
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="lnr lnr-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
      $("#mobile-body-overly").toggle();
    });

    $(document).on("click", function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth Scroll js
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Scroll on page load
  if (window.location.hash) {
    setTimeout(function () {
      $("html, body").scrollTop(0).show();
      $("html, body").animate(
        {
          scrollTop: $(window.location.hash).offset().top - 108,
        },
        1000
      );
    }, 0);
  } else {
    $("html, body").show();
  }

  // Mailchimp js
  $("#mc_embed_signup").find("form").ajaxChimp();
});
