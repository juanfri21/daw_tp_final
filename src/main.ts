interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:number;
}
class ViewMainPage
{
    myf:MyFramework;

    constructor(myf:MyFramework)
    {
        this.myf = myf;    
    }

    showDevices(list:DeviceInt[]):void
    {
        // cargo la lista de objetos en el DOM
        let devicesUl:HTMLElement = this.myf.getElementById("devicesList");

        let items:string="";
        for(let i in list)
        {   
            let checkedStr="";
            if(list[i].state=="1")
                checkedStr="checked";
            switch(list[i].type)
            {
                case 0: // Lampara     

                    items+="<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;  
                case 1: // Persiana                    
                    items+="<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;                                                    
            }
        }

        devicesUl.innerHTML=items;
    }

    getSwitchStateById(id:string):boolean {
        let el:HTMLInputElement = <HTMLInputElement>this.myf.getElementById(id);       
        return el.checked;
    }
}
class Main implements GETResponseListener, EventListenerObject, POSTResponseListener
{ 
    myf:MyFramework;
    view:ViewMainPage;

    handleEvent(evt:Event):void
    {
        //todo: filtrar por elemento clickeado y realizar un get segun el boton clickeado
        let sw: HTMLElement = this.myf.getElementByEvent(evt);
        console.log("click en device:"+sw.id);

        let data:object = {"id":sw.id,"state":this.view.getSwitchStateById(sw.id)};
        this.myf.requestPOST("devices",data,this);
    }

    handleGETResponse(status:number,response:string):void{
      if(status==200)
      {
        console.log(response);
        let data:DeviceInt[] = JSON.parse(response);
        console.log(data);
        this.view.showDevices(data);
    
        //todo: generar los botones dinamicamente segun los elementos de la lista,ej: lampara,persiana,etc
        let btns:list = ["todos", "lamparas", "persianas"];
        
        for (let i of btns)
        {
            this.enableEventListener("btn_" + i);
        }

        for(let i in data)
        {
            this.enableEventListener("dev_" + data[i].id);  
        }
      }
    }

    enableEventListener(element_id:string):void
    {
        let html_element:HTMLElement = this.myf.getElementById(element_id);
        html_element.addEventListener("click",this);
    }

    handlePOSTResponse(status:number,response:string):void{
        if(status==200)
        {
            console.log(response);
        }
    }

    main():void 
    { 
      this.myf = new MyFramework();

      this.view = new ViewMainPage(this.myf);

      this.myf.requestGET("devices",this);
    } 
} 
 
window.onload = () => {
    let obj = new Main(); 
    obj.main();
};
 

