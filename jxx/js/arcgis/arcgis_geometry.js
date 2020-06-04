var TOOLBAR;
var DRAWGRAPHICS;
var EDIT;
var LABELPOINTGRAPHIC;

function drawPolygon(Draw, map, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic,on,Point, TextSymbol,Font,graphicsLayer) {//画面图形
    var toolbar = new Draw(map, {showTooltips: true});
    TOOLBAR = toolbar;

    var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 3);
    var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new Color([0, 255, 0,0.3]));

    toolbar.activate(Draw.FREEHAND_POLYGON, {showTooltips:true});

    on(toolbar, "draw-complete", function (result){
        var geometry = result.geometry;

        var graphic = new Graphic(geometry, fill);
        DRAWGRAPHICS = graphic;

        map.graphics.add(graphic);
        toolbar.deactivate();

        calculatePolygonArea(geometry, Point, Font, Graphic,graphicsLayer,TextSymbol,Color);//计算面积

    });
}

function drawPolyline(Draw, map, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic,on,Point, TextSymbol,Font,graphicsLayer) {//画线图形
    TOOLBAR.deactivate();

    var toolbar = new Draw(map, {showTooltips: true});
    TOOLBAR = toolbar;

    var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 3);
    var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol,  new Color([0, 255, 0,0.3]));

    //toolbar.activate(Draw.FREEHAND_POLYLINE, {showTooltips:true});
    toolbar.activate(Draw.POLYLINE, {showTooltips:true});

    on(toolbar, "draw-complete", function (result){
        var geometry = result.geometry;

        var graphic = new Graphic(geometry, lineSymbol);
        DRAWGRAPHICS = graphic;

        map.graphics.add(graphic);
        toolbar.deactivate();

        calculateLength(geometry, Point, Font, Graphic,graphicsLayer,TextSymbol,Color);//计算长度

    });
}

function editPolygon(graphic, map, Edit, Point, TextSymbol, Font, Color,Graphic,graphicsLayer){//编辑面图形
    if(graphic == null){return;}
    if(EDIT != null) {removeEditToolbar();}//取消编辑状态

    var edit = new Edit(map);
    EDIT = edit;

    var options ={
        allowAddVertices:true,//能添加结点
        allowDeleteVertices: true,//能删除结点
    };

    edit.activate(Edit.EDIT_VERTICES, graphic, options);
    
    edit.on("vertex-move",function(e){//拖动图形边缘小圆点
		var geometry = e.graphic.geometry;

		if(geometry.type == "polygon") {
            calculatePolygonArea(geometry, Point, Font, Graphic, graphicsLayer, TextSymbol, Color);//计算面积
        }else {
            calculateLength(geometry, Point, Font, Graphic,graphicsLayer,TextSymbol,Color);//计算长度
        }
        
    });
    
}

function removeEditToolbar(){//取消编辑状态
    if(EDIT == null) return;

    EDIT.deactivate();
}

function removeToolbarDrao(){//取消画图工具
    if(TOOLBAR == null) return;
    TOOLBAR.deactivate();

}

function calculatePolygonArea(geometry, Point, Font, Graphic,graphicsLayer,TextSymbol,Color){//计算面积
    var location = geometry.rings[0][0]//geometry的坐标

    var geo = esri.geometry.webMercatorToGeographic(geometry);
    var Area = esri.geometry.geodesicAreas([geo], esri.Units.HECTARES);

    var point = new Point([location[0],location[1]]);
    var textSym = new TextSymbol("面积:" + Area+ "公顷");
    var font = new Font();
    font.setSize("18pt");
    font.setWeight(Font.WEIGHT_BOLD);
    textSym.setFont(font);
    textSym.setColor(new Color([255, 0, 0, 0.8]));

    globalQueryClass.map.graphics.remove(LABELPOINTGRAPHIC);

    var labelPointGraphic = new Graphic(point, textSym);
    LABELPOINTGRAPHIC = labelPointGraphic;

    //graphicsLayer.clear();
    //graphicsLayer.add(labelPointGraphic);
    globalQueryClass.map.graphics.add(labelPointGraphic);


}

function calculateLength(geometry, Point, Font, Graphic,graphicsLayer,TextSymbol,Color){//计算长度
    var location = geometry.paths[0][0]//geometry的坐标

    var geo = esri.geometry.webMercatorToGeographic(geometry);
    var Length = esri.geometry.geodesicLengths([geo], esri.Units.METERS);


    var point = new Point([location[0],location[1]]);
    var textSym = new TextSymbol("长度:" + Length+ "米");
    var font = new Font();
    font.setSize("18pt");
    font.setWeight(Font.WEIGHT_BOLD);
    textSym.setFont(font);
    textSym.setColor(new Color([255, 0, 0, 0.8]));

    globalQueryClass.map.graphics.remove(LABELPOINTGRAPHIC);

    var labelPointGraphic = new Graphic(point, textSym);
    LABELPOINTGRAPHIC = labelPointGraphic;

    globalQueryClass.map.graphics.add(labelPointGraphic);


}

function removeGraphics(map, removeGraphics){//移除画好的几何图形
    DRAWGRAPHICS = null;
    globalQueryClass.graphicsLayer.clear();
    //map.graphics.remove(DRAWGRAPHICS);
    map.graphics.clear();
}

function changeSizeGraphics(graphic, Edit){//缩放图形
    if(graphic == null){return;}

    if(EDIT != null) {removeEditToolbar();}//取消编辑状态

    var edit = new Edit(globalQueryClass.map);
    EDIT = edit;

    var options = {
        uniformScaling:true
    };

    edit.activate(Edit.SCALE, graphic, options)

}

function rotateGraphic(graphic, Edit){//旋转图形
    if(graphic == null){return;}
    if(EDIT != null) {removeEditToolbar();}//取消编辑状态

    var edit = new Edit(globalQueryClass.map);
    EDIT = edit;

    edit.activate(Edit.ROTATE, graphic)
}

