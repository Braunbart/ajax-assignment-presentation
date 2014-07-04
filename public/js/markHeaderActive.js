function markHeaderActive() {
    if(document.location.pathname !== '/') {
        $('.navbar-nav a').each(function() {
            if ($(this).attr('href').match(document.location.pathname)) {
                $(this).parent().addClass('active');
            }
        });
    }
}
markHeaderActive();
