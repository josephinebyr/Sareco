var map = L.map('carte_interactive_france');

//Panneau de sélection du fond de carte
var fondOrtho = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var fondDetaille = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var fondSimple = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

var baseMaps = {
  "Fond de carte détaillé": fondDetaille,
  "Fond de carte simple": fondSimple,
  "Orthophotographies": fondOrtho
};
L.control.layers(baseMaps).addTo(map);

map.doubleClickZoom.disable();

// Affichage de la source des données (INSEE)
map.attributionControl.addAttribution('Données <a href="http://INSEE.fr/">INSEE</a>');

//Sauvegarde de la carte en PNG
var printer = L.easyPrint({
  tileLayer: fondSimple,
  sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
  filename: 'carte_sarecoscope',
  exportOnly: true,
  hideControlContainer: true
}).addTo(map);

function manualPrint () {
  printer.printMap('CurrentSize', 'MyManualPrint')
}

//Couches d'objets
var layerNomCommunes = L.layerGroup();
var layerUnitesGeog = L.featureGroup();
var info = L.control();
var legend = L.control({position: 'bottomright'});

var tab = [];


map.setView([48.856614, 2.3522219], 10);  // Zoom sur Paris


// Couleur dépendant de la valeur de l'indicateur
function getColor(indicateur) {
  return indicateur > 3.05 ? '#E62138' :
          indicateur > 2  ? '#FF9900' :
          indicateur > 1.5  ? '#FFCC33' :
          indicateur > 1  ? '#FFFF66' :
          indicateur > 0.5   ? '#33FF66' :
                      '#009933';
}

var buttonstate_m=0;
var buttonstate_e=0;

//var ann = document.getElementById("Liste_Annee").options[listAnnees.selectedIndex].text;
//var annee = "2006";

