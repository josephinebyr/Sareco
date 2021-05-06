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

var map = L.map('carte_interactive_france')//).setView([46, 5], 10);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1
}).addTo(map);
map.doubleClickZoom.disable();



map.setView([46, 5], 10);

var layerNomCommunes = L.layerGroup();
var layerUnitesGeog = L.featureGroup();

// Panneau d'affichage des informations en haut à droite de la carte
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Villes françaises</h4>' +  (props ?
      '<b>' + props.libgeo + '</b><br /> Code postal : ' + props.codgeo
      : 'Survolez une commune');
};

info.addTo(map);


// Couleur dépendant de la valeur de l'indicateur
function getColor(indicateur) {
  return indicateur > 0.9 ? '#E62138' :
          indicateur > 0.7  ? '#E94153' :
          indicateur > 0.5  ? '#ED6070' :
          indicateur > 0.3  ? '#F1808D' :
          indicateur > 0.1   ? '#FBDFE2' :
                      '#FFFFFF';
}
/*function getColor(indicateur) {
  return indicateur > 10 ? '#E62138' :
          indicateur > 5  ? '#E94153' :
          indicateur > 2  ? '#ED6070' :
          indicateur > 1  ? '#F1808D' :
          indicateur > 0.5   ? '#FBDFE2' :
                      '#FFFFFF';
}
*/
function indicateur() {
    $.ajax({
        url: 'database.php',
        type:'POST',
        data: 'requete',
        //async: false,
        success: function(data){

          tabTxMotorisationMaison = CalculTxMotorisation(data);

          /*function style(feature) {
            return {
                weight: 1,
                opacity: 1,
                color: 'grey',
                dashArray: '3',
                fillOpacity: 0.8,
                fillColor: for(i in tabTxMotorisationMaison){
                              if(tabTxMotorisationMaison[i][0]==feature.properties.codgeo){
                                getColor(tabTxMotorisationMaison[i][1]);
                              }
                }

            };
          }*/

          console.log(tabTxMotorisationMaison);

          geojson_communes = L.geoJson(COMMUNES, {
            style: style(tabTxMotorisationMaison),
            onEachFeature: onEachFeature,

            pointToLayer: function(feature,latlng){
                label = String(feature.properties.libgeo)
                return new L.CircleMarker(latlng, {
                      radius: 1,
                }).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip();
            }
          });

          geojson_iris = L.geoJson(IRIS, {
            style: style(tabTxMotorisationMaison),
            onEachFeature: onEachFeature
          });

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
          
            }

       })

};
// Function TxMotorisationMaison
// Function TxMotorisationAppartement
// Function

function CalculTxMotorisation(data){

  var tabTxMotorisationMaison = [];
  var tabTxMotorisationAppartement = [];
  var tabTxMotorisationTsLog = [];
  var tabTxMotorisationAutre = [];

  for(i=0; i<data.length; i++){
    tabTxMotorisationMaison[i]=[data[i][0],(data[i][7]+2*data[i][8]+3*data[i][9]+0.05*data[i][8])/data[i][10]];
    tabTxMotorisationAppartement[i]=(data[i][2]+2*data[i][3]+3*data[i][4]+0.05*data[i][4])/data[i][5];
    tabTxMotorisationTsLog[i]=(data[i][12]+2*data[i][13]+3*data[i][14]+0.05*data[i][14])/data[i][15];
    tabTxMotorisationAutre[i]=(data[i][17]+2*data[i][18]+3*data[i][19]+0.05*data[i][19])/data[i][20];
  }

  return(tabTxMotorisationMaison);
}

function style(feature, tabTxMotorisation) {
  console.log("Bonjour");
  return {
      weight: 1,
      opacity: 1,
      color: 'grey',
      dashArray: '3',
      fillOpacity: 0.8,
      fillColor: function () {for(i in tabTxMotorisation){
                    if(tabTxMotorisation[i][0]==Number(feature.properties.codgeo)){
                      getColor(tabTxMotorisation[i][1]);

                    }
                  //console.log(typeof(feature.properties.codgeo), typeof(tabTxMotorisation[i][0]))

                }
      }

  };
}
/*function style(feature) {
  return {
      weight: 1,
      opacity: 1,
      color: 'grey',
      dashArray: '3',
      fillOpacity: 0.8,
      fillColor: 'white'
  };
}

function indicateur() {
    $.ajax({
        url: 'database.php',
        type:'POST',
        data: 'requete',
        async: false,
        success: function(data){

          var tabTxMotorisationMaison = [];
          var tabTxMotorisationAppartement = [];
          var tabTxMotorisationTsLog = [];
          var tabTxMotorisationAutre = [];
          for(i=0; i<data.length; i++){
            tabTxMotorisationMaison[i]=[data[i][0],(data[i][7]+2*data[i][8]+3*data[i][9]+0.05*data[i][8])/data[i][10]];
            tabTxMotorisationAppartement[i]=(data[i][2]+2*data[i][3]+3*data[i][4]+0.05*data[i][4])/data[i][5];
            tabTxMotorisationTsLog[i]=(data[i][12]+2*data[i][13]+3*data[i][14]+0.05*data[i][14])/data[i][15];
            tabTxMotorisationAutre[i]=(data[i][17]+2*data[i][18]+3*data[i][19]+0.05*data[i][19])/data[i][20];
          }

          function style(feature) {
            return {
                weight: 1,
                opacity: 1,
                color: 'grey',
                dashArray: '3',
                fillOpacity: 0.8,
                fillColor: for(i in tabTxMotorisationMaison){
                              if(tabTxMotorisationMaison[i][0]==feature.properties.codgeo){
                                getColor(tabTxMotorisationMaison[i][1]);
                              }
                }

            };
          }

            }

       })

};*/



