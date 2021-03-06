class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        // cargo la lista de objetos en el DOM
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            switch (list[i].type) {
                case 0: // Lampara     
                    items += "<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                case 1: // Persiana                    
                    items += "<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
}
class Main {
    handleEvent(evt) {
        //todo: filtrar por elemento clickeado y realizar un get segun el boton clickeado
        let sw = this.myf.getElementByEvent(evt);
        console.log("click en device:" + sw.id[0]);
        if (sw.id[0] == "b") {
            switch (sw.id) {
                case "btn_todos":
                    console.log("todos");
                    this.myf.requestGET("devices?filter=0", this);
                    break;
                case "btn_persianas":
                    this.myf.requestGET("devices?filter=1", this);
                    break;
                case "btn_lamparas":
                    this.myf.requestGET("devices?filter=2", this);
                    break;
                default:
                    break;
            }
        }
        else {
            let data = { "id": sw.id, "state": this.view.getSwitchStateById(sw.id) };
            this.myf.requestPOST("devices", data, this);
        }
    }
    handleGETResponse(status, response) {
        if (status == 200) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            //todo: generar los botones dinamicamente segun los elementos de la lista,ej: lampara,persiana,etc
            let btns = ["todos", "lamparas", "persianas"];
            for (let i of btns) {
                this.enableEventListener("btn_" + i);
            }
            for (let i in data) {
                this.enableEventListener("dev_" + data[i].id);
            }
        }
    }
    enableEventListener(element_id) {
        let html_element = this.myf.getElementById(element_id);
        html_element.addEventListener("click", this);
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    main() {
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        this.myf.requestGET("devices", this);
    }
}
window.onload = () => {
    let obj = new Main();
    obj.main();
};
