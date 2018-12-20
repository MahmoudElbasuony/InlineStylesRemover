const targetTextOutput = "#textOutput";


const hiddenFrame = "hiddenFrame";





function transform() {

    if (!FileReader)
        return alert("Reading from file not supported in this browser");

    try {

        inputFile = document.querySelector('input').files[0];

        if (!inputFile)
            throw "";

    }
    catch {
        return alert("No file selected");
    }



    try {

        const reader = new FileReader();

        reader.onload = event => {

            var fileContent = event.target.result;

            if (fileContent) {



                const frame = writeToHiddenFrame(fileContent.toString());

                frame.onload = function () {

                    CleanUp(frame.document);

                    setTimeout(() => {
                        $(targetTextOutput).text(frame.document.body.innerHTML);
                    });

                }


            }
            else
                alert("Selected file is empty !");

        };

        reader.onerror = error => alert("reading file failed");

        reader.readAsText(inputFile, "utf-8") // you could also read images and other binaries

    }
    catch (e) {
        return alert(e);
    }

}


function exportFile() {


    const transfromedText = $(targetTextOutput).text();

    try {
        fileName = inputFile = document.querySelector('input').files[0].name;
    }
    catch{
        fileName = Date.now();
    }

    if (transfromedText) {
        exportText(fileName,transfromedText);
    }

}


function checkExtension(obj, filter) {

    var file = obj.value.match(/[^\/\\]+$/gi)[0];
    var rx = new RegExp('\\.(' + (filter ? filter : '') + ')$', 'gi');
    if (filter && file && !file.match(rx)) {
        alert("check the file type, only html is accepted");
    }

}


function writeToHiddenFrame(input) {

    var iframe = document.getElementById(hiddenFrame);
    iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);

    iframe.document.open();
    iframe.document.write(input.toString());
    iframe.document.close();

    return iframe;
}


function exportText(filename, input) {

    var blob = new Blob([input], { type: 'text/html;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