function indicateur_1(logement) {

  if(buttonstate_m==0){
    $.ajax({
      url: 'database.php',
      type:'POST',
      data: 'requete=requete'+'&annee='+document.getElementById("Liste_Annee").options[document.getElementById("Liste_Annee").selectedIndex].text+'&echelle='+document.getElementById("echelle").options[document.getElementById("echelle").selectedIndex].text,
      //async: false,
      success: function(data){

				console.log(data);

        buttonstate_m=1;

        // Panneau d'affichage des informations en haut à droite de la carte
        info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };

        info.update = function (props) {
          this._div.innerHTML = (props ? '<b>' + props.libgeo + '</b>' : 'Survolez une commune');
          this._div.style.color = "white";
        };

        info.addTo(map);

        tabTxMotorisation = CalculTxMotorisation(data, logement);
        tabTxEquipement  = CalculTxEquipement(data, logement);

        var nomsCommunesIris = [];
        var geojson_communes;
        var geojson_iris;

        geojson_communes = L.geoJson(COMMUNES,{
          onEachFeature: onEachFeature,
        }).addTo(map);

        geojson_iris = L.geoJson(IRIS, {
          onEachFeature: onEachFeature
        });

        // Affichage des noms de villes qu'à partir d'un certain zoom
        /*map.on("zoomend", function(e){
          if(map.getZoom() < 11) {
              map.removeLayer(layerNomCommunes);
          }else  {
            layerNomCommunes.addTo(map);
          }
        });*/

				// Affichage de la source des données (INSEE)
        map.attributionControl.addAttribution('Données <a href="http://INSEE.fr/">INSEE</a>');
        //Légende en bas à droite

        legend.onAdd = function (map) {

          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0.5, 1, 1.5, 2, 2.5, 3.05],
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

        // Stylisation des géométries
        function highlightFeature(e) {
          var layer = e.target;

          layer.setStyle({
              weight: 2,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.6
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
          }

          info.update(layer.feature.properties);
        }

        function resetHighlight(e) {
          unite_geographique.resetStyle(e.target);
          info.update();
          e.target.setStyle(style(e.target.feature));
          e.target.addTo(layerUnitesGeog);
          layerUnitesGeog.addTo(map);
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

          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: graphique,
              dblclick: resetHighlight

          });
          nomsCommunesIris.push((this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM);

        }

        function graphique(e) {
          anychart.onDocumentReady(function () {

        // create line chart
        var chart = anychart.column();

        // set chart padding
        // chart.padding([10, 20, 5, 20]);

        // turn on chart animation
        chart.animation(true);

        // turn on the crosshair
        chart.crosshair(true);

        var nomcom;

        // set chart title text settings


        // set y axis title


        // create linear scale
        var linScale = anychart.scales.linear();
        linScale.minimum(0).maximum(3.2);

        // set scale for the chart, this scale will be used in all scale dependent entries such axes, grids, etc
        chart.yScale(linScale);

        for(i in tabTxMotorisation){
          if(tabTxMotorisation[i][0]==e.target.feature.properties.libgeo){
                      tab.push(['Motorisation',tabTxMotorisation[i][1]]);
                      tab.push(['Equipement',tabTxEquipement[i][1]]);
                      nomcom = tabTxMotorisation[i][0];
                      chart.title('Indicateurs pour la commune '+nomcom);
                    }

                }



        console.log(tab);
        var  dataSet =anychart.data.set();
        for (i in tab){
            tab1= tab[i][0];
            tab2= tab[i][1];
            dataSet.append( [tab1,tab2] );

    }


        // map data for the first series,take value from first column of data set
        var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

        // temp variable to store series instance
        var series;

        // setup first series
        series = chart.column(firstSeriesData);
        series.name('Indicateur A1');
        // enable series data labels
        series.labels().enabled(true).anchor('left-bottom').padding(5);
        // enable series markers
       // series.markers(true);

        // turn the legend on
        chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);

        // set container for the chart and define padding
        chart.container('container');
        // initiate chart drawing
        chart.draw();

        //Sauvegarde en png
        anychart.exports.server("http://localhost:2000");
        document.getElementById('btnSavePNG').addEventListener('click', () => {
          chart.saveAsPng({
            "quality": 0.5,
            "filename": "TxMotorisation_" + e.target.feature.properties.libgeo});
          });

        //Sauvegarde en xlsx

        document.getElementById('btnSaveXlsx').addEventListener('click', () => {
          //chart.saveAsXlsx();
          var csvData = chart.toCsv('default', {
            'rowsSeparator': '\n',
            'columnsSeparator': ',',
            'ignoreFirstRow': false
          });
          console.log(csvData);

        });
      });


  }

        var unite_geographique = geojson_communes;

        var btnChangeGeom = document.getElementById('btnChangeGeom')
        btnChangeGeom.addEventListener('click', function changeGeometries(btnChangeGeom) {
          if (unite_geographique == geojson_communes) {
              unite_geographique = geojson_iris;
              blabel = "Iris";
          } else {
              unite_geographique = geojson_communes;
              blabel = "Communes";
          }

          /*var child=element.firstChild;
          child.innerHTML=blabel;*/
          document.getElementById('blabel').innerHTML = blabel;
          map.removeLayer(layerUnitesGeog);
          layerUnitesGeog.clearLayers();
          unite_geographique.addTo(layerUnitesGeog);
          layerUnitesGeog.addTo(map);
        });

        function displayGeometries() {
          layerUnitesGeog.clearLayers();
          unite_geographique.eachLayer(function(layer) {

              if (map.getBounds().overlaps(layer.getBounds())) {
                var label = L.marker(layer.getBounds().getCenter(), {
                  icon: L.divIcon({
                    className: 'label',
                    html: (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo +'<br>' + getIndicateur(layer.feature) + '</br>' : layer.feature.properties.NOM_COM,
                  })
                });
                //onEachFeature(layer.feature, layer);
                layer.setStyle(style(layer.feature));
                layer.addTo(layerUnitesGeog);
                layerUnitesGeog.addTo(map);
                label.addTo(layerNomCommunes);
                map.on("zoomend", function(e){
                if(map.getZoom() > 10){
                  layerNomCommunes.addTo(map);}
                else {
                  map.removeLayer(layerNomCommunes);}})
              };
            });
        }

        displayGeometries();
        map.on('zoomend', () => {displayGeometries()});
        map.on('moveend', () => {displayGeometries()});

        function style(feature) {
          return {
              weight: 1,
              opacity: 1,
              color: 'grey',
              dashArray: '3',
              fillOpacity: 0.8,
              fillColor: getColor(getIndicateur(feature))

          };
        }

        function getIndicateur(feature) {

          for(i in tabTxMotorisation){
            if(tabTxMotorisation[i][0]==feature.properties.libgeo){
                        return((tabTxMotorisation[i][1]).toFixed(2));

                      }

                  }
        }

        //Barre de recherche
        document.getElementById('champ_recherche').addEventListener('click', function formRecherche(){
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
        });
        document.getElementById('barre_recherche_B').addEventListener('click', function rechercher() {
          var nomRecherche = document.getElementById("form_recherche").search.value;
          unite_geographique.eachLayer(function (layer) {
            nomGeom = (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo : layer.feature.properties.NOM_COM;
            if (nomGeom==nomRecherche) {
              map.fitBounds(layer.getBounds());
            }
          });
        });

        /*var annees = []
        document.getElementById('Liste_Annee').addEventListener('click', function ValidationForm() {
          annee = document.forms.form.Liste_Annee.options;
          for (i=0; i<document.forms.form.Liste_Annee.options.length; i++) {
            if (document.forms.form.Liste_Annee.options[i].selected ) {
              annees.push(document.forms.form.Liste_Annee.options[i].text);
              console.log(annees);
            }
          }
          return annees
          return annees
        });*/

        var listAnnees = document.getElementById("Liste_Annee");
        var annee = listAnnees.options[listAnnees.selectedIndex].text;


          }

     })} else {
      layerUnitesGeog.clearLayers();
      buttonstate_m=0;
      info.remove();
    }


};

