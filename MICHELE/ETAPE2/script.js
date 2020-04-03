// script JS
$(function(){
    "use strict;"
    var moteur, score_aff, chrono_aff;

    creerTrou = function(id) {
        var _id = id, _actif = false, _pas, _nb = _id.find(".anim").length,
            _pas_courant;

        var _Anime = function () {
            if (!_actif) {
                _actif = true;
                _pas = 0;
            }
        };

        var _Avance = function () {
            if (!_actif) { return; }
            _pas += 1;
            if ( _pas_courant) {
                _pas_courant.removeClass("anim-show");
            };
            if (_pas <_nb) {
                _pas_courant = $(_id).find(".step" + _pas);
                _pas_courant.addClass("anim-show");
            } else {
                _actif = false;
            }
        };

        return {
            anime: function () { _Anime() ;},
            avance: function () { _Avance() ;}
        };
    };

    creerMoteur = function() {
        var $INTERVAL = 100;
        var $MINUTEUR = 20000;
        var _tourne = false;
        var _timer;
        var _compteur=0;
        var _trou = [];

        var _Avance = function () {
            _compteur += 1;
            if (_compteur % 60 == 15) {
                _trou[0].anime();
            }
            if (_compteur % 60 == 30) {
                _trou[1].anime();
            }
            if (_compteur % 60 == 45) {
                _trou[3].anime();
            }
            if (_compteur % 60 == 0) {
                _trou[2].anime();
            }
            _trou.forEach(function (trou) {
                trou.avance();
            });
        };

        var _Demarre = function () {
            if (!_tourne) {
                _tourne = true;
                _timer = window.setInterval( function() {
                  _Avance(); }, $INTERVAL );
            }
        };

        var _Arrete = function () {
            if (_tourne) {
                _tourne = false;
                window.clearInterval(_timer);
            }
        };

        return {
            demarre : function () { _Demarre(); $("#info").html("Démarré");},
            arrete : function () { _Arrete(); $("#info").html("Arrêté");},
            ajoutTrou : function (el) { _trou.push(creerTrou(el)); }
        };
    };

    $("#trou-init img.anim").each( function (index) {
        $(this).addClass("step"+(index+1));
    });

    $(".trou").each(function () {
        $(this).html($("#trou-init").html());
    });

    moteur = creerMoteur();
    $("#jeu-demarre").click(moteur.demarre);
    $("#jeu-arrete").click(moteur.arrete);
    $(".trou").each(function () { moteur.ajoutTrou($(this)); });
    $("#info").html("Prêt");
});