// Stylisation des géométries
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

//Sélection d'une commune
function select(e) {
  highlightFeature(e);
}

// Actions sur les géométries
function onEachFeature(feature, layer) {
  var label = L.marker(layer.getBounds().getCenter(), {
        icon: L.divIcon({
          className: 'label',
          html: (this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM,
        })
  });
  if (map.getBounds().overlaps(layer.getBounds())) {label.addTo(layerNomCommunes)};
  layer.on({
      //mouseover: highlightFeature,
      //mouseout: resetHighlight,
      click: select,
      dblclick: resetHighlight

  });
  nomsCommunesIris.push((this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM)
}

// Affichage des noms de villes qu'à partir d'un certain zoom
map.on("zoomend", function(e){
  if(map.getZoom() < 11) {
      map.removeLayer(layerNomCommunes);
  }else  {
    layerNomCommunes.addTo(map);
  }
});

// Importation des fichiers geojson pour afficher les limites de communes et IRIS
var geojson_communes;
var geojson_iris;
var nomsCommunesIris = [];

/*geojson_communes = L.geoJson(COMMUNES, {
  style: style,
  onEachFeature: onEachFeature,

  pointToLayer: function(feature,latlng){
      label = String(feature.properties.libgeo)
      return new L.CircleMarker(latlng, {
            radius: 1,
      }).bindTooltip(label, {permanent: true, opacity: 0.7}).openTooltip();
  }
});
geojson_iris = L.geoJson(IRIS, {
  style: style,
  onEachFeature: onEachFeature
});

 // Gestion de l'échelle affichée : IRIS ou communes
var unite_geographique = geojson_communes;

function changeGeometries(element) {
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
<<<<<<< HEAD
unite_geographique.addTo(layerUnitesGeog);
layerUnitesGeog.addTo(map);*/
=======

function displayGeometries() {
  layerUnitesGeog.clearLayers();
  unite_geographique.eachLayer(function(layer) {
      if (map.getBounds().overlaps(layer.getBounds())) {
        layer.addTo(layerUnitesGeog);
        layerUnitesGeog.addTo(map);
      };
    });
}
map.on('zoomend', () => {displayGeometries()});
map.on('moveend', () => {displayGeometries()});

>>>>>>> df2c65b3c5d326c217df20a69677d13dec9d406c

// Sélection de l'année
var Liste_Annee = document.getElementById("Liste_Annee");
var annee = Liste_Annee.options[Liste_Annee.selectedIndex];

function ValidationForm() {
  var annees = []
  annee = document.forms.form.Liste_Annee.options;
  for (i=0; i<document.forms.form.Liste_Annee.options.length; i++) {
    if (document.forms.form.Liste_Annee.options[i].selected ) {
      annees.push(document.forms.form.Liste_Annee.options[i].text);
      console.log(annees);
    }
  }
  return annees
}

//Barre de recherche
function formRecherche(){

	var form = document.getElementById("form_recherche");
	var input = form.search;

	var list = document.createElement("ul");
	list.className = "suggestions";
	list.style.display = "none";

	form.appendChild(list);

	input.onkeyup = function(){
		var txt = this.value;
		if(!txt){
			list.style.display = "none";
		    return;
		}

		var suggestions = 0;
		var frag = document.createDocumentFragment();

		for(var i = 0, c = nomsCommunesIris.length; i < c; i++){
			if(new RegExp("^"+txt,"i").test(nomsCommunesIris[i])){
				var word = document.createElement("li");
				frag.appendChild(word);
				word.innerHTML = nomsCommunesIris[i].replace(new RegExp("^("+txt+")","i"),"<strong>$1</strong>");
				word.mot = nomsCommunesIris[i];
				word.onmousedown = function(){
					input.focus();
					input.value = this.mot;
					list.style.display = "none";
					return false;
				};
				suggestions++;
			}
		}

		if(suggestions){
			list.innerHTML = "";
			list.appendChild(frag);
			list.style.display = "block";
		}
		else {
			list.style.display = "none";
		}
	};

	input.onblur = function(){
		list.style.display = "none";
	};
};

function rechercher() {
<<<<<<< HEAD
  var nomGeom = document.getElementById("form_recherche").search.value;
  unite_geographique.eachLayer(function (layer) {
    if (layer.feature.properties.libgeo == nomGeom) {
=======
  var nomRecherche = document.getElementById("form_recherche").search.value;
  unite_geographique.eachLayer(function (layer) { 
    nomGeom = (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo : layer.feature.properties.NOM_COM;
    if (nomGeom==nomRecherche) {
>>>>>>> df2c65b3c5d326c217df20a69677d13dec9d406c
      map.fitBounds(layer.getBounds());
    }
  });
}


// Affichage de la source des données (INSEE)
map.attributionControl.addAttribution('Données <a href="http://INSEE.fr/">INSEE</a>');

//Légende en bas à droite
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

// Panneau d'exportation au format .png
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