function indicateur_2(nbvoiture, logement) {

  if(buttonstate_e==0){
    $.ajax({
      url: 'database.php',
      type:'POST',
      data: 'requete=requete'+'&annee='+document.getElementById("Liste_Annee").options[document.getElementById("Liste_Annee").selectedIndex].text+'&echelle='+document.getElementById("echelle").options[document.getElementById("echelle").selectedIndex].text,
      //async: false,
      success: function(data){

				console.log(data);

        buttonstate_e=1;

        // Panneau d'affichage des informations en haut à droite de la carte
        info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
        };

        info.update = function (props) {
          this._div.innerHTML = (props ? '<b>' + props.libgeo + '</b>' : 'Survolez une commune');
          this._div.style.color = "white";
        };

        info.addTo(map);

        tabTxMotorisation = CalculTxMotorisation(data, logement);
				if(nbvoiture=="4"){
					tabTxEquipement  = CalculTxEquipement(data, logement);
				} else {
					tabTxEquipement  = CalculTxEquipement_nbvoiture(data, logement, nbvoiture);
				};

        var nomsCommunesIris = [];
        var geojson_communes;
        var geojson_iris;

        geojson_communes = L.geoJson(COMMUNES,{
          onEachFeature: onEachFeature,
        }).addTo(map);

        geojson_iris = L.geoJson(IRIS, {
          onEachFeature: onEachFeature
        });

        // Affichage des noms de villes qu'à partir d'un certain zoom
        /*map.on("zoomend", function(e){
          if(map.getZoom() < 11) {
              map.removeLayer(layerNomCommunes);
          }else  {
            layerNomCommunes.addTo(map);
          }
        });*/

				// Affichage de la source des données (INSEE)
        map.attributionControl.addAttribution('Données <a href="http://INSEE.fr/">INSEE</a>');
        //Légende en bas à droite

        legend.onAdd = function (map) {

          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0.5, 1, 1.5, 2, 2.5, 3.05],
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

        // Stylisation des géométries
        function highlightFeature(e) {
          var layer = e.target;

          layer.setStyle({
              weight: 2,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.6
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
          }

          info.update(layer.feature.properties);
        }

        function resetHighlight(e) {
          unite_geographique.resetStyle(e.target);
          info.update();
          e.target.setStyle(style(e.target.feature));
          e.target.addTo(layerUnitesGeog);
          layerUnitesGeog.addTo(map);
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

          layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
              click: graphique,
              dblclick: resetHighlight

          });
          nomsCommunesIris.push((this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM);

        }

        function graphique(e) {
          anychart.onDocumentReady(function () {

        // create line chart
        var chart = anychart.column();

        // set chart padding
        // chart.padding([10, 20, 5, 20]);

        // turn on chart animation
        chart.animation(true);

        // turn on the crosshair
        chart.crosshair(true);

        var nomcom;

        // set chart title text settings


        // set y axis title


        // create linear scale
        var linScale = anychart.scales.linear();
        linScale.minimum(0).maximum(3.2);

        // set scale for the chart, this scale will be used in all scale dependent entries such axes, grids, etc
        chart.yScale(linScale);

        for(i in tabTxMotorisation){
          if(tabTxMotorisation[i][0]==e.target.feature.properties.libgeo){
                      tab.push(['Motorisation',tabTxMotorisation[i][1]]);
                      tab.push(['Equipement',tabTxEquipement[i][1]]);
                      nomcom = tabTxMotorisation[i][0];
                      chart.title('Indicateurs pour la commune '+nomcom);
                    }

                }



        console.log(tab);
        var  dataSet =anychart.data.set();
        for (i in tab){
            tab1= tab[i][0];
            tab2= tab[i][1];
            dataSet.append( [tab1,tab2] );

    }


        // map data for the first series,take value from first column of data set
        var firstSeriesData = dataSet.mapAs({ x: 0, value: 1 });

        // temp variable to store series instance
        var series;

        // setup first series
        series = chart.column(firstSeriesData);
        series.name('Indicateur A1');
        // enable series data labels
        series.labels().enabled(true).anchor('left-bottom').padding(5);
        // enable series markers
       // series.markers(true);

        // turn the legend on
        chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);

        // set container for the chart and define padding
        chart.container('container');
        // initiate chart drawing
        chart.draw();

        //Sauvegarde en png
        anychart.exports.server("http://localhost:2000");
        document.getElementById('btnSavePNG').addEventListener('click', () => {
          chart.saveAsPng({
            "quality": 0.5,
            "filename": "TxMotorisation_" + e.target.feature.properties.libgeo});
          });

        //Sauvegarde en xlsx

        document.getElementById('btnSaveXlsx').addEventListener('click', () => {
          //chart.saveAsXlsx();
          var csvData = chart.toCsv('default', {
            'rowsSeparator': '\n',
            'columnsSeparator': ',',
            'ignoreFirstRow': false
          });
          console.log(csvData);

        });
      });


  }

        var unite_geographique = geojson_communes;

        var btnChangeGeom = document.getElementById('btnChangeGeom')
        btnChangeGeom.addEventListener('click', function changeGeometries(btnChangeGeom) {
          if (unite_geographique == geojson_communes) {
              unite_geographique = geojson_iris;
              blabel = "Iris";
          } else {
              unite_geographique = geojson_communes;
              blabel = "Communes";
          }

          /*var child=element.firstChild;
          child.innerHTML=blabel;*/
          document.getElementById('blabel').innerHTML = blabel;
          map.removeLayer(layerUnitesGeog);
          layerUnitesGeog.clearLayers();
          unite_geographique.addTo(layerUnitesGeog);
          layerUnitesGeog.addTo(map);
        });

        function displayGeometries() {
          layerUnitesGeog.clearLayers();
          unite_geographique.eachLayer(function(layer) {

              if (map.getBounds().overlaps(layer.getBounds())) {
                var label = L.marker(layer.getBounds().getCenter(), {
                  icon: L.divIcon({
                    className: 'label',
                    html: (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo +'<br>' + getIndicateur(layer.feature) + '</br>' : layer.feature.properties.NOM_COM,
                  })
                });
                //onEachFeature(layer.feature, layer);
                layer.setStyle(style(layer.feature));
                layer.addTo(layerUnitesGeog);
                layerUnitesGeog.addTo(map);
                label.addTo(layerNomCommunes);
                map.on("zoomend", function(e){
                if(map.getZoom() > 10){
                  layerNomCommunes.addTo(map);}
                else {
                  map.removeLayer(layerNomCommunes);}})
              };
            });
        }

        displayGeometries();
        map.on('zoomend', () => {displayGeometries()});
        map.on('moveend', () => {displayGeometries()});

        function style(feature) {
          return {
              weight: 1,
              opacity: 1,
              color: 'grey',
              dashArray: '3',
              fillOpacity: 0.8,
              fillColor: getColor(getIndicateur(feature))

          };
        }

        function getIndicateur(feature) {

          for(i in tabTxEquipement){
            if(tabTxEquipement[i][0]==feature.properties.libgeo){
                        return((tabTxEquipement[i][1]).toFixed(2));

                      }

                  }
        }

        //Barre de recherche
        document.getElementById('champ_recherche').addEventListener('click', function formRecherche(){
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
        });
        document.getElementById('barre_recherche_B').addEventListener('click', function rechercher() {
          var nomRecherche = document.getElementById("form_recherche").search.value;
          unite_geographique.eachLayer(function (layer) {
            nomGeom = (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo : layer.feature.properties.NOM_COM;
            if (nomGeom==nomRecherche) {
              map.fitBounds(layer.getBounds());
            }
          });
        });

        /*var annees = []
        document.getElementById('Liste_Annee').addEventListener('click', function ValidationForm() {
          annee = document.forms.form.Liste_Annee.options;
          for (i=0; i<document.forms.form.Liste_Annee.options.length; i++) {
            if (document.forms.form.Liste_Annee.options[i].selected ) {
              annees.push(document.forms.form.Liste_Annee.options[i].text);
              console.log(annees);
            }
          }
          return annees
          return annees
        });*/

        var listAnnees = document.getElementById("Liste_Annee");
        var annee = listAnnees.options[listAnnees.selectedIndex].text;


          }

     })} else {
      layerUnitesGeog.clearLayers();
      buttonstate_e=0;
      info.remove();
    }


};

