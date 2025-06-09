(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    // Agrega esto al final del archivo JavaScript (dentro de la función jQuery)
    $(document).ready(function () {
        // Función para mostrar mensaje de "Añadido al carrito"
        $('.btn-primary').on('click', function (e) {
            if ($(this).find('.fa-shopping-cart').length) {
                e.preventDefault();

                // Crear elemento de notificación
                var notification = $('<div class="cart-notification">Producto añadido al carrito!</div>');

                // Estilos para la notificación
                notification.css({
                    'position': 'fixed',
                    'top': '20px',
                    'right': '20px',
                    'background': '#28a745',
                    'color': 'white',
                    'padding': '15px 25px',
                    'border-radius': '5px',
                    'z-index': '9999',
                    'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
                    'animation': 'fadeIn 0.5s, fadeOut 0.5s 2.5s forwards'
                });

                // Agregar al cuerpo del documento
                $('body').append(notification);

                // Eliminar después de 3 segundos
                setTimeout(function () {
                    notification.remove();
                }, 3000);

                // También puedes incrementar el contador del carrito
                var cartCount = parseInt($('.badge').last().text());
                $('.badge').last().text(cartCount + 1);
            }
        });

        // Agregar animaciones CSS para la notificación
        $('head').append('<style>@keyframes fadeIn {from {opacity: 0; transform: translateY(20px);} to {opacity: 1; transform: translateY(0);}} @keyframes fadeOut {from {opacity: 1;} to {opacity: 0;}}</style>');
    });

    // Eliminar producto del carrito
    $(document).on('click', '.btn-danger', function (e) {
        e.preventDefault();
        $(this).closest('tr').fadeOut(300, function () {
            $(this).remove();
            actualizarTotal();
            mostrarNotificacion('Producto eliminado del carrito', '#dc3545');
        });
    });

    // Finalizar compra
    $(document).on('click', '.btn-block.btn-primary', function (e) {
        e.preventDefault();
        mostrarNotificacion('¡Compra realizada con éxito! Gracias por tu pedido.', '#28a745');

        // Opcional: Vaciar el carrito después de comprar
        setTimeout(function () {
            $('tbody tr').fadeOut(300, function () {
                $(this).remove();
                actualizarTotal();
            });
            $('.badge').last().text('0');
        }, 2000);
    });

    // Función para actualizar el total (ejemplo básico)
    function actualizarTotal() {
        // Aquí puedes agregar lógica para recalcular el total
        // Por ahora solo mostramos un ejemplo básico
        var subtotal = 0;
        $('tbody tr').each(function () {
            var precio = parseFloat($(this).find('td:nth-child(2)').text().replace('$', ''));
            var cantidad = parseInt($(this).find('input').val());
            subtotal += precio * cantidad;
        });

        var envio = 10; // Costo fijo de envío
        var total = subtotal + envio;

        $('.border-bottom h6').eq(0).text('$' + subtotal.toFixed(2));
        $('.pt-2 h5').eq(1).text('$' + total.toFixed(2));
    }

    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje, color) {
        var notification = $('<div class="cart-notification">' + mensaje + '</div>');

        notification.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'background': color,
            'color': 'white',
            'padding': '15px 25px',
            'border-radius': '5px',
            'z-index': '9999',
            'box-shadow': '0 4px 8px rgba(0,0,0,0.1)',
            'animation': 'fadeIn 0.5s, fadeOut 0.5s 2.5s forwards'
        });

        $('body').append(notification);

        setTimeout(function () {
            notification.remove();
        }, 3000);
    }

    // Actualizar total cuando cambia la cantidad
    $(document).on('click', '.btn-plus, .btn-minus', function () {
        setTimeout(actualizarTotal, 100);
    });

})(jQuery);

