// import "./jquery.min";




if (!$)
    throw "Inline-Styles Remover Requires Jquery !";



const Selectors = [
    "style",
    "width",
    "height",
    "align",
    "background",
    "wrap",
    "hidden",
    "border",
    "bgcolor"
]

function CleanUp(container) {

    if (!container)
        container = document;

    $(function () {

        $.each(Selectors, function (_, selector) {
            $("*[" + selector + "]", container).removeAttr(selector);
        });

    });

}


// CleanUp();