$(document).ready(function(){
    $('.onglets.tabs').responsiveTabs({
        startCollapsed: 'accordion',
        activate: function(event, tab){
            $('.recapitulatif').hide();
            $('.recapitulatif-'+tab.id).show();
   
        }
    });
    
    $('input').iCheck();
    $('.tooltip').tooltip({
        classes: {"ui-tooltip": "tooltip-container"},
        position: { my: "right-20 bottom-20", at: "right center" }
    });
    
    $('.datepicker').datepicker();
    
    heightSidentifier();
    
    $('.lightbox').click(function(e){
        e.preventDefault();
        lightbox = $(this).attr('lightbox');
        $( "#"+lightbox ).dialog({
            height: "auto",
            resizable: false,
            width: 509,
            modal: true,
            closeText: "Fermer",
            classes: {
                "ui-dialog": "",
                "ui-dialog-titlebar": "",
                "ui-dialog-title": "hide",
                "ui-dialog-content" : "",
                "ui-dialog-buttonpane" : ""
            },
            buttons: [
                {
                  text: "Je confirme",
                  class: "lightbox-btn-vert",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                },
                {
                  text: "Annuler",
                    class: "lightbox-btn-rouge",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }

              ]
        });    
        
    });
    
    $('.lightbox-transfert').click(function(e){
        e.preventDefault();
        $( "#transfert" ).dialog({
            height: "auto",
            resizable: false,
            width: 509,
            modal: true,
            closeText: "Fermer",
            classes: {
                "ui-dialog": "",
                "ui-dialog-titlebar": "",
                "ui-dialog-title": "hide",
                "ui-dialog-content" : "",
                "ui-dialog-buttonpane" : ""
            },
            buttons: [
                {
                  text: "Confirmer",
                  class: "lightbox-btn-vert",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }
              ]
        });    
    });
    
    $('.lightbox-blocage').click(function(e){
        e.preventDefault();
        $( "#blocage" ).dialog({
            height: "auto",
            resizable: false,
            width: 509,
            modal: true,
            closeText: "Fermer",
            classes: {
                "ui-dialog": "",
                "ui-dialog-titlebar": "",
                "ui-dialog-title": "hide",
                "ui-dialog-content" : "",
                "ui-dialog-buttonpane" : ""
            },
            buttons: [
                {
                  text: "Confirmer",
                  class: "lightbox-btn-vert",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }
              ]
        });    
    });
    
    $('.lightbox-creation-contrat').click(function(e){
        e.preventDefault();
        $( "#creation-contrat" ).dialog({
            height: "auto",
            resizable: false,
            width: 509,
            modal: true,
            closeText: "Fermer",
            classes: {
                "ui-dialog": "",
                "ui-dialog-titlebar": "",
                "ui-dialog-title": "hide",
                "ui-dialog-content" : "",
                "ui-dialog-buttonpane" : ""
            },
            buttons: [
                {
                  text: "Confirmer",
                  class: "lightbox-btn-vert",
                  click: function() {
                    $( this ).dialog( "close" );
                  }
                }
              ]
        });    
    });
    
    $('.lightbox-deleguer').click(function(e){
        e.preventDefault();
        $( "#deleguer" ).dialog({
            height: "auto",
            resizable: false,
            width: 509,
            modal: true,
            closeText: "Fermer",
            classes: {
                "ui-dialog": "",
                "ui-dialog-titlebar": "",
                "ui-dialog-title": "hide",
                "ui-dialog-content" : "",
                "ui-dialog-buttonpane" : ""
            }
        });    
    });
    
    $('table').basictable({
        breakpoint: 1425,
    });
    
    $('.mescontrats li.contrat').click(function(e){
        e.preventDefault();
        $this = $(this);
        if(!$this.hasClass('active')){
            $('.mescontrats li.contrat').removeClass('active');
            $('.mescontrats li.contrat').find('.deroule').slideUp();
        }
        $this.toggleClass('active');
        $this.find('.deroule').slideToggle();
    });
    $('.burger').click(function(e){
        e.preventDefault();
        $(this).toggleClass('open');
        $('.menu-mobile').slideToggle();
    });
});

$(window).resize(function(){
    heightSidentifier();
}); 

function heightSidentifier(){
    $('.sidentifier').height('');
    if($('.container').width() >= 1138 ){
        $('.sidentifier').height($(window).height()-5);
    }
}
 