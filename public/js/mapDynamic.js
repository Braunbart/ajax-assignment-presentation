function init(){
    var zoomifyWidth = 2048;
    var zoomifyHeight = 512;
    
    /* First we initialize the zoomify pyramid (to get number of tiers) */
    var zoomifyOptions = {
        standardTileSize: 256,
        numberOfTiers: 1,
        tileCountUpToTier: [16],
        tierSizeInTiles: [new OpenLayers.Size(8, 2)],
        tierImageSize: [new OpenLayers.Size(256, 256)]
    };
    
    var zoomify = new OpenLayers.Layer.Zoomify("Zoomify", "img/", 
  		new OpenLayers.Size( zoomifyWidth, zoomifyHeight ), zoomifyOptions);


    /* Map with raster coordinates (pixels) from Zoomify image */
    var mapOptions = {
        maxExtent: new OpenLayers.Bounds(0, 0, zoomifyWidth, zoomifyHeight),
        maxResolution: Math.pow(2, zoomify.numberOfTiers-1 ),
        numZoomLevels: zoomify.numberOfTiers,
        units: 'pixels',
        theme: false,
        controls: [new OpenLayers.Control.Navigation()]
    };

    var map = new OpenLayers.Map("map", mapOptions);
    map.addLayer(zoomify);

    map.setBaseLayer(zoomify);
    map.zoomToMaxExtent();
};
init();
