// chord1menu interaction 
$('.dropdown-item').on('click',  function(){
    console.log($(this).text())
    var btnObj = $(this).parent().siblings('button');
    $(btnObj).text($(this).text());
    $(btnObj).val($(this).text());
});

// chord1menu array
chord1MenuItems = ["Major", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "Minor", "Cm", "Dbm", "Dm", "Ebm", "Em", "Fm", "Gbm", "Gm", "Abm", "Am", "Bbm", "Bm"]
// populate the chord1 menu (this is useful also for when we want to add indicators next to chords which have scribbles)
$('ul.dropdown-menu').on('click', function(event){
    event.stopPropagation();
});
function updateChord1Menu(){
    var $dropdown = $(".dropdown-menu.chord1Menu");
    
    for(i=0; i<chord1MenuItems.length;i++){
        var menuItemNo = $dropdown.find("li").length;
        var menuItemId = "menuitem" + menuItemNo;    
        if(chord1MenuItems[i] === "Major" || chord1MenuItems[i] === "Minor"){
            // create a separator between major and minor keys        
            $dropdown.append(`<li>${chord1MenuItems[i]}</li>`);
        }else{
            $dropdown.append("<li><a href='#'><label for='chord1_" + chord1MenuItems[i] + "'>" + chord1MenuItems[i] +"</label></a></li>");
        }
    }
}
updateChord1Menu()


