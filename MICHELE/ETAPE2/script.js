/*global document, console, jQuery, $ */
/*jslint browser: true, indent: 2, nomen: true */
// vim: tabstop=2:shiftwidth=2:softtabstop=2

// script JS
$(function () {
  'use strict';
  var moteur, creerTrou;

  // pour les trous, il y aura plusieurs invocation : fonction qui cree une
  // instance de trou
  creerTrou = function (id) {
    var _id = id, _actif = false, _pas, _nb = _id.find(".anim").length,
      _pas_courant, _Anime, _Avance;

    _Anime = function () {
      if (!_actif) {
        _actif = true;
        _pas = 0;
      }
    };

    _Avance = function () {
      if (!_actif) { return; }
      _pas += 1;
      if (_pas_courant) {
        _pas_courant.removeClass("anim-show");
      }
      if (_pas < _nb) {
        _pas_courant = $(_id).find(".step" + _pas);
        _pas_courant.addClass("anim-show");
      } else {
        _actif = false;
      }
    };

    return {
      anime: function () { _Anime(); },
      avance: function () { _Avance(); }
    };
  };

  // Nous n'avons qu'un moteur d'animation/jeu, la fonction d'instanciation
  // est directement invokee
  moteur = (function () {
    var $INTERVAL = 100, $MINUTEUR = 20000,
      _trou = [], _compteur = 0, _tourne = false, _timer,
      _Avance, _Demarre, _Arrete;

    _Avance = function () {
      _compteur += 1;
      if (_compteur === $MINUTEUR) {
        _Arrete();
      }
      if (_compteur % 60 === 15) {
        _trou[0].anime();
      }
      if (_compteur % 60 === 30) {
        _trou[1].anime();
      }
      if (_compteur % 60 === 45) {
        _trou[3].anime();
      }
      if (_compteur % 60 === 0) {
        _trou[2].anime();
      }
      _trou.forEach(function (trou) {
        trou.avance();
      });
    };

    _Demarre = function () {
      if (!_tourne) {
        _tourne = true;
        _timer = window.setInterval(function () { _Avance(); }, $INTERVAL);
      }
    };

    _Arrete = function () {
      if (_tourne) {
        _tourne = false;
        window.clearInterval(_timer);
      }
    };

    return {
      demarre : function () { _Demarre(); $("#info").html("Démarré"); },
      arrete : function () { _Arrete(); $("#info").html("Arrêté"); },
      ajoutTrou : function (el) { _trou.push(creerTrou(el)); }
    };
  }());

  // Ajout de la classe "step#" (#: numéro du pas) aux images intervenant dans
  // l'animation d'un trou
  $("#trou-init img.anim").each(function (index) {
    $(this).addClass("step" + (index + 1));
  });

  // Ajout des images qui construise un trou et qui permettra son animation
  $(".trou").each(function () {
    $(this).html($("#trou-init").html());
  });

  // Rends les boutons actifs
  $("#jeu-demarre").click(moteur.demarre);
  $("#jeu-arrete").click(moteur.arrete);

  // Enregistre les trous dans le moteur d'animation-jeu
  $(".trou").each(function () { moteur.ajoutTrou($(this)); });

  // On est prêt
  $("#info").html("Prêt");
});