function indicateur_3() {
  console.log("indicateur 3");
}

function CalculTxMotorisation(data, logement){

	var tabTxMotorisation = [];

	if(logement=="maison"){

		for(i=0; i<data.length; i++){
			tabTxMotorisation[i]=[data[i][21],(data[i][7]+2*data[i][8]+3*data[i][9]+0.05*data[i][8])/data[i][10]];
		}

		return(tabTxMotorisation);

	} if(logement=="tslogement"){

		for(i=0; i<data.length; i++){
			tabTxMotorisation[i]=[data[i][21],(data[i][12]+2*data[i][13]+3*data[i][14]+0.05*data[i][14])/data[i][15]];
		}

		return(tabTxMotorisation);

	} if(logement=="appartement"){

		for(i=0; i<data.length; i++){
			tabTxMotorisation[i]=[data[i][21],(data[i][2]+2*data[i][3]+3*data[i][4]+0.05*data[i][4])/data[i][5]];
		}

		return(tabTxMotorisation);

	} if(logement=="autre"){

		for(i=0; i<data.length; i++){
			tabTxMotorisation[i]=[data[i][21],(data[i][17]+2*data[i][18]+3*data[i][19]+0.05*data[i][19])/data[i][20]];
		}

		return(tabTxMotorisation);

	}
}

