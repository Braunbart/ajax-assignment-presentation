var currentSearch = '';
var activeSound;

function initialize() {
    SC.initialize({
        client_id: 'eb4ea2877dba81fbc5f5a44dc591f728'
    });
    
    $(".container").load("/templates/single-page-application/home");
    $.get('/templates/navigation', function(data){ 
        $(data).prependTo('body');
        markHeaderActive();
    });
}

function getTracks(query, page) {
    var tracksPerPage = 10;
    var offset = tracksPerPage * (page-1);
    
    SC.get('/tracks', {limit: tracksPerPage, q: query, offset: offset}, function(tracks) {
        $('.tracks').html('');
        if(tracks.length > 0) {
            tracks.forEach(appendTrack);
            $('.pager').html('');
            if(page > 1) appendPagerButton(page-1);
            if(tracks.length == 10) appendPagerButton(page+1);
        }
    });
}

function appendPagerButton(page) {
    $('.pager').append('<button class="btn btn-default" data-page="' + page + '">Page ' + page + '</button>');
}

function appendTrack(track, index, array) {
    var trackDate = new Date(track.created_at);
    
    $('.tracks').append(
        '<div class="panel panel-default row">' +
            '<div class="col-xs-1">' +
                '<button class="btn btn-default glyphicon glyphicon-play" data-trackid="' + track.id + '"></button>' +
            '</div>' +
            '<div class="col-xs-11 panel-body">' +
                '<div class="text-muted">' +
                    track.user.username +
                    ' <span class="pull-right">' + trackDate.toLocaleDateString() + '</span>' + 
                '</div>' +
                '<h3>' + track.title + '</h3>' +
            '</div>' +
        '</div>'
    );
}

function addPlayer(trackId, trackTitle) {
    $('body').append(
        '<div class="player panel panel-default">' +
            '<button class="btn btn-default glyphicon glyphicon-stop" data-trackid="' + trackId + '"></button> ' +
            trackTitle +
        '</div>'
    );
}

function stopSoundPlaying() {
    if(activeSound !== undefined) activeSound.stop();
    $('.glyphicon-stop').removeClass('glyphicon-stop').addClass('glyphicon-play');
    $('.player').remove();
}


$('body').on('submit', '.search-form', function(e) {
    e.preventDefault();
    currentSearch = $('.search-input').val();
    getTracks(currentSearch, 1);
});

$('body').on('click', '.pager .btn', function() {
    getTracks(currentSearch, parseInt($(this).attr('data-page'), 10));
    
	//$('body,html').animate({scrollTop: 0}, 200);
});

$('body').on('click', '.glyphicon-play', function() {
    stopSoundPlaying();
    SC.stream($(this).attr('data-trackid'), function(sound){
        activeSound = sound;
        activeSound.play();
    });
    $(this).removeClass('glyphicon-play').addClass('glyphicon-stop');
    addPlayer($(this).attr('data-trackid'), $(this).parent().parent().find('h3').text());
});

$('body').on('click', '.glyphicon-stop', function() {
    stopSoundPlaying();
});

$(document).ready(function() {
    initialize();
});
