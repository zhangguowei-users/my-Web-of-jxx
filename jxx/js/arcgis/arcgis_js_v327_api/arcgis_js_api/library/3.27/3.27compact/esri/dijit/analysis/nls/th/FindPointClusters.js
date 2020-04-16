// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.27/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/nls/th/FindPointClusters",{clustersLabel:"\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e0a\u0e31\u0e49\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25 ${inputLayerName} \u0e43\u0e2b\u0e49\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e01\u0e25\u0e38\u0e48\u0e21",chooseLayerLabel:"\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e0a\u0e31\u0e49\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e17\u0e35\u0e48\u0e08\u0e30\u0e1e\u0e1a\u0e01\u0e25\u0e38\u0e48\u0e21",minClusterPtsLabel:"\u0e08\u0e33\u0e19\u0e27\u0e19\u0e08\u0e38\u0e14\u0e15\u0e48\u0e33\u0e2a\u0e38\u0e14\u0e17\u0e35\u0e48\u0e08\u0e30\u0e16\u0e37\u0e2d\u0e27\u0e48\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e01\u0e25\u0e38\u0e48\u0e21",
limitSearchLabel:"\u0e08\u0e33\u0e01\u0e31\u0e14\u0e0a\u0e48\u0e27\u0e07\u0e01\u0e32\u0e23\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e40\u0e1b\u0e47\u0e19 (\u0e44\u0e21\u0e48\u0e1a\u0e31\u0e07\u0e04\u0e31\u0e1a)",limitSearchReqLabel:"\u0e08\u0e33\u0e01\u0e31\u0e14\u0e0a\u0e48\u0e27\u0e07\u0e43\u0e19\u0e01\u0e32\u0e23\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e17\u0e35\u0e48",outputLayerName:"\u0e04\u0e49\u0e19\u0e2b\u0e32\u0e01\u0e25\u0e38\u0e48\u0e21\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a ${inputLayerName}",itemDescription:"\u0e0a\u0e31\u0e49\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e1f\u0e35\u0e40\u0e08\u0e2d\u0e23\u0e4c\u0e17\u0e35\u0e48\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e02\u0e36\u0e49\u0e19\u0e08\u0e32\u0e01\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49\u0e42\u0e0b\u0e25\u0e39\u0e0a\u0e31\u0e19 Find Point Clusters \u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a ${inputLayerName}",
itemTags:"\u0e1c\u0e25\u0e01\u0e32\u0e23\u0e27\u0e34\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c, Find Point Clusters, ${inputLayerName}",itemSnippet:"\u0e0a\u0e31\u0e49\u0e19\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e1f\u0e35\u0e40\u0e08\u0e2d\u0e23\u0e4c\u0e17\u0e35\u0e48\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e02\u0e36\u0e49\u0e19\u0e08\u0e32\u0e01 Find Point Clusters",chooseClusteringMethod:"\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e27\u0e34\u0e18\u0e35\u0e01\u0e32\u0e23\u0e23\u0e27\u0e21\u0e01\u0e25\u0e38\u0e48\u0e21\u0e17\u0e35\u0e48\u0e08\u0e30\u0e43\u0e0a\u0e49",
dbscanLabel:"\u0e23\u0e30\u0e22\u0e30\u0e2b\u0e48\u0e32\u0e07\u0e17\u0e35\u0e48\u0e01\u0e33\u0e2b\u0e19\u0e14 (DBSCAN)",hdbscanLabel:"\u0e1b\u0e23\u0e31\u0e1a\u0e41\u0e15\u0e48\u0e07\u0e40\u0e2d\u0e07 (HDBSCAN)"});