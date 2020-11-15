
var cesar = cesar || (function(){
    
    var doStaff = function(txt, desp, action){
      
        var replace = (function(){
           
            var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                    'l','m','n','ñ','o','p','q','r','s','t','u',
                    'v','w','x','y','z'];

        var l = abc.length;
        return function(c){
            var i = abc.indexOf(c.toLowerCase());
            if (i != -1) {
                var pos = i;
                if (action) {
                    pos += desp;
                    pos = (pos >= l) ? pos-l : pos;                                
                }else{
                    pos -= desp;
                    pos = (pos < 0) ? l+pos : pos;
                }
                return abc[pos];
            }
            return c;
        };
    })();

    var re = (/([a-z ñ])/ig);
    return String(txt).replace(re, function(match){
        return replace(match);
    });
    };

    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },
        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };

})();

function codificar(){
    vacio();
    var pos = Math.abs(parseInt(document.getElementById("lugar").value));
    var r = cesar.encode(document.getElementById("cadena").value, (pos >= 27) ? pos%27 : pos); 
    document.getElementById("r").value = r;
}

function decodificar(){
    var pos = Math.abs(parseInt(document.getElementById("lugar").value));
    var r = cesar.decode(document.getElementById("cadena").value, (pos >= 27) ? pos%27 : pos); 
    document.getElementById("r").value = r;
}

function vacio(){
    var cadena = document.getElementById("cadena").value;
    var lugar = parseInt (document.getElementById("lugar").value);
    if(cadena == ""){
        alert("Poco texto, mejor ingresalo plox");
    }if(lugar < 0){
        alert("No tan negativo papu");
    }
}

function reinicio(){
    document.getElementById("cadena").value = "";
    document.getElementById("lugar").value = 0;
    document.getElementById("r").value = "";
}