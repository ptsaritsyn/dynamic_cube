class Cube{

    constructor(wrap, table){

            this.wrapper = document.querySelector(wrap);
            this.table = document.querySelector(table);
            this.deleteRow = document.querySelector("button.wrapper__delete_row");
            this.table.addEventListener("mouseover", this.over, false);
            this.table.addEventListener("mouseleave", this.out, false);
            this.wrapper.addEventListener("mouseover", this.overButton, false);
            this.offsetCellsValue = [];

            const tr = document.querySelectorAll("tr.wrapper__tr");
            const rowLength = this.table.rows[0].cells.length;

            for (let i = 0; i < rowLength; i++) {
                this.offsetCellsValue[i] = tr[i].cells[i].offsetLeft;
            }
        }

    addLastRow() {
            
            const row = document.createElement("tr");row.className = "wrapper__tr";
            const rowLength = this.table.rows[0].cells.length;
            const tbody = document.querySelector('table.wrapper__table tbody');

            for (let i=0; i<rowLength; i++){
                const td = document.createElement("td");td.className = "wrapper__td";
                tbody.appendChild(row).appendChild(td);
            }
        }

    addLastColumn() {

            const td = document.querySelector("td.wrapper__td");
            const widthCell = td.offsetWidth+2;
            const lastValue = this.offsetCellsValue.pop();
            this.offsetCellsValue.push(lastValue);
            this.offsetCellsValue.push(lastValue+widthCell);
            const rowsLength = this.table.rows.length;
            const tr = document.querySelectorAll("tr.wrapper__tr");

            for (let i = 0; i < rowsLength ; i++){
                const td = document.createElement("td");td.className ="wrapper__td";
                tr[i].appendChild(td);
            }
        }

    deleteCurrentRow() {

            const deleteRow = document.querySelector("button.wrapper__delete_row");
            const tr = document.querySelectorAll("tr.wrapper__tr");
            const offsetTopButton = deleteRow.offsetTop;
            const td = document.querySelector("td.wrapper__td");
            const firstRowOffset = 6;
            const offsetHeight = td.offsetWidth+firstRowOffset;

            for (let i = 0; i < this.table.rows.length; i++) {
                if (this.table.rows.length) {
                    let offsetRow = this.table.rows[i].offsetTop;

                    for (let j = 0; j < 10; j++) {
                        if (offsetTopButton - j == offsetRow) {
                            this.table.deleteRow(i);
                        }
                    }
                }
            }

            if(this.table.rows.length > 1 && offsetTopButton != firstRowOffset){
                deleteRow.style.top = `${offsetTopButton-offsetHeight}px`;

            } else {
                deleteRow.style.display = "none";
            }
    }

    deleteCurrentColumn() {

            const deleteColumn = document.querySelector("button.wrapper__delete_column");
            const table = document.querySelector("table.wrapper__table");
            const rowsLength = table.rows.length;
            const tr = document.querySelectorAll("tr.wrapper__tr");
            const td = document.querySelector("td.wrapper__td");
            const rowLength = this.table.rows[0].cells.length;
            const firstCellOffset = 6;
            const offsetLeftButton = deleteColumn.offsetLeft;
            const offsetWidth = td.offsetWidth+firstCellOffset;
            let index;

            for (let i = 0; i < rowLength; i++){
                
                for(let j = 0; j < 10; j++){
                    if(offsetLeftButton - j == this.offsetCellsValue[i]){
                        index = i;
                    }
                }
            }

            for (let i = 0; i < rowsLength; i++){
                if(tr[i].cells.length > 1){
                    tr[i].deleteCell(index);
                }
            }


            if(this.table.rows[0].cells.length > 1 && offsetLeftButton != firstCellOffset){
                deleteColumn.style.left = `${offsetLeftButton-offsetWidth}px`;
                
            } else {
                deleteColumn.style.display = "none";
            }
    }

   over(e) {

       const table = document.querySelector("table.wrapper__table");
       const deleteColumn = document.querySelector("button.wrapper__delete_column");
       const deleteRow = document.querySelector("button.wrapper__delete_row");
       const elem = e.target;
       const offsetLeft = elem.offsetLeft;
       const offsetTop = elem.offsetTop;
       const layers = [];

       for(let i = 0; i < table.rows[0].cells.length; i++) {
           layers[i] = i * 54 + 2;

           if (layers[i] === e.layerX || layers[i] - 2 === e.layerX) {
               return false;
           }
       }

       for(let i = 0; i < table.rows.length; i++) {
           layers[i] = i * 54 + 2;

           if(layers[i] === e.layerY || layers[i] + 1 === e.layerY || layers[i] - 2 === e.layerY){
               return false;
           }
       }

       deleteColumn.style.display = "inline";
       deleteRow.style.display = "inline";
       deleteColumn.style.left = `${offsetLeft}px`;
       deleteRow.style.top = `${offsetTop}px`;

       if (table.rows[0].cells.length == 1) {
            deleteColumn.style.display = "none";
       }

       if (table.rows.length == 1) {
            deleteRow.style.display = "none";
       }
   }

   out(e) {

       const div = document.body.querySelector("div.wrapper");
       const divLeft = div.offsetLeft;
       const divTop = div.offsetTop;
       const deleteColumn = document.querySelector("button.wrapper__delete_column");
       const deleteRow = document.querySelector("button.wrapper__delete_row");
       const elem = event.target;
       const x = e.pageX;
       const y = e.pageY;
       const offsetLeft = deleteColumn.offsetLeft;
       const offsetTop = deleteRow.offsetTop;
       const widthTable = elem.offsetWidth;
       const heightTable = elem.offsetHeight;

       deleteColumn.style.left = `${offsetLeft-4}px`;
       deleteRow.style.top = `${offsetTop-4}px`;

       if(x > widthTable+divLeft - 2 || y > heightTable+divTop - 2 ){
           deleteColumn.style.display = "none";
           deleteRow.style.display = "none";
       }
   }

   overButton(e) {

       const deleteColumn = document.querySelector("button.wrapper__delete_column");
       const deleteRow = document.querySelector("button.wrapper__delete_row");
       const elem = e.target;

        if(elem == deleteColumn){
            deleteColumn.style.display = "inline";
            deleteRow.style.display = "none";
        }

        if(elem == deleteRow){
            deleteRow.style.display = "inline";
            deleteColumn.style.display = "none";
        }
    }
}

let cube = new Cube("div.wrapper","table.wrapper__table");