function CalculTxEquipement(data, logement){

	var tabTxEquipement = [];

	if(logement=="maison"){

		for(i=0; i<data.length; i++){
			tabTxEquipement[i]= [data[i][21],(data[i][7]+data[i][8]+data[i][9])/data[i][10]];
		}

		return(tabTxEquipement);

	} if(logement=="tslogement"){

		for(i=0; i<data.length; i++){
			tabTxEquipement[i]=[data[i][21],(data[i][2]+data[i][3]+data[i][4])/data[i][5]];
		}

		return(tabTxEquipement);

	} if(logement=="appartement"){

		for(i=0; i<data.length; i++){
			tabTxEquipement[i]=[data[i][21],(data[i][12]+data[i][13]+data[i][14])/data[i][15]];
		}

		return(tabTxEquipement);

	} if(logement=="autre"){

		for(i=0; i<data.length; i++){
			tabTxEquipement[i]=[data[i][21],(data[i][17]+data[i][18]+data[i][19])/data[i][20]];
		}

		return(tabTxEquipement);

	}

}

function CalculTxEquipement_nbvoiture(data, logement, nbvoiture){

	var tabTxEquipement = [];

	if(logement=="maison"){

		if(nbvoiture=="0"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][6]/data[i][10]];
			}

		} if(nbvoiture=="1"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][7]/data[i][10]];
			}

		} if(nbvoiture=="2"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][8]/data[i][10]];
			}

		} if(nbvoiture=="3"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][9]/data[i][10]];
			}

		}

		return(tabTxEquipement);

	} if(logement=="tslogement"){

		if(nbvoiture=="0"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][1]/data[i][5]];
			}

		} if(nbvoiture=="1"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][2]/data[i][5]];
			}

		} if(nbvoiture=="2"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][3]/data[i][5]];
			}

		} if(nbvoiture=="3"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][4]/data[i][5]];
			}


	}
		return(tabTxEquipement);

	} if(logement=="appartement"){

		if(nbvoiture=="0"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][11]/data[i][15]];
			}

		} if(nbvoiture=="1"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][12]/data[i][15]];
			}

		} if(nbvoiture=="2"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][13]/data[i][15]];
			}

		} if(nbvoiture=="3"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][13]/data[i][15]];
			}

		}

		return(tabTxEquipement);



	} if(logement=="autre"){

		if(nbvoiture=="0"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][16]/data[i][20]];
			}

		} if(nbvoiture=="1"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][17]/data[i][20]];
			}

		} if(nbvoiture=="2"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][18]/data[i][20]];
			}

		} if(nbvoiture=="3"){

			for(i=0; i<data.length; i++){
				tabTxEquipement[i]= [data[i][21],data[i][19]/data[i][20]];
			}

		}

		return(tabTxEquipement);

	}

}

