/*anychart.onDocumentReady(function (data) {
    anychart.data.loadJsonFile("connect.php", function () {
      //var chart = anychart.fromJson(data)
        // create a data set
      var dataSet = anychart.data.set(data);
      // map the data
      var mapping = dataSet.mapAs({x: "insee_com", value: "taux_motorisation"});
      // create a chart
      var chart = anychart.column();
      // create a series and set the data
      var series = chart.column(mapping);

      // create a chart and set loaded data
      chart = anychart.bar(data);
      chart.container("legend");
      chart.draw();
});
});

fetch('connect.php')
.then(result => result.json())
.then(result => console.log(result));*/



//Connection to postgres
/*const pg = require(‘pg’);
var connectionString = "postgres://userName:password@serverName/ip:port/nameOfDatabase";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
var query = pgClient.query("SELECT id from Customer where name = 'customername'");
query.on("row", function(row,result){
  result.addRow(row);
});
pgClient.end();*/

var map = L.map('carte_interactive_france').setView([46, 2], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);

var layerNomCommunes = L.layerGroup();
var layerUnitesGeog = L.layerGroup();

// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Villes françaises</h4>' +  (props ?
      '<b>' + props.libgeo + '</b><br /> Code postal : ' + props.codgeo + '<br /> Indicateur : ' + props.indicateur
      : 'Survolez une commune');
};

info.addTo(map);


// get color depending on value of indicator
function getColor(indicateur) {
  return indicateur > 10 ? '#E62138' :
          indicateur > 5  ? '#E94153' :
          indicateur > 2  ? '#ED6070' :
          indicateur > 1  ? '#F1808D' :
          indicateur > 0.5   ? '#FBDFE2' :
                      '#FFFFFF';
}

function style(feature) {
  return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8,
      fillColor: (this.feature==geojson_iris) ? getColor(feature.properties.INSEE_COM) : getColor(feature.properties.indicateur)
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 2,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.3
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  unite_geographique.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: 'label',
          html: (this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM,
        })
}).addTo(layerNomCommunes);
  layer.on({
      //mouseover: highlightFeature,
      //mouseout: resetHighlight,
      click: highlightFeature
  });
}

// Affichage des noms de villes qu'à partir d'un certain zoom
map.on("zoomend", function(e){
  console.log(map.getZoom());
  if(map.getZoom() < 11) {
      map.removeLayer(layerNomCommunes);
  }else  {
    layerNomCommunes.addTo(map);
  }
});

// Importation des fichiers geojson pour afficher les limites de communes et IRIS
var geojson_communes;
var geojson_iris;

geojson_communes = L.geoJson(COMMUNES, {
  style: style,
  onEachFeature: onEachFeature,

  pointToLayer: function(feature,latlng){
      label = String(feature.properties.libgeo) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
      return new L.CircleMarker(latlng, {
            radius: 1,
      }).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip();
  }
});
geojson_iris = L.geoJson(IRIS, {
  style: style,
  onEachFeature: onEachFeature
});

 // Gestion de l'échelle affichée : IRIS ou sommunes
var unite_geographique = geojson_communes;

function onoff(element) {
  if (unite_geographique == geojson_communes) {
      unite_geographique = geojson_iris;
      blabel = "Iris";
  } else {
      unite_geographique = geojson_communes;
      blabel = "Communes";
  }
  var child=element.firstChild;
  child.innerHTML=blabel;
  map.removeLayer(layerUnitesGeog);
  layerUnitesGeog.clearLayers();
  unite_geographique.addTo(layerUnitesGeog);
  layerUnitesGeog.addTo(map);
}
unite_geographique.addTo(layerUnitesGeog);
layerUnitesGeog.addTo(map);


map.attributionControl.addAttribution('Données &copy; <a href="http://INSEE.fr/">INSEE</a>');

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 0.5, 1, 2, 5, 10],
      labels = [],
      from, to;

  for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
          '<i style="background:' + getColor(from + 1) + '"></i> ' +
          from + (to ? '&ndash;' + to : '+'));
  }

  div.innerHTML = 'Indicateur<br>' + labels.join('<br>');
  return div;
};

legend.addTo(map);

L.control.bigImage().addTo(map);





/*var couleurex = "";
var shp_test = [];
shapefile.open("COMMUNE/COMMUNE.shp")
  .then(source => source.read()
      .then(function log(result) {
      if (result.done) return;
      shp_test.push(result)
      //result.value.addTo(map)
      return source.read().then(log);
      }))
  
  .catch(error => console.error(error.stack));
console.log('test SHP:',shp_test)*/
//console.log(table)