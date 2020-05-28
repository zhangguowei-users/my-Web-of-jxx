function drawPolygon(Draw, map, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic) {//画面图形
    var toolbar = new Draw(map, {showTooltips: true});

    var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 3);
    var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new Color([0, 255, 0,0.3]));

    toolbar.activate(Draw.FREEHAND_POLYGON, {showTooltips:true});

    on(toolbar, "draw-complete", function (result){
        var geometry = result.geometry;
        var graphic;

        graphic = new Graphic(geometry, fill);

        map.graphics.add(graphic);
        toolbar.deactivate();

    });
}