(function(){
    function menu(e){
        var $menu = document.querySelector('#menu');
        var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0)
        if(top > 100)
            $menu.classList.add("slim");
        else
            $menu.classList.remove("slim");   
        
        if(top > 1000)
            $btnUp.classList.add("active");
        else
            $btnUp.classList.remove("active");
    }
    
    function scrollToElement(element){
        var target = element.currentTarget || element;
        target.scrollIntoView({
            behavior: 'smooth'
        })
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, {
             shift: 50
         });

         var instance = M.Carousel.getInstance(elems[0]);
         document.querySelector('#prev').addEventListener('click', function(){
            instance.prev()
         })
         
         document.querySelector("#next").addEventListener('click', function (){
             instance.next()
         })
    });

    var $btnUp = document.querySelector("#up");
    var $btnHomepage = document.querySelector("#homepageButton");
    var $sections = {
        about: document.querySelector("#about"),
        partner: document.querySelector("#partner"),
        store: document.querySelector("#store"),
        contact: document.querySelector("#contact")
    }    

    function scrollSections(button){
        document.querySelector("#" + button).addEventListener("click", () => scrollToElement($sections[button]), false);
    }

    Object.keys($sections).forEach(function(e){
        scrollSections(e);
    });
    $btnHomepage.addEventListener("click", () => scrollToElement($sections.about));
    $btnUp.addEventListener("click", () => scrollToElement(document.querySelector('body')));
    document.addEventListener('scroll', menu);
})();