//Affichage des légendes (noms des communes et valeur des indicateurs)
function displayNames() {
  if (document.getElementById('afficher_noms').checked){
    console.log("if");
    layerNomCommunes.addTo(map);
  } else {
    console.log("else");
    map.removeLayer(layerNomCommunes);
  }
}

//Actualisation de l'affichage des graphiques
function refreshGraph() {
  document.getElementById('container').innerHTML='';
}


//Sauvegarde png
/*function capture(div) {
  console.log("rr");
  var c = document.getElementById(div);
  var t = c.getContext('2d');
  window.open('', document.getElementById(div).toDataURL());
  html2canvas(document.getElementById('container')).then(canvas => {
    // Export the canvas to its data URI representation
    var base64image = canvas.toDataURL("image/png");

    // Open the image in a new window
    window.open(base64image , "_blank");
  });
  html2canvas(document.body).then(function(canvas) {

    document.body.appendChild(canvas);
  });
  anychart.exports.server("http://localhost:2000");
  anychart.exports.filename('custom_name');
}*/

//Affichage des paramètres des indicateurs
function hide(div) {
  var x = document.getElementById(div);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//Taux d'équipement en voiture des ménages
function show_arg2(div) {
  nbVoiture = div;
  console.log(nbVoiture);
  document.getElementById('Composant_logement').style.display = "block";
  indicateur_2(div)
}

document.getElementById('0voiture').addEventListener('click', console.log('0'));
document.getElementById('1voiture').addEventListener('click', console.log('1'));
document.getElementById('2voitures').addEventListener('click',function() {show_arg2(2)});
document.getElementById('3voitures').addEventListener('click', function() {show_arg2(3)});

var nomsCommunesIris = [];

var geojson_communes = L.geoJson(COMMUNES,{
  onEachFeature: onEachFeature,
});

var geojson_iris = L.geoJson(IRIS, {
  onEachFeature: onEachFeature
});
var unite_geographique = geojson_communes;
function onEachFeature(feature, layer) {
  nomsCommunesIris.push((this.feature==geojson_communes) ? feature.properties.libgeo : feature.properties.NOM_COM);
}
//Barre de recherche
        document.getElementById('champ_recherche').addEventListener('click', function formRecherche(){
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
        });
        document.getElementById('barre_recherche_B').addEventListener('click', function rechercher() {
          var nomRecherche = document.getElementById("form_recherche").search.value;
          unite_geographique.eachLayer(function (layer) {
            nomGeom = (unite_geographique==geojson_communes) ? layer.feature.properties.libgeo : layer.feature.properties.NOM_COM;
            if (nomGeom==nomRecherche) {
              map.fitBounds(layer.getBounds());
            }
          });
        });
